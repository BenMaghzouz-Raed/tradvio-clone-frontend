import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function Settings() {
  return (
    <Card className="text-[#44403C] bg-[#FAFAF9] h-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-base">Settings & Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="w-full bg-[#F5F5F4] cursor-pointer hover:bg-[#E7E5E4]"
        >
          <CreditCard /> Update Payment Method
        </Button>
      </CardContent>
    </Card>
  );
}
