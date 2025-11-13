import httpClient from "@/lib/http";

export const analyseGraph = (formData: FormData) => {
  return httpClient.post("/chart/analyze-gemini", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
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
