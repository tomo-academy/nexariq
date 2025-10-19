"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, Brain, Loader2, CheckCircle } from "lucide-react";
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
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setHasBeenStreaming(true);
    }
  }, [isLoading]);

  // Parse reasoning into structured steps
  const parseReasoningSteps = (content: string) => {
    const lines = content.split("\n").filter((line) => line.trim());
    const steps: Array<{ title: string; content: string; status: "pending" | "active" | "complete" }> = [];
    let currentStep: { title: string; content: string[] } = { title: "", content: [] };

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Detect step numbers (1., 2., etc.)
      if (/^\d+\./.test(trimmed)) {
        if (currentStep.title) {
          steps.push({
            ...currentStep,
            content: currentStep.content.join(" "),
            status: "complete"
          });
        }
        currentStep = {
          title: trimmed.replace(/^\d+\.\s*/, ""),
          content: []
        };
      } else if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
        if (currentStep.title) {
          steps.push({
            ...currentStep,
            content: currentStep.content.join(" "),
            status: "complete"
          });
        }
        currentStep = {
          title: trimmed.replace(/^[-•]\s*/, ""),
          content: []
        };
      } else if (trimmed) {
        currentStep.content.push(trimmed);
      }
    });

    if (currentStep.title) {
      steps.push({
        ...currentStep,
        content: currentStep.content.join(" "),
        status: isLoading ? "active" : "complete"
      });
    }

    // Set the first step as active if loading
    if (isLoading && steps.length > 0) {
      steps[0].status = "active";
    }

    return steps;
  };

  const steps = parseReasoningSteps(reasoning);

  // Simulate step progression during loading
  useEffect(() => {
    if (isLoading && steps.length > 0) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLoading, steps.length]);

  return (
    <div
      className={cn(
        "w-full rounded-xl overflow-hidden shadow-xl",
        "bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm",
        "border border-slate-700/50 shadow-2xl"
      )}
      data-testid="message-reasoning"
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full px-5 py-4 flex items-center justify-between",
          "bg-gradient-to-r from-indigo-900/40 to-purple-900/30",
          "hover:from-indigo-900/50 hover:to-purple-900/40 transition-all duration-300",
          "border-b border-slate-700/50"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Icon with animation */}
          <div className="relative">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <Brain size={20} className="drop-shadow" />
            </div>
            {isLoading && (
              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <Sparkles size={16} className="text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-ping"></div>
                </div>
              </div>
            )}
          </div>

          {/* Title and Status */}
          <div className="flex flex-col items-start">
            <span className="font-semibold text-white text-base flex items-center gap-2">
              Thinking Process
              {isLoading && (
                <span className="flex items-center gap-1">
                  <Loader2 size={16} className="text-purple-400 animate-spin" />
                </span>
              )}
            </span>
            {isLoading ? (
              <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                Analyzing the problem...
              </span>
            ) : (
              <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <CheckCircle size={12} className="text-green-400" />
                Reasoning complete
              </span>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {isLoading && (
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
          <ChevronDown
            size={20}
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
          <ReasoningContent className="px-0 py-0">
            {reasoning}
          </ReasoningContent>
          
          {isLoading && (
            <div className="flex items-center gap-2 px-4 pb-4">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400 font-medium">
                Processing next step...
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
