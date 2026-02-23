// 特定のフィールドのエラーをクリアするための関数。フィールド名を引数に取り、そのフィールドに関連するエラーメッセージをerrors状態から削除する。
export function clearFieldErrors<T extends { form?: string }>(
  setErrors: React.Dispatch<React.SetStateAction<T>>,
  field: keyof T
) {
  setErrors((prev) => ({
    ...prev,
    [field]: undefined,
    form: undefined, // フォーム全体のエラーもクリアする
  }));
}
