"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Brain, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageReasoningProps = {
  isLoading: boolean;
  reasoning: string;
};

export function MessageReasoning({
  isLoading,
  reasoning,
}: MessageReasoningProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState("");

  // Simulate streaming text effect when loading
  useEffect(() => {
    if (isLoading && reasoning) {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= reasoning.length) {
          setDisplayText(reasoning.slice(0, index));
          index += 2; // Show 2 characters at a time for smoother animation
        } else {
          clearInterval(interval);
        }
      }, 20);

      return () => clearInterval(interval);
    } else {
      setDisplayText(reasoning);
    }
  }, [isLoading, reasoning]);

  return (
    <div className="my-4">
      {/* DeepSeek-style thinking header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-left transition-all duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750",
          isExpanded && "rounded-b-none border-b-transparent"
        )}
        data-testid="message-reasoning"
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="relative">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/50">
              <Brain size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            {isLoading && (
              <div className="absolute -right-1 -top-1">
                <Loader2 size={12} className="animate-spin text-blue-500" />
              </div>
            )}
          </div>

          {/* Title and status */}
          <div className="flex flex-col">
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              Thinking
            </span>
            {isLoading ? (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Processing...
              </span>
            ) : (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <CheckCircle size={10} className="text-green-500" />
                Complete
              </span>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            {isExpanded ? <EyeOff size={12} /> : <Eye size={12} />}
            <span className="hidden sm:inline">{isExpanded ? "Hide" : "Show"}</span>
          </div>
          <ChevronDown
            size={16}
            className={cn(
              "text-gray-400 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="rounded-b-lg border border-t-0 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
              {displayText}
              {isLoading && (
                <span className="ml-1 inline-block h-4 w-0.5 animate-pulse bg-blue-500"></span>
              )}
            </div>
          </div>
          
          {isLoading && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Loader2 size={12} className="animate-spin" />
              <span>Reasoning in progress...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
