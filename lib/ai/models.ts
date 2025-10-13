export const DEFAULT_CHAT_MODEL: string = "grok-4";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "grok-4",
    name: "Grok 4",
    description: "Latest and most advanced Grok model with superior reasoning and understanding",
  },
  {
    id: "grok-3",
    name: "Grok 3",
    description: "Powerful model with excellent performance across various tasks",
  },
  {
    id: "grok-3-fast",
    name: "Grok 3 Fast",
    description: "Optimized for speed while maintaining high quality responses",
  },
  {
    id: "grok-3-mini",
    name: "Grok 3 Mini",
    description: "Compact model for efficient processing with good performance",
  },
  {
    id: "grok-3-mini-fast",
    name: "Grok 3 Mini Fast",
    description: "Fastest model for quick responses and high throughput",
  },
  {
    id: "grok-2-1212",
    name: "Grok 2 (Dec 2024)",
    description: "Stable Grok 2 model from December 2024 release",
  },
  {
    id: "chat-model",
    name: "Grok Vision",
    description: "Advanced multimodal model with vision and text capabilities",
  },
  {
    id: "chat-model-reasoning",
    name: "Grok Reasoning",
    description: "Uses advanced chain-of-thought reasoning for complex problems",
  },
];
