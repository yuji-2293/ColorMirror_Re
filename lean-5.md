## 日付け 2025/ 2/14

### 今日やったこと
  - toast表示と状態による切り替え
    - shadcn/ui Sonner を使用
    - App.tsx(トップレベルにて) ```import { Toaster } from '@/components/ui/sonner';```を読み込む
    - 必要とするcomponentにて``` import { toast } from 'sonner'; ```でtoastが使用可能になる


### 詰まったこと（エラー、調査したこと、考えたこと。調査→仮説→検証
  - <現象> Private Publicそれぞれにてtoastにてアクションに合致したtoastの表示を行いたい
    - ログイン・ログアウトの挙動と、ProtectedRouteのガード節による強制リダイレクトとでtoastが重複している
  - <所感>
  - <対応>
    - 
