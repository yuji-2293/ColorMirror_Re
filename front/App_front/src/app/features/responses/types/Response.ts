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
  selectedColorName: string;
  aiResponse: string;
  setAiResponse: React.Dispatch<React.SetStateAction<string>>;
};
