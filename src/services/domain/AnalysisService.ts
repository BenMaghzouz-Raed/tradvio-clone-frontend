import httpClient from "@/lib/http";
import { AnalysisDetails, AnalysisType } from "@/types/analysis-type";

// Normalize various backend AI payload shapes into the UI-consumed schema
const normalizeAnalysisResponse = (src: any) => {
  try {
    if (!src || typeof src !== "object") return src;
    // If already in expected shape, return as-is
    if (src.ai_analysis || src.per_strategy || src.final_recommendation) return src;

    const strategies = Array.isArray((src as any)?.strategies) ? (src as any).strategies : [];
    const per_strategy = strategies.map((s: any) => ({
      name: s?.name ?? "Strategy",
      explanation: s?.explanation ?? "",
      bias: s?.bias ?? "neutral",
      entry_zone: typeof s?.entry === "number" ? [s.entry] : [],
      stop_loss: typeof s?.stop_loss === "number" ? s.stop_loss : null,
      take_profits: typeof s?.take_profit === "number" ? [s.take_profit] : [],
      confidence_percent: typeof s?.confidence === "number" ? s.confidence : null,
    }));

    const ft = (src as any)?.final_trade || {};
    const fundamentals = (src as any)?.fundamentals_news || {};
    const num = (v: any) => (typeof v === "number" && isFinite(v) ? v : undefined);
    const entries: number[] = [num(ft?.entry), ...(Array.isArray(strategies) ? strategies : []).map((s: any) => num(s?.entry))]
      .filter((v: any) => typeof v === "number") as number[];
    const stops: number[] = [num(ft?.stop_loss), ...(Array.isArray(strategies) ? strategies : []).map((s: any) => num(s?.stop_loss))]
      .filter((v: any) => typeof v === "number") as number[];
    const tps: number[] = [num(ft?.take_profit), ...(Array.isArray(strategies) ? strategies : []).map((s: any) => num(s?.take_profit))]
      .filter((v: any) => typeof v === "number") as number[];
    const allPrices: number[] = [...entries, ...stops, ...tps] as number[];
    const minPrice = allPrices.length ? Math.min(...allPrices) : undefined;
    const maxPrice = allPrices.length ? Math.max(...allPrices) : undefined;

    const ai_analysis = {
      trend_summary: ft?.explanation ?? "",
      trend_direction: (ft?.bias ?? "").toString().toUpperCase() || undefined,
      volatility: undefined,
      momentum: undefined,
      market_sentiment: (ft?.bias ?? "").toString().toUpperCase() || undefined,
      technical_analysis: {
        support_level: null,
        resistance_level: null,
        price_range: [],
        key_zone: [],
        pattern_detected: undefined,
        signal_strength: typeof ft?.confidence === "number" ? ft.confidence : undefined,
      },
      risk_management: {
        risk_amount_usd: typeof ft?.risk_per_trade_usd === "number" ? ft.risk_per_trade_usd : undefined,
        entry_price: typeof ft?.entry === "number" ? ft.entry : undefined,
        stop_loss: typeof ft?.stop_loss === "number" ? ft.stop_loss : undefined,
        take_profit: typeof ft?.take_profit === "number" ? ft.take_profit : undefined,
        reward_risk_ratio: typeof ft?.reward_risk_ratio === "number" ? ft.reward_risk_ratio : undefined,
        position_size: typeof ft?.position_size === "number" ? ft.position_size : undefined,
      },
      trade_suggestion: {
        signal:
          (ft?.bias || "").toString().toUpperCase() === "BULLISH"
            ? "BUY"
            : (ft?.bias || "").toString().toUpperCase() === "BEARISH"
            ? "SELL"
            : "HOLD",
        entry_recommendation: typeof ft?.entry === "number" ? String(ft.entry) : undefined,
        stop_loss_recommendation: typeof ft?.stop_loss === "number" ? String(ft.stop_loss) : undefined,
        take_profit_recommendation: typeof ft?.take_profit === "number" ? String(ft.take_profit) : undefined,
        ai_confidence: typeof ft?.confidence === "number" ? ft.confidence : undefined,
      },
      ai_insights: [],
      risk_label: undefined,
      confidence_score: typeof ft?.confidence === "number" ? ft.confidence : undefined,
      reasoning_brief: ft?.explanation ?? "",
      key_factors: [],
    } as const;

    const final_recommendation = {
      decision:
        (ft?.bias || "").toString().toUpperCase() === "BULLISH"
          ? "enter_long"
          : (ft?.bias || "").toString().toUpperCase() === "BEARISH"
          ? "enter_short"
          : "no_trade",
      summary: ft?.explanation ?? "",
      entry: typeof ft?.entry === "number" ? ft.entry : undefined,
      entry_zone: typeof ft?.entry === "number" ? [ft.entry] : [],
      stop_loss: typeof ft?.stop_loss === "number" ? ft.stop_loss : undefined,
      take_profits: typeof ft?.take_profit === "number" ? [ft.take_profit] : [],
      rr_estimates: {
        tp1: typeof ft?.reward_risk_ratio === "number" ? ft.reward_risk_ratio : undefined,
        tp2: undefined,
        tp3: undefined,
      },
      time_horizon: { scalping: undefined, swing: undefined },
    } as const;

    const normalized_fundamentals = {
      news_status: fundamentals?.news_status ?? undefined,
      current_price: undefined,
      fundamental_bias: fundamentals?.bias ?? undefined,
      key_headlines: Array.isArray(fundamentals?.headlines)
        ? fundamentals.headlines
        : typeof fundamentals?.headlines === "string"
        ? [fundamentals.headlines]
        : [],
      upcoming_events: Array.isArray(fundamentals?.upcoming_risk_events)
        ? fundamentals.upcoming_risk_events
        : typeof fundamentals?.upcoming_risk_events === "string"
        ? [fundamentals.upcoming_risk_events]
        : [],
    } as const;

    // Backfill extraction metadata for Chart Data card
    const extraction = {
      metadata: {
        source:
          (src as any)?.trade_summary?.symbol || (src as any)?.user_inputs?.symbol || undefined,
        screenshot_type: undefined,
        chart_style: (src as any)?.user_inputs?.chart_timeframe || "Unknown",
        time_axis: [],
        price_axis: [],
        timestamp_range: undefined,
        prev_close: undefined,
        current_price:
          typeof ft?.entry === "number"
            ? ft.entry
            : entries.length
            ? entries[entries.length - 1]
            : undefined,
        data_confidence: typeof ft?.confidence === "number" ? ft.confidence : undefined,
      },
      chart_data: {
        price_scale_min: undefined,
        price_scale_max: undefined,
        visible_trend_points: [],
        approx_swing_high: maxPrice,
        approx_swing_low: minPrice,
        price_change: undefined,
        price_change_percent: undefined,
      },
      trend_indicators: {},
      annotations_detected: {},
      risk_parameters: {},
    } as const;

    return {
      ...src,
      extraction,
      per_strategy,
      fundamentals_news: normalized_fundamentals,
      ai_analysis,
      final_recommendation,
      disclaimer: src?.disclaimer ?? src?.disclaimer_text ?? src?.disclaimerMessage ?? "",
    };
  } catch {
    return src;
  }
};

export const analyseGraph = async (formData: FormData) => {
  // Let the browser set proper multipart/form-data with boundary
  const raw = await httpClient.post("/chart/analyze-gemini", formData);
  return normalizeAnalysisResponse(raw);
};

export type AnalysisListResponse = {
  items: AnalysisType[];
  limit: number;
  offset: number;
};

export const getAnalyses = (params: {
  limit?: number;
  offset?: number;
  status?: "PENDING" | "COMPLETED" | "FAILED";
  date_from?: string | Date;
  date_to?: string | Date;
}): Promise<AnalysisListResponse> => {
  const qp = {
    ...params,
    date_from:
      params.date_from instanceof Date
        ? params.date_from.toISOString()
        : params.date_from,
    date_to:
      params.date_to instanceof Date ? params.date_to.toISOString() : params.date_to,
  };
  return httpClient.get<AnalysisListResponse>("/chart/analyses", {
    params: qp,
  }) as unknown as Promise<AnalysisListResponse>;
};

export const getAnalysisById = (
  analysis_id: string
): Promise<AnalysisDetails> => {
  return httpClient.get<AnalysisDetails>(`/chart/analyses/${analysis_id}`) as unknown as Promise<AnalysisDetails>;
};

export type AnalysisResultResponse = {
  analysis_id: string;
  ai_response: unknown;
  ocr_text: unknown;
  status: "PENDING" | "COMPLETED" | "FAILED";
  error_message?: string | null;
};

export const getAnalysisResult = (
  analysis_id: string
): Promise<AnalysisResultResponse> => {
  return httpClient.get<AnalysisResultResponse>(`/chart/result/${analysis_id}`) as unknown as Promise<AnalysisResultResponse>;
};

export type RiskDefaultsResponse = {
  SWING?: {
    account_balance?: number;
    risk_per_trade_percent?: number;
    stop_loss_points?: number;
    take_profit_points?: number;
  };
  SCALP?: {
    account_balance?: number;
    risk_per_trade_percent?: number;
    stop_loss_points?: number;
    take_profit_points?: number;
  };
};

export const getRiskDefaults = async (): Promise<RiskDefaultsResponse> => {
  return (await httpClient.get("/chart/risk-defaults")) as RiskDefaultsResponse;
};
