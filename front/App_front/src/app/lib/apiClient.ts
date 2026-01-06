import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter'; // axiosのレスポンスデータのキーをキャメルケースに変換するミドルウェア
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

const headers = {
  'Content-Type': 'application/json',
};
const options = {
  ignoreHeaders: true, // レスポンスヘッダーは変換しない
};

export const ApiClient = applyCaseMiddleware(axios.create({ baseURL, headers }), options); //snake_case ⇔ camelCase

// 上で生成したaxiosインスタンスに .use(成功時関数, 失敗時関数)という形でインターセプターする関数（割り込んで処理を挟む）を登録する
ApiClient.interceptors.request.use((config) => {
  // configはリクエスト情報が入っているオブジェクト（= axiosが持つAxiosRequestConfig という設定オブジェクト。）
  //client.interceptors.requestでリクエスト送信前に割り込みたい処理を書く
  //.useまでつけることで、リクエスト直前に実行したい関数を定義できる
  const accessToken = Cookies.get('_access-token');
  const clientId = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  // Cookie情報のログ
  console.log('request cookie', {
    accessToken,
    clientId,
    uid,
  });

  if (accessToken && clientId && uid) {
    config.headers['access-token'] = accessToken;
    config.headers['client'] = clientId;
    config.headers['uid'] = uid;
  }
  return config; //認証情報をヘッダーに付与して返す,configに適用
});

ApiClient.interceptors.response.use(
  //client.interceptors.responseの場合は受信直後に割り込みたい処理が書けます
  (response) => {
    // 成功時の処理
    const accessToken = response.headers['access-token'];
    const clientId = response.headers['client'];
    const uid = response.headers['uid'];
    // Cookie情報のログ
    console.log('response cookie', {
      accessToken,
      clientId,
      uid,
    });

    if (accessToken && clientId && uid) {
      Cookies.set('_access-token', accessToken);
      Cookies.set('_client', clientId);
      Cookies.set('_uid', uid);
    }
    return response; // return responseで認証情報を更新して返す
  },
  (error) => {
    console.log(error);
    switch (error.response?.status) {
      case 401:
        break;
      case 404:
        break;
      default:
        console.log('== internal server error ==');
        console.log(error.response);
    }
    const errorMessage = (error.response?.data?.message || '').split(',');
    throw new Error(errorMessage);
  }
);
