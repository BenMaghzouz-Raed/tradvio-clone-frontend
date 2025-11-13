import { TradeType } from "./trade";

export type AnalysisDirection = "LONG" | "SHORT";

export type MarketTrend = "NEUTRAL" | "BULLISH" | "BEARISH";

export type AnalysisStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface IChartAnalysis {
  analysis_id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;

  // user inputs
  chart_image_url: string;
  account_balance: number;
  stop_loss_points: number;
  take_profit_points: number;
  risk_percent: number;
  timeframe: string;
  trading_type: TradeType;

  // Core Chart Data
  symbol: string;
  direction: AnalysisDirection;
  market_trend: MarketTrend;
  pattern: string;
  confidence_score: number;
  status: AnalysisStatus;

  // extracted data from image
  extractable_data: object;

  // Analysis Insights
  ai_analysis_result: object; // Stores an array of structured insights (replaces analysis_insights table)

  // Link to Trade
  trade_id: string;
}
