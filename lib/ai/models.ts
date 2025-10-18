export const DEFAULT_CHAT_MODEL: string = "Meow - Sas-1";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "Meow - Sas-1",
    name: "Meow - Sas-1",
    description: "Specialized model with unique capabilities for various tasks",
  },
  {
    id: "Meow-reasoning",
    name: "Meow Reasoning",
    description: "Advanced reasoning model with step-by-step thinking process",
  },
];
