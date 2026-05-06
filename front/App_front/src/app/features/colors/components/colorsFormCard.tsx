import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { type ColorsFormCardProps } from '@/app/features/colors/types/Color';

export const ColorsFormCard = ({ children }: ColorsFormCardProps) => {
  return (
    <div className="FormUI sm-w-full sm:max-w-7xl w-full">
      <Card className="bg-white/50 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">生成Form</CardTitle>
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
