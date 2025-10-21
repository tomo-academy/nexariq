"use client";
import type { UseChatHelpers } from "@ai-sdk/react";
import equal from "fast-deep-equal";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import type { Vote } from "@/lib/db/schema";
import type { ChatMessage } from "@/lib/types";
import { cn, sanitizeText } from "@/lib/utils";
import { useDataStream } from "./data-stream-provider";
import { DocumentToolResult } from "./document";
import { DocumentPreview } from "./document-preview";
import { MessageContent } from "./elements/message";
import { Response } from "./elements/response";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "./elements/tool";
import { SparklesIcon } from "./icons";
import { MessageActions } from "./message-actions";
import { MessageEditor } from "./message-editor";
import { MessageReasoning } from "./message-reasoning";
import { PreviewAttachment } from "./preview-attachment";
import { Weather } from "./weather";

const PurePreviewMessage = ({
  chatId,
  message,
  vote,
  isLoading,
  setMessages,
  regenerate,
  isReadonly,
  requiresScrollPadding,
}: {
  chatId: string;
  message: ChatMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  setMessages: UseChatHelpers<ChatMessage>["setMessages"];
  regenerate: UseChatHelpers<ChatMessage>["regenerate"];
  isReadonly: boolean;
  requiresScrollPadding: boolean;
}) => {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const { data: session } = useSession();

  const attachmentsFromMessage = message.parts.filter(
    (part) => part.type === "file"
  );

  useDataStream();

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group/message w-full"
      data-role={message.role}
      data-testid={`message-${message.role}`}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* DeepSeek-style message layout */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {message.role === "assistant" ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src="/images/TOMO.jpg"
                    alt="DeepSeek"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center dark:bg-gray-600">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {session?.user?.name?.[0] || "U"}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Message content */}
          <div className="flex-1 min-w-0">
            {/* Role indicator */}
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {message.role === "assistant" ? "DeepSeek" : "You"}
              </span>
            </div>

            {/* Attachments */}
            {attachmentsFromMessage.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2" data-testid="message-attachments">
                {attachmentsFromMessage.map((attachment) => (
                  <PreviewAttachment
                    attachment={{
                      name: attachment.filename ?? "file",
                      contentType: attachment.mediaType,
                      url: attachment.url,
                    }}
                    key={attachment.url}
                  />
                ))}
              </div>
            )}

            {/* Message parts */}
            <div className="space-y-4">
              {message.parts?.map((part, index) => {
                const { type } = part;
                const key = `message-${message.id}-part-${index}`;

                if (type === "reasoning" && "text" in part && part.text?.trim().length > 0) {
                  return (
                    <MessageReasoning
                      isLoading={isLoading}
                      key={key}
                      reasoning={part.text}
                    />
                  );
                }

                if (type === "text") {
                  if (mode === "view") {
                    return (
                      <div key={key} className="prose prose-gray max-w-none dark:prose-invert">
                        <MessageContent
                          className="text-gray-900 dark:text-gray-100 leading-relaxed"
                          data-testid="message-content"
                        >
                          <Response>{sanitizeText(part.text)}</Response>
                        </MessageContent>
                      </div>
                    );
                  }

                  if (mode === "edit") {
                    return (
                      <div key={key} className="w-full">
                        <MessageEditor
                          key={message.id}
                          message={message}
                          regenerate={regenerate}
                          setMessages={setMessages}
                          setMode={setMode}
                        />
                      </div>
                    );
                  }
                }

                if (type === "tool-getWeather" && "toolCallId" in part && "state" in part) {
                  const { toolCallId, state } = part;

                  return (
                    <Tool defaultOpen={true} key={toolCallId}>
                      <ToolHeader state={state} type="tool-getWeather" />
                      <ToolContent>
                        {state === "input-available" && "input" in part && (
                          <ToolInput input={part.input} />
                        )}
                        {state === "output-available" && "output" in part && (
                          <ToolOutput
                            errorText={undefined}
                            output={<Weather weatherAtLocation={part.output} />}
                          />
                        )}
                      </ToolContent>
                    </Tool>
                  );
                }

                if (type === "tool-createDocument" && "toolCallId" in part) {
                  const { toolCallId } = part;

                  if ("output" in part && part.output && "error" in part.output) {
                    return (
                      <div
                        className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
                        key={toolCallId}
                      >
                        Error creating document: {String(part.output.error)}
                      </div>
                    );
                  }

                  return (
                    <DocumentPreview
                      isReadonly={isReadonly}
                      key={toolCallId}
                      result={"output" in part ? part.output : undefined}
                    />
                  );
                }

                if (type === "tool-updateDocument" && "toolCallId" in part) {
                  const { toolCallId } = part;

                  if ("output" in part && part.output && "error" in part.output) {
                    return (
                      <div
                        className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
                        key={toolCallId}
                      >
                        Error updating document: {String(part.output.error)}
                      </div>
                    );
                  }

                  return (
                    <div className="relative" key={toolCallId}>
                      <DocumentPreview
                        args={("output" in part && part.output) ? { ...part.output, isUpdate: true } : {}}
                        isReadonly={isReadonly}
                        result={"output" in part ? part.output : undefined}
                      />
                    </div>
                  );
                }

                if (type === "tool-requestSuggestions" && "toolCallId" in part && "state" in part) {
                  const { toolCallId, state } = part;

                  return (
                    <Tool defaultOpen={true} key={toolCallId}>
                      <ToolHeader state={state} type="tool-requestSuggestions" />
                      <ToolContent>
                        {state === "input-available" && "input" in part && (
                          <ToolInput input={part.input} />
                        )}
                        {state === "output-available" && "output" in part && (
                          <ToolOutput
                            errorText={undefined}
                            output={
                              "error" in part.output ? (
                                <div className="rounded border p-2 text-red-500">
                                  Error: {String(part.output.error)}
                                </div>
                              ) : (
                                <DocumentToolResult
                                  isReadonly={isReadonly}
                                  result={part.output}
                                  type="request-suggestions"
                                />
                              )
                            }
                          />
                        )}
                      </ToolContent>
                    </Tool>
                  );
                }

                return null;
              })}
            </div>

            {/* Actions */}
            {!isReadonly && (
              <div className="mt-4">
                <MessageActions
                  chatId={chatId}
                  isLoading={isLoading}
                  key={`action-${message.id}`}
                  message={message}
                  setMode={setMode}
                  vote={vote}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) {
      return false;
    }
    if (prevProps.message.id !== nextProps.message.id) {
      return false;
    }
    if (prevProps.requiresScrollPadding !== nextProps.requiresScrollPadding) {
      return false;
    }
    if (!equal(prevProps.message.parts, nextProps.message.parts)) {
      return false;
    }
    if (!equal(prevProps.vote, nextProps.vote)) {
      return false;
    }

    return false;
  }
);

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group/message w-full"
      data-role={role}
      data-testid="message-assistant-loading"
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <SparklesIcon size={16} />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                DeepSeek
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <LoadingText>Thinking...</LoadingText>
              <div className="flex gap-1">
                <motion.div
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingText = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.span
      animate={{ opacity: [0.5, 1, 0.5] }}
      className="text-gray-600 dark:text-gray-400"
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
};
