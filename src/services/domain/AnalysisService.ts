import httpClient from "@/lib/http";
import { AnalysisDetails, AnalysisType } from "@/types/analysis-type";

export const analyseGraph = (formData: FormData) => {
  // Let the browser set proper multipart/form-data with boundary
  return httpClient.post("/chart/analyze-gemini", formData);
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

export const getAnalysis = (id: string) => {
  return httpClient.get(`/chart/analyses/${id}`);
};
