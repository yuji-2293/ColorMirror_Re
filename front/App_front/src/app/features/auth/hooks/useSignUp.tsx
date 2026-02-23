import { type AuthParams } from '@/app/features/auth/types/authType';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/app/features/auth/api/auth';
import { toast } from 'sonner';
import { type SignUpErrors } from '@/app/features/auth/types/authType';
import { validationSignUp } from '@/app/features/auth/validations/signUpValidations';

export const useSignUp = () => {
  // ユーザー登録用の状態管理state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();
  // バリデーションエラーを管理するためのstate。SignUpErrors型で、name、email、password、password_confirmation、formの各フィールドをオプショナルに定義。
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 入力変更を検知してエラー表示を消すための関数。emailとpasswordの両方の入力変更を検知して、対応するエラーメッセージをerrors状態から削除する。
  const handleChangeEmail = (e: string) => {
    setEmail(e);
    setErrors((prevErrors) => ({ ...prevErrors, email: undefined, form: undefined }));
  };
  const handleChangePassword = (e: string) => {
    setPassword(e);
    setErrors((prevErrors) => ({ ...prevErrors, password: undefined, form: undefined }));
  };
  const handleChangeName = (e: string) => {
    setName(e);
    setErrors((prevErrors) => ({ ...prevErrors, name: undefined, form: undefined }));
  };
  const handleChangePasswordConfirmation = (e: string) => {
    setPasswordConfirmation(e);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password_confirmation: undefined,
      form: undefined,
    }));
  };
  // submitの制御
  const handleSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    password_confirmation.trim().length > 0;

  // signUp API処理(signUp api呼び出し後、サインインページに遷移)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // すでに送信中の場合は処理を中断する。

    // バリデーションの実行
    // validationSignUp関数を呼び出して、name、email、password、password_confirmationのバリデーションを行う。エラーがある場合は、errors状態にセットして処理を中断する。
    const Errors = validationSignUp(name, email, password, password_confirmation);
    // バリデーションエラーがある場合は、errors状態にセットして処理を中断する。
    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true); // 送信中フラグを立てる。

    // passwordとpassword_confirmationが一致するか確認
    if (password !== password_confirmation) {
      alert('パスワードとパスワード確認が一致しません。');
      setIsSubmitting(false);
      return;
    }

    // ユーザー登録用パラメータ
    const params: AuthParams = {
      name,
      email,
      password,
      password_confirmation: password_confirmation,
    };
    try {
      await signUp(params);
      navigate('/signin', { state: { email } });
    } catch (error) {
      toast.error('ユーザー登録に失敗しました');
      console.error(error);
      setErrors({ form: 'ユーザー登録に失敗しました。' });
    } finally {
      setIsSubmitting(false); // 送信中フラグを下ろす。
    }
  };
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    password_confirmation,
    setPasswordConfirmation,
    handleSignUp,
    handleChangeEmail,
    handleChangePassword,
    handleChangeName,
    handleChangePasswordConfirmation,
    errors,
    setErrors,
    isSubmitting,
    handleSubmit,
  };
};
