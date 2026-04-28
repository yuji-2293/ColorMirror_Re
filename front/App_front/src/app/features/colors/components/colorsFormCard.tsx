import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { type ColorsFormCardProps } from '@/app/features/colors/types/Color';

export const ColorsFormCard = ({ children }: ColorsFormCardProps) => {
  return (
    <div className="FormUI">
      <Card className="w-6xl opacity-90">
        <CardHeader>
          <CardTitle className="text-2xl text-center">入力Card</CardTitle>
          <CardDescription>
            <p className="text-center">気分を入力してcolorを作成</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* カラーの新規作成フォームをここに実装 */}
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
// <form>
//   <div className="grid gap-4">
//     <div className="grid gap-2">
//       <Label htmlFor="colorName">色の名前</Label>
//       <Input id="colorName" type="text" placeholder="色の名前を入力" />
//     </div>
//     <div className="grid gap-2">
//       <Label htmlFor="mood">ムード</Label>
//       <Input id="mood" type="text" placeholder="ムードを入力" />
//     </div>
//     <Button type="submit">作成</Button>
//   </div>
// </form>
