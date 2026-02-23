import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/app/store/useAuthStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { type SignInNavState } from '@/app/features/auth/types/authType';

export const useAuthToast = () => {
  // サインイン用のロジック
  const location = useLocation();
  const navigate = useNavigate();
  const clearRedirectReason = useAuthStore((state) => state.clearRedirectedReason);
  // strict-mode 対応のため、2回実行されないようにガード
  const restoreStartedRef = useRef(false);

  useEffect(() => {
    if (restoreStartedRef.current) return;
    // location.stateをローカル変数に保存。サインイン後のリダイレクトで、メールアドレスやトースト表示の情報を受け取るために使用。
    const state = location.state as SignInNavState;
    // location.stateにtoastやemailの情報がない場合は、サインイン後のリダイレクトではないと判断し、何もしない。これにより、サインイン後のリダイレクトでのみトーストが表示されるようになる。
    if (!state?.toast && !state?.email) return;
    // サインイン後のリダイレクトであると判断し、restoreStartedRefをtrueにして、以降のuseEffectの実行をガードする。これにより、サインイン後のリダイレクトでのみトーストが表示されるようになる。
    restoreStartedRef.current = true;
    // stateにemailがあれば、signUpから遷移してきたとして、toastを表示
    if (state?.email) toast.success('登録が完了しました。ログインしてください。');
    // stateにtoastがあれば、ログインが必要だった、もしくはログアウトした後のリダイレクトとして、toastを表示
    if (state?.toast === 'login_require') toast.error('ログインが必要です。');
    if (state.toast === 'logged_out') toast.success('ログアウトしました。');
    clearRedirectReason();
    navigate('.', { replace: true, state: null });
  }, [navigate, location.state, clearRedirectReason]);

  return;
};
