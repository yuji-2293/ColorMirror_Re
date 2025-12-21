export interface AuthType {
  id: number;
  email: string;
  uid: string;
  provider: string;
  allowPasswordChange: boolean;
  name: string;

  createdAt: string;
  updatedAt: string;
  isLogin: boolean;
}
