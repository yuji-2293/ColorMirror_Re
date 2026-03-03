export interface Color {
  id: number;
  colorName: string;
  mood: string;
  createdAt: string;
}

export type ColorResponse = {
  data: Color[];
};
