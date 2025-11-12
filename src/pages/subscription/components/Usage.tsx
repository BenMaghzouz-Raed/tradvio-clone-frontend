import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Usage() {
  return (
    <Card className="text-[#44403C] bg-[#FAFAF9]">
      <CardHeader className="pb-1">
        <CardTitle className="text-base">Usage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Projects</span>
          <span>8 / unlimited</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>Storage</span>
          <span>45GB / 100GB</span>
        </div>
        <Progress value={45} className="[&>div]:bg-[#1C1917]" />
      </CardContent>
    </Card>
  );
}
