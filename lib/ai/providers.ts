import { xai } from "@ai-sdk/xai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const languageModels = {
  "grok-4": xai("grok-2-1212"), // Using grok-2-1212 as grok-4 may not be available yet
  "grok-2-1212": xai("grok-2-1212"),
  "grok-3": xai("grok-2-1212"), // Using grok-2-1212 as fallback
  "grok-3-fast": xai("grok-2-1212"), // Using grok-2-1212 as fallback
  "grok-3-mini": xai("grok-2-1212"), // Using grok-2-1212 as fallback
  "grok-3-mini-fast": xai("grok-2-1212"), // Using grok-2-1212 as fallback

  // --- NEW MODELS ---
  "Meow - Sas-1": xai("grok-2-1212"),
  "Meow-reasoning": wrapLanguageModel({
    model: xai("grok-2-1212"),
    middleware: extractReasoningMiddleware({ tagName: "think" }),
  }),
};

export type ModelID = keyof typeof languageModels;

export const MODELS = Object.keys(languageModels) as ModelID[];

export const defaultModel: ModelID = "grok-4";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "chat-model": xai("grok-2-1212"),
        "chat-model-reasoning": wrapLanguageModel({
          model: xai("grok-3-mini-latest"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": xai("grok-2-1212"),
        "artifact-model": xai("grok-2-1212"),
        ...languageModels,
      },
    });
