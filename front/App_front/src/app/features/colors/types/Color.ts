export interface Color {
  id: number;
  colorName: string;
  mood: string;
  createdAt: string;
}

export type ColorResponse = {
  data: Color[];
};

export interface CreateColorParams {
  color: {
    colorName: string;
    mood: string;
  };
}

export interface GenerateMoodParams {
  mood: string;
}

export type generateColors = {
  hex: string;
  name: string;
};
export type GenerateResponse = {
  data: {
    generatedColor: generateColors[];
  };
};
