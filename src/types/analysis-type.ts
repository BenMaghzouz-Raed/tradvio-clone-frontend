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
  direction: AnalysisDirectionType | null;
  market_trend: string | null;
  pattern: string | null;
  confidence_score: number | null;
  // suggested trade fields for summary cards
  suggested_entry_price?: number | null;
  suggested_stop_loss?: number | null;
  suggested_take_profit?: number | null;
  suggested_risk_reward?: number | null;
  suggested_position_size?: number | null;
};

export type AnalysisDetails = AnalysisType & {
  user_id?: string;
  ocr_vendor?: string | null;
  ocr_text?: Record<string, unknown> | null;
  ai_model?: string | null;
  ai_request?: Record<string, unknown> | null;
  ai_response?: Record<string, unknown> | null;
  insights_json?: unknown[] | null;
};
