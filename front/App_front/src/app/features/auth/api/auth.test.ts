import { ApiClient } from '@/app/lib/apiClient';
import { type AuthParams } from '@/app/features/auth/types/authType';
import { signUp, signIn, signOut } from '@/app/features/auth/api/auth';
import Cookies from 'js-cookie';

const signUpParams: AuthParams = {
  name: 'yuji',
  email: 'q',
  password: 'q',
  password_confirmation: 'q',
};

const signInParams: AuthParams = {
  email: 'e',
  password: 'p',
};

describe('Auth API', () => {
  it('パラメーターが正しくsignUp用APIに渡されること', async () => {
    // spyOnを使ってApiClientを監視、mockResolvedValueOnceを使ってモックオブジェクトを返すように設定する
    const signUpSpy = vi.spyOn(ApiClient, 'post').mockResolvedValueOnce(signUpParams);
    // signUp関数を呼び出す
    const result = await signUp(signUpParams);
    // expectでApiClient.postを指定、toHaveBeenCalledWithで('/auth', { registration: signUpParams })が呼ばれたことを確認する
    expect(signUpSpy).toHaveBeenCalledWith('/auth', { registration: signUpParams });
    // expectでresultを実行、toEqualでsignUpParamsと一致することを確認する
    expect(result).toEqual(signUpParams);
  });
  it('パラメーターが正しくsignIn用APIに渡されること', async () => {
    // spyOnを使ってApiClientを監視、mockResolvedValueOnceを使ってモックオブジェクトを返すように設定する
    const signInSpy = vi.spyOn(ApiClient, 'post').mockResolvedValueOnce(signInParams);
    // signIn関数を呼び出す
    const result = await signIn(signInParams);
    // expectでApiClient.postを指定、toHaveBeenCalledWithで('/auth/sign_in', signInParams)が呼ばれたことを確認する
    expect(signInSpy).toHaveBeenCalledWith('/auth/sign_in', signInParams);
    // expectでresultを実行、toEqualでsignInParamsと一致することを確認する
    expect(result).toEqual(signInParams);
  });
  it('signOut用APIが正しく呼ばれること', async () => {
    // spyOnを使ってApiClientを監視、mockResolvedValueOnceを使ってモックオブジェクトを返すように設定する
    const signOutSpy = vi.spyOn(ApiClient, 'delete').mockResolvedValueOnce({});
    const removeSpy = vi.spyOn(Cookies, 'remove').mockImplementation(() => {});
    // signOut関数を呼び出す
    await signOut();
    // expectでApiClient.deleteを指定、toHaveBeenCalledWithで('/auth/sign_out')が呼ばれたことを確認する
    expect(signOutSpy).toHaveBeenCalledWith('/auth/sign_out');
    expect(removeSpy).toHaveBeenCalledWith('_access-token');
    expect(removeSpy).toHaveBeenCalledWith('_client');
    expect(removeSpy).toHaveBeenCalledWith('_uid');
  });
});
