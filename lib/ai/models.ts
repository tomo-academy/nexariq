export const DEFAULT_CHAT_MODEL: string = "meow-flash";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "meow-flash",
    name: "Meow Flash",
    description: "Fast model optimized for quick responses",
  },
  {
    id: "meow-reasoning",
    name: "Meow Reasoning",
    description: "Advanced model with enhanced reasoning capabilities",
  },
];
