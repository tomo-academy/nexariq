"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2, CheckCircle, Brain, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageReasoningProps = {
  isLoading: boolean;
  reasoning: string;
};

export function MessageReasoning({
  isLoading,
  reasoning,
}: MessageReasoningProps) {
  const [isExpanded, setIsExpanded] = useState(true); // Default to expanded for better UX
  const [displayText, setDisplayText] = useState("");
  const [progress, setProgress] = useState(0);

  // Advanced streaming text effect with progress tracking
  useEffect(() => {
    if (isLoading && reasoning) {
      let index = 0;
      const totalLength = reasoning.length;
      const interval = setInterval(() => {
        if (index <= totalLength) {
          setDisplayText(reasoning.slice(0, index));
          setProgress((index / totalLength) * 100);
          index += Math.random() > 0.5 ? 2 : 1; // Variable speed for more realistic feel
        } else {
          clearInterval(interval);
          setProgress(100);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      setDisplayText(reasoning);
      setProgress(100);
    }
  }, [isLoading, reasoning]);

  // Auto-expand when new reasoning starts
  useEffect(() => {
    if (isLoading) {
      setIsExpanded(true);
    }
  }, [isLoading]);

  return (
    <div className="my-4">
      {/* TOMO CHAT Advanced Crafting Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-300 hover:shadow-md",
          "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20",
          "hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30",
          isExpanded && "rounded-b-none shadow-lg"
        )}
        data-testid="message-reasoning"
      >
        <div className="flex items-center gap-4">
          {/* Advanced Crafting Icon with Animation */}
          <div className="relative flex items-center">
            <div className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
              "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg",
              isLoading && "animate-pulse"
            )}>
              {isLoading ? (
                <div className="relative">
                  <Brain size={20} className="text-white" />
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  </div>
                </div>
              ) : (
                <CheckCircle size={20} className="text-white" />
              )}
              
              {/* Glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 blur-md opacity-0 transition-opacity duration-300",
                isLoading && "opacity-30"
              )} />
            </div>

            {/* Progress Ring */}
            {isLoading && (
              <div className="absolute inset-0">
                <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-blue-200 dark:text-blue-800"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={`${progress * 1.13} 113`}
                    className="text-blue-500 transition-all duration-300"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Title and Status */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Crafting
              </span>
              {isLoading && (
                <div className="flex items-center gap-1">
                  <Zap size={14} className="text-yellow-500 animate-pulse" />
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                    AI Thinking...
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Step-by-step reasoning
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Reasoning Complete
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    • {displayText.split(' ').length} thoughts processed
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Real-time stats */}
          {isLoading && (
            <div className="hidden sm:flex flex-col items-end">
              <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                {Math.round(progress)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {displayText.split(' ').length} words
              </div>
            </div>
          )}

          {/* Toggle Button */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {isExpanded ? "Hide" : "Show"}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                "text-gray-400 transition-all duration-300 group-hover:text-gray-600",
                isExpanded && "rotate-180"
              )}
            />
          </div>
        </div>
      </button>

      {/* Advanced Collapsible Content */}
      {isExpanded && (
        <div className={cn(
          "rounded-b-xl border border-t-0 transition-all duration-300",
          "border-blue-200 bg-gradient-to-b from-white to-blue-50/30 dark:border-blue-800 dark:from-gray-900 dark:to-blue-900/10",
          "deepseek-slide-down"
        )}>
          <div className="p-6">
            {/* Progress Bar */}
            {isLoading && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Reasoning Progress
                  </span>
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Reasoning Content */}
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                  {displayText}
                  {isLoading && (
                    <span className="ml-1 inline-block w-2 h-4 bg-blue-500 animate-pulse rounded-sm" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Real-time Processing Indicator */}
            {isLoading && (
              <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                    <div className="absolute inset-0 animate-ping">
                      <Loader2 size={16} className="text-blue-400 opacity-20" />
                    </div>
                  </div>
                  <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    AI is processing your request...
                  </span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            )}

            {/* Completion Summary */}
            {!isLoading && displayText && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                    Reasoning completed successfully
                  </span>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    • {displayText.split('\n').length} steps • {displayText.split(' ').length} thoughts
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
