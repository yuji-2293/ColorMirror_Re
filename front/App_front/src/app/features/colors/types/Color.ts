export interface Response {
  aiResponse: string;
}
export interface Color {
  id: number;
  colorName: string;
  mood: string;
  createdAt: string;
  response: Response;
}

// APIからのレスポンスの型定義
export type ColorResponse = {
  data: Color[];
};
// 新しいカラーを作成するためのリクエストの型定義
export interface CreateColorParams {
  color: {
    colorName: string;
    mood: string;
  };
}
// ムードに基づいてカラーを生成するためのリクエストの型定義
export interface GenerateMoodParams {
  mood: string;
}
// ムードに基づいて生成されたカラーの型定義
export type generateColors = {
  hex: string;
  name: string;
};
// ムードに基づいて生成されたカラーのレスポンスの型定義
export type GenerateResponse = {
  data: {
    generatedColor: generateColors[];
  };
};

export type ColorsFormProps = {
  mood: string;
  selectedColorName: string;
  setMood: React.Dispatch<React.SetStateAction<string>>;
  setSelectedColorName: React.Dispatch<React.SetStateAction<string>>;
  generateColor: (params: GenerateMoodParams) => void;
  generatedColor: generateColors[];
  resetColors: () => void;
  isPending: boolean;
  isSuccess: boolean;
};

// ColorsFormコンポーネントのpropsの型定義
export type ColorsFormCardProps = {
  children?: React.ReactNode;
};
