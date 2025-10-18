export const DEFAULT_CHAT_MODEL: string = "meow-sas-1";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "meow-sas-1", // <-- Changed ID
    name: "Meow - Sas-1", // <-- Kept the original display name
    description: "Specialized model with unique capabilities for various tasks",
  },
  {
    id: "meow-reasoning", // <-- Changed ID
    name: "Meow Reasoning", // <-- Kept the original display name
    description: "Advanced reasoning model with step-by-step thinking process",
  },
];
