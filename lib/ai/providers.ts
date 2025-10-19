// lib/ai/providers.ts

import { xai } from "@ai-sdk/xai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const languageModels = {
  "meow-flash": xai("grok-3-fast-latest"),
  "meow-reasoning": xai("grok-3-latest"),
};

export type ModelID = keyof typeof languageModels;

export const MODELS = Object.keys(languageModels) as ModelID[];

export const defaultModel: ModelID = "meow-flash";

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
          "meow-flash": chatModel,
          "meow-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "meow-flash": xai("grok-3-fast-latest"),
        "meow-reasoning": wrapLanguageModel({
          model: xai("grok-3-latest"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": xai("grok-2-1212"),
        "artifact-model": xai("grok-2-1212"),
      },
    });
