"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Lightbulb, Zap } from "lucide-react";
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

  // Parse reasoning into structured steps
  const parseReasoningSteps = (content: string) => {
    const lines = content.split("\n").filter((line) => line.trim());
    const steps: string[] = [];
    let currentStep: string[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Detect step numbers (1., 2., etc.)
      if (/^\d+\./.test(trimmed)) {
        if (currentStep.length > 0) {
          steps.push(currentStep.join(" "));
          currentStep = [];
        }
        currentStep.push(trimmed.replace(/^\d+\.\s*/, ""));
      } else if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
        if (currentStep.length > 0) {
          steps.push(currentStep.join(" "));
          currentStep = [];
        }
        currentStep.push(trimmed.replace(/^[-•]\s*/, ""));
      } else if (trimmed) {
        currentStep.push(trimmed);
      }
    });

    if (currentStep.length > 0) {
      steps.push(currentStep.join(" "));
    }

    return steps.filter((s) => s.length > 0);
  };

  const steps = parseReasoningSteps(reasoning);

  return (
    <div
      className={cn(
        "w-full rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow",
        "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800",
        "border-slate-200 dark:border-slate-700"
      )}
      data-testid="message-reasoning"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full px-4 py-3 flex items-center justify-between",
          "hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
            <Lightbulb size={16} className="drop-shadow" />
          </div>

          {/* Title and Status */}
          <div className="flex flex-col items-start">
            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              Reasoning Process
            </span>
            {isLoading && (
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Zap size={12} className="animate-pulse" />
                Thinking...
              </span>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {isLoading && (
            <div className="flex items-center gap-1 mr-2">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
              <div
                className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
          <ChevronDown
            size={18}
            className={cn(
              "text-slate-600 dark:text-slate-400 transition-transform duration-300",
              isExpanded ? "rotate-180" : ""
            )}
          />
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950/50">
          <ReasoningContent className="px-4 py-4">
            <div className="space-y-3">
              {steps.length > 0 ? (
                steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      {/* Step number circle */}
                      <div className="flex items-center justify-center w-6 h-6 mt-0.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 text-white text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>

                      {/* Step content */}
                      <div className="flex-1 pt-0.5">
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-600 dark:text-slate-400 text-sm italic">
                  {reasoning}
                </p>
              )}

              {isLoading && (
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Still thinking...
                  </span>
                </div>
              )}
            </div>
          </ReasoningContent>
        </div>
      )}
    </div>
  );
}
