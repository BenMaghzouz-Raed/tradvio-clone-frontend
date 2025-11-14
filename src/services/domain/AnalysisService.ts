import httpClient from "@/lib/http";

export const analyseGraph = (formData: FormData) => {
  // Let the browser set proper multipart/form-data with boundary
  return httpClient.post("/chart/analyze-gemini", formData);
};

export const getAnalyses = (params: {
  limit?: number;
  offset?: number;
  date_from?: Date;
  date_to?: Date;
}) => {
  return httpClient.get("/chart/analyses", {
    params,
  });
};

export const getAnalysis = (id: string) => {
  return httpClient.get(`/chart/analyses/${id}`);
};
