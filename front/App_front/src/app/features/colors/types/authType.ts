export interface AuthType {
  id: number;
  email: string;
  uid: string;
  provider: string;
  allowPasswordChange: boolean;
  name: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
