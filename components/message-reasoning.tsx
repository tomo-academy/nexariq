"use client";

import { useEffect, useState } from "react";
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

  // Parse reasoning content to identify steps
  const parseReasoningSteps = (content: string) => {
    // Look for numbered steps or bullet points
    const stepRegex = /^\d+\.\s+(.+?)(?=\n\d+\.|\n\n|$)/gms;
    const bulletRegex = /^-\s+(.+?)(?=\n-|\n\n|$)/gms;
    
    let steps = [];
    let match;
    
    // Try to extract numbered steps first
    while ((match = stepRegex.exec(content)) !== null) {
      steps.push({
        title: match[1].split('\n')[0],
        content: match[1].replace(match[1].split('\n')[0], '').trim()
      });
    }
    
    // If no numbered steps, try bullet points
    if (steps.length === 0) {
      while ((match = bulletRegex.exec(content)) !== null) {
        steps.push({
          title: match[1].split('\n')[0],
          content: match[1].replace(match[1].split('\n')[0], '').trim()
        });
      }
    }
    
    // If still no structured steps, treat the whole content as one step
    if (steps.length === 0) {
      steps = [{ title: "Reasoning Process", content }];
    }
    
    return steps;
  };

  const reasoningSteps = parseReasoningSteps(reasoning);

  return (
    <Reasoning
      data-testid="message-reasoning"
      defaultOpen={hasBeenStreaming}
      isStreaming={isLoading}
      className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm"
    >
      <ReasoningTrigger 
        className={cn(
          "px-4 py-3 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center justify-between",
          "border-b border-gray-200 dark:border-gray-800"
        )}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
            </svg>
          </div>
          <span className="font-medium text-gray-900 dark:text-gray-100">Reasoning Process</span>
          {isLoading && (
            <div className="flex items-center gap-1 ml-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-150"></div>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn("transition-transform", isExpanded ? "rotate-180" : "")}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </ReasoningTrigger>
      
      <ReasoningContent className={cn("bg-white dark:bg-gray-950 p-0", !isExpanded && "hidden")}>
        <div className="p-4 space-y-4">
          {reasoningSteps.map((step, index) => (
            <div key={index} className="relative">
              {index > 0 && (
                <div className="absolute left-4 top-0 w-px h-full bg-gray-200 dark:bg-gray-800 -translate-y-4"></div>
              )}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {step.title}
                  </h4>
                  {step.content && (
                    <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {step.content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </ReasoningContent>
    </Reasoning>
  );
}
