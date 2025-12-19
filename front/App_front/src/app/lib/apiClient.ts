import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter'; // axiosのレスポンスデータのキーをキャメルケースに変換するミドルウェア

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

const headers = {
  'Content-Type': 'application/json',
};
const options = {
  ignoreHeaders: true, // レスポンスヘッダーは変換しない
};

export const ApiClient = applyCaseMiddleware(axios.create({ baseURL, headers }), options);

// 上で生成したaxiosインスタンスに .use(成功時関数, 失敗時関数)という形でインターセプターする関数（割り込んで処理を挟む）を登録する
ApiClient.interceptors.response.use(
  // あらかじめaxios内で定義されてる第一引数の成功時の関数
  (response) => {
    console.log(response.data);
    return response;
  },
  // あらかじめaxios内で定義されてる第二引数の失敗時の関数
  (error) => {
    console.log(error);
    switch (error.response?.status) {
      case 401:
        break;
      case 404:
        break;
      default:
        console.log('== internal server error ==');
    }
    const errorMessage = (error.response?.data?.message || '').split(',');
    throw new Error(errorMessage);
  }
);
