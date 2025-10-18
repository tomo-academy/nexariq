export const DEFAULT_CHAT_MODEL: string = "meow-sas-1";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "meow-sas-1",
    name: "Meow - Sas-1",
    description: "Advanced multimodal model with vision and text capabilities",
  },
  {
    id: "meow-reasoning",
    name: "Meow Reasoning",
    description: "Uses advanced chain-of-thought reasoning for complex problems",
  },
];

// Export the two models separately as requested
export const meowSas1Model: ChatModel = {
  id: "meow-sas-1",
  name: "Meow - Sas-1",
  description: "Advanced multimodal model with vision and text capabilities",
};

export const meowReasoningModel: ChatModel = {
  id: "meow-reasoning",
  name: "Meow Reasoning",
  description: "Uses advanced chain-of-thought reasoning for complex problems",
};
