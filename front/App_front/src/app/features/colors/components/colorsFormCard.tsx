import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ColorsFormCard = () => {
  return (
    <div className="FormUI">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">カラーの新規作成</CardTitle>
          <CardDescription>
            <p className="text-center">色の名前とムードを入力してカラーを作成</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* カラーの新規作成フォームをここに実装 */}
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="colorName">色の名前</Label>
                <Input id="colorName" type="text" placeholder="色の名前を入力" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mood">ムード</Label>
                <Input id="mood" type="text" placeholder="ムードを入力" />
              </div>
              <Button type="submit">作成</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
