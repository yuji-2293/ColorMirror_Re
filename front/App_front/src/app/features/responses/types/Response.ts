// generateResponseのレスポンスの型定義
export type AiResponse = {
  data: string;
};
// generateResponseの送信リクエストの型定義
export type GenerateResponseDataParams = {
  response: {
    mood: string;
    color_name: string;
  };
};
// createResponseのレスポンスの型定義
export type CreateResponse = {
  data: string;
};
// createResponseの送信リクエストの型定義
export type CreateResponseDataParams = {
  color: {
    mood: string;
    color_name: string;
  };
  response: {
    ai_response: string;
  };
};
// createFormのpropsの型定義
export type CreateFormProps = {
  mood: string;
  setMood: React.Dispatch<React.SetStateAction<string>>;
  selectedColorName: string;
  setSelectedColorName: React.Dispatch<React.SetStateAction<string>>;
  aiResponse: string;
  setAiResponse: React.Dispatch<React.SetStateAction<string>>;
  resetAll: () => void;
  resetAiResponseData: () => void;
  resetColors: () => void;
  aiResponseData: string;
  generateResponse: (params: GenerateResponseDataParams) => void;
  isSuccess: boolean;
  isPending: boolean;
};
