import { xai } from "@ai-sdk/xai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const baseModel = xai("grok-2-1212");

const languageModels = {
  "grok-4": baseModel,
  "grok-2-1212": baseModel,
  "grok-3": baseModel,
  "grok-3-fast": baseModel,
  "grok-3-mini": baseModel,
  "grok-3-mini-fast": baseModel,

  // --- UPDATED MODELS ---
  "meow-sas-1": baseModel, // <-- Changed ID to match models.ts
  "meow-reasoning": wrapLanguageModel({ // <-- Changed ID to match models.ts
    model: baseModel,
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
        "chat-model": baseModel,
        "chat-model-reasoning": wrapLanguageModel({
          model: xai("grok-3-mini-latest"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": baseModel,
        "artifact-model": baseModel,
        ...languageModels,
      },
    });
