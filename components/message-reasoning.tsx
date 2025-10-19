"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, Brain } from "lucide-react";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "./elements/reasoning";
import { cn } from "@/lib/utils";

type MessageReasoningProps = {
  isLoading: boolean;
  reasoning: string;
};

export function MessageReasoning({
  isLoading,
  reasoning,
}: MessageReasoningProps) {
  const [hasBeenStreaming, setHasBeenStreaming] = useState(isLoading);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setHasBeenStreaming(true);
    }
  }, [isLoading]);

  // Format the reasoning string with HTML-like structure for better display
  const formatReasoningContent = (content: string) => {
    // Replace numbered steps with styled HTML
    let formattedContent = content.replace(/^\d+\.\s+(.+?)(?=\n\d+\.|\n\n|$)/gms, 
      '<div class="reasoning-step"><span class="step-number">$&</span></div>');
    
    // Replace bullet points with styled HTML
    formattedContent = formattedContent.replace(/^-\s+(.+?)(?=\n-|\n\n|$)/gms, 
      '<div class="reasoning-step"><span class="step-bullet">$&</span></div>');
    
    return formattedContent;
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg overflow-hidden",
        "bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm",
        "border border-slate-700/50 shadow-xl"
      )}
      data-testid="message-reasoning"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full px-4 py-3 flex items-center justify-between",
          "bg-gradient-to-r from-indigo-900/30 to-purple-900/20",
          "hover:from-indigo-900/40 hover:to-purple-900/30 transition-all duration-200",
          "border-b border-slate-700/50"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
            <Brain size={18} className="drop-shadow" />
          </div>

          {/* Title and Status */}
          <div className="flex flex-col items-start">
            <span className="font-semibold text-white text-sm flex items-center gap-2">
              Thinking Process
              {isLoading && (
                <span className="flex items-center gap-1">
                  <Sparkles size={14} className="text-purple-400 animate-pulse" />
                </span>
              )}
            </span>
            {isLoading && (
              <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                Processing...
              </span>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="flex items-center gap-1 mr-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
              <div
                className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
          <ChevronDown
            size={18}
            className={cn(
              "text-slate-400 transition-transform duration-300",
              isExpanded ? "rotate-180" : ""
            )}
          />
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="bg-slate-900/50 backdrop-blur-sm">
          <ReasoningContent className="px-4 py-4">
            {reasoning}
          </ReasoningContent>
          
          {isLoading && (
            <div className="flex items-center gap-2 px-4 pb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400 font-medium">
                Analyzing...
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
