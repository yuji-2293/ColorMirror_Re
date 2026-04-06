export type AiResponse = {
  data: string;
};
export type GenerateResponseDataParams = {
  response: {
    mood: string;
    color_name: string;
  };
};

export type CreateResponse = {
  data: string;
};
export type CreateResponseDataParams = {
  color: {
    mood: string;
    color_name: string;
  };
  response: {
    ai_response: string;
  };
};

export type CreateFormProps = {
  mood: string;
  selectedColorName: string;
  setMood: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColorName: React.Dispatch<React.SetStateAction<string>>;
  aiResponse: string;
  setAiResponse: React.Dispatch<React.SetStateAction<string>>;
};
