/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";

export default function AiInsights({
  aiAnalysis,
  final_recommendation,
}: {
  aiAnalysis: any;
  final_recommendation: any;
}) {
  return (
    <Card className="p-4 mt-4 gap-2">
      <h3>Ai Reasoning and insights</h3>
      <div className="flex flex-col p-4 gap-2">
        {aiAnalysis.ai_insights.map((insight: string) => (
          <p className="font-normal text-[14px] text-gray">{insight}</p>
        ))}

        <p className="font-normal text-[14px] text-gray">
          <b>Decision:</b>
          {" " + final_recommendation?.decision}
        </p>

        <p className="font-normal text-[14px] text-gray">
          <b>Summary:</b>
          {" " + final_recommendation?.summary}
        </p>

        <p className="font-normal text-[14px] text-gray">
          <b>Alert:</b>
          {" " + final_recommendation?.alert}
        </p>
      </div>
    </Card>
  );
}
