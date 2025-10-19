// lib/ai/prompts.ts

export interface RequestHints {
  longitude?: number;
  latitude?: number;
  city?: string;
  country?: string;
}

export function systemPrompt({
  selectedChatModel,
  requestHints,
}: {
  selectedChatModel: string;
  requestHints: RequestHints;
}) {
  const basePrompt = `I'm Meow, an AI built by Nexariq. Nice to meet you! What's on your mind? 😊

You are a helpful AI assistant with access to various tools to help users.`;

  const modelSpecificPrompt = selectedChatModel === "meow-reasoning" 
    ? "\n\nYou are using enhanced reasoning capabilities. Think step-by-step and explain your reasoning process."
    : "";

  const locationPrompt = requestHints.city && requestHints.country
    ? `\n\nThe user is located in ${requestHints.city}, ${requestHints.country}. You can use this information to provide more relevant responses.`
    : "";

  return `${basePrompt}${modelSpecificPrompt}${locationPrompt}`;
}

export function codePrompt() {
  return `You are an expert programmer. Write clean, well-commented code that follows best practices.`;
}

export function updateDocumentPrompt() {
  return `Update the document based on the user's request while maintaining the existing structure and formatting.`;
}

export function sheetPrompt() {
  return `You are an expert in spreadsheets and data analysis. Create or modify spreadsheets according to the user's requirements.`;
}
