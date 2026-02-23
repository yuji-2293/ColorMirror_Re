import { useState } from 'react';
import { type AuthParams } from '@/app/features/auth/types/authType';
import { signIn } from '@/app/features/auth/api/auth';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
import { toast } from 'sonner';
import { type SignInNavState } from '@/app/features/auth/types/authType';
import { type SignInErrors } from '@/app/features/auth/types/authType';
import { validationSignIn } from '@/app/features/auth/validations/signInValidations';

export const useSignIn = () => {
  const location = useLocation();
  // locationを型安全に扱うためのローカル変数。サインイン後のリダイレクトで、メールアドレスやトースト表示の情報を受け取るために使用。
  const localState = location.state as SignInNavState;
  // location.stateからemailを初期値として取得。サインイン後のリダイレクトで、signUpから遷移してきた場合に、メールアドレスを表示するために使用。location.stateにemailがない場合は、空文字を初期値とする。
  const initialEmail = localState?.email || '';
  const [email, setEmail] = useState(initialEmail);

  // ログイン用のpassword状態管理
  const [password, setPassword] = useState('');

  // バリデーションエラーを管理するためのstate。SignInErrors型で、email、password、formの各フィールドをオプショナルに定義。
  const [errors, setErrors] = useState<SignInErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // zustand の状態管理で使用するためのstateと関数
  const login = useAuthStore((state) => state.login);

  // 入力変更を検知してエラー表示を消すための関数。emailとpasswordの両方の入力変更を検知して、対応するエラーメッセージをerrors状態から削除する。
  const handleChangeEmail = (e: string) => {
    setEmail(e);
    setErrors((prevErrors) => ({ ...prevErrors, email: undefined, form: undefined }));
  };
  const handleChangePassword = (e: string) => {
    setPassword(e);
    setErrors((prevErrors) => ({ ...prevErrors, password: undefined, form: undefined }));
  };
  // submitの制御
  const handleSubmit = email.trim().length > 0 && password.trim().length > 0;

  // signIn API処理(signIn api呼び出し後、zustandのlogin関数を実行)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // すでに送信中の場合は処理を中断する。

    // バリデーションの実行
    // validationSignIn関数を呼び出して、emailとpasswordのバリデーションを行う。エラーがある場合は、errors状態にセットして処理を中断する。
    const Errors = validationSignIn(email, password);
    // バリデーションエラーがある場合は、errors状態にセットして処理を中断する。
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      return;
    }
    setErrors({}); // バリデーションエラーがない場合は、errors状態をクリアする。
    setIsSubmitting(true); // 送信中フラグを立てる。
    try {
      // ログイン用パラメータ
      const params: AuthParams = {
        email,
        password,
      };
      const res = await signIn(params);
      const resUser = res.data.data;
      const id = resUser.id;
      const name = resUser.name;
      console.log('ログイン成功:', id, name);
      toast.success('ログインに成功しました。');
      // フロント側をログイン状態にする
      login({ id: id, name: name });
    } catch (error) {
      // ログイン失敗時のエラーハンドリング
      // ここでは、トーストでエラーメッセージを表示し、コンソールにエラーを出力する。また、errors状態にフォーム全体のエラーメッセージをセットする。
      toast.error('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      console.error('ログインエラー:', error);
      setErrors({ form: 'ログインに失敗しました。メールアドレスとパスワードを確認してください。' });
    } finally {
      setIsSubmitting(false); // 送信中フラグを下ろす。
    }
  };
  return {
    email,
    password,
    handleLogin,
    errors,
    setErrors,
    handleChangeEmail,
    handleChangePassword,
    handleSubmit,
    isSubmitting,
  };
};
