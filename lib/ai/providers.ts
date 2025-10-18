import { xai } from "@ai-sdk/xai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

// Remove all the Grok models since we're only using Meow models now
export type ModelID = "meow-sas-1" | "meow-reasoning";

export const MODELS: ModelID[] = ["meow-sas-1", "meow-reasoning"];

export const defaultModel: ModelID = "meow-sas-1";

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
          "meow-sas-1": chatModel,
          "meow-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        "meow-sas-1": xai("grok-2-1212"), // Using grok-2-1212 as the underlying model
        "meow-reasoning": wrapLanguageModel({
          model: xai("grok-3-mini-latest"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": xai("grok-2-1212"),
        "artifact-model": xai("grok-2-1212"),
      },
    });
