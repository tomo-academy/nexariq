"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2, CheckCircle } from "lucide-react";
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
      {/* DeepSeek-style crafting header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border px-4 py-2.5 text-left transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50",
          "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
          isExpanded && "rounded-b-none"
        )}
        data-testid="message-reasoning"
      >
        <div className="flex items-center gap-3">
          {/* Crafting icon and animation */}
          <div className="relative flex items-center">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Crafting
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Crafting
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right side toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {isExpanded ? "Hide" : "Show"}
          </span>
          <ChevronDown
            size={14}
            className={cn(
              "text-gray-400 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Collapsible content */}
      {isExpanded && (
        <div className="rounded-b-lg border border-t-0 border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/30">
          <div className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <div className="whitespace-pre-wrap">
                {displayText}
                {isLoading && (
                  <span className="ml-1 inline-block h-3 w-0.5 animate-pulse bg-blue-500"></span>
                )}
              </div>
            </div>
            
            {isLoading && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-blue-400 animate-pulse"></div>
                  <div className="h-1 w-1 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-1 w-1 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
                <span>Generating response...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
