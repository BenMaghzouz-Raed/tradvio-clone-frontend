type AnalysisDirectionType = "SHORT" | "LONG";

type AnalysisStatusType = "PENDING" | "COMPLETED" | "FAILED";

export type AnalysisType = {
  analysis_id: string;
  created_at: Date;
  updated_at: Date;
  symbol: string;
  timeframe: string;
  chart_image_url: string;
  status: AnalysisStatusType;
  error_message: string;
  direction: AnalysisDirectionType;
  market_trend: string;
  pattern: string;
  confidence_score: number;
};
