"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { BrainIcon, ChevronDownIcon, SparklesIcon, Loader2Icon, CheckCircleIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { createContext, memo, useContext, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Response } from "./response";

type ReasoningContextValue = {
  isStreaming: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  duration: number;
};

const ReasoningContext = createContext<ReasoningContextValue | null>(null);

const useReasoning = () => {
  const context = useContext(ReasoningContext);
  if (!context) {
    throw new Error("Reasoning components must be used within Reasoning");
  }
  return context;
};

export type ReasoningProps = ComponentProps<typeof Collapsible> & {
  isStreaming?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
};

const AUTO_CLOSE_DELAY = 500;
const MS_IN_S = 1000;

export const Reasoning = memo(
  ({
    className,
    isStreaming = false,
    open,
    defaultOpen = true,
    onOpenChange,
    duration: durationProp,
    children,
    ...props
  }: ReasoningProps) => {
    const [isOpen, setIsOpen] = useControllableState({
      prop: open,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });
    const [duration, setDuration] = useControllableState({
      prop: durationProp,
      defaultProp: 0,
    });

    const [hasAutoClosedRef, setHasAutoClosedRef] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    // Track duration when streaming starts and ends
    useEffect(() => {
      if (isStreaming) {
        if (startTime === null) {
          setStartTime(Date.now());
        }
      } else if (startTime !== null) {
        setDuration(Math.round((Date.now() - startTime) / MS_IN_S));
        setStartTime(null);
      }
    }, [isStreaming, startTime, setDuration]);

    // Auto-open when streaming starts, auto-close when streaming ends (once only)
    useEffect(() => {
      if (defaultOpen && !isStreaming && isOpen && !hasAutoClosedRef) {
        // Add a small delay before closing to allow user to see the content
        const timer = setTimeout(() => {
          setIsOpen(false);
          setHasAutoClosedRef(true);
        }, AUTO_CLOSE_DELAY);

        return () => clearTimeout(timer);
      }
    }, [isStreaming, isOpen, defaultOpen, setIsOpen, hasAutoClosedRef]);

    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
    };

    return (
      <ReasoningContext.Provider
        value={{ isStreaming, isOpen, setIsOpen, duration }}
      >
        <div
          className={cn(
            "w-full rounded-xl overflow-hidden shadow-xl",
            "bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm",
            "border border-slate-700/50 shadow-2xl"
          )}
        >
          <Collapsible
            className={cn("not-prose", className)}
            onOpenChange={handleOpenChange}
            open={isOpen}
            {...props}
          >
            {children}
          </Collapsible>
        </div>
      </ReasoningContext.Provider>
    );
  }
);

export type ReasoningTriggerProps = ComponentProps<typeof CollapsibleTrigger>;

export const ReasoningTrigger = memo(
  ({ className, children, ...props }: ReasoningTriggerProps) => {
    const { isStreaming, isOpen, duration } = useReasoning();

    return (
      <CollapsibleTrigger
        className={cn(
          "w-full px-5 py-4 flex items-center justify-between",
          "bg-gradient-to-r from-indigo-900/40 to-purple-900/30",
          "hover:from-indigo-900/50 hover:to-purple-900/40 transition-all duration-300",
          "border-b border-slate-700/50",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <div className="flex items-center gap-3">
              {/* Icon with animation */}
              <div className="relative">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                  <BrainIcon size={20} className="drop-shadow" />
                </div>
                {isStreaming && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <SparklesIcon size={16} className="text-purple-400 animate-pulse" />
                      <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Title and Status */}
              <div className="flex flex-col items-start">
                <span className="font-semibold text-white text-base flex items-center gap-2">
                  Thinking Process
                  {isStreaming && (
                    <span className="flex items-center gap-1">
                      <Loader2Icon size={16} className="text-purple-400 animate-spin" />
                    </span>
                  )}
                </span>
                {isStreaming ? (
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    Analyzing the problem...
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <CheckCircleIcon size={12} className="text-green-400" />
                    Thought for {duration}s
                  </span>
                )}
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {isStreaming && (
                <div className="flex items-center gap-1 mr-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              )}
              <ChevronDownIcon
                className={cn(
                  "size-5 text-slate-400 transition-transform duration-300",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
          </>
        )}
      </CollapsibleTrigger>
    );
  }
);

export type ReasoningContentProps = ComponentProps<
  typeof CollapsibleContent
> & {
  children: string;
};

export const ReasoningContent = memo(
  ({ className, children, ...props }: ReasoningContentProps) => (
    <CollapsibleContent
      className={cn(
        "bg-slate-900/50 backdrop-blur-sm",
        "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      )}
      {...props}
    >
      <div className="px-0 py-0">
        <Response className="grid gap-0 text-slate-200 text-sm">{children}</Response>
      </div>
    </CollapsibleContent>
  )
);

Reasoning.displayName = "Reasoning";
ReasoningTrigger.displayName = "ReasoningTrigger";
ReasoningContent.displayName = "ReasoningContent";
