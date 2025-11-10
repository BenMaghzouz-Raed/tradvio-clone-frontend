import httpClient from "@/lib/http";

export const analyseGraph = (formData: FormData) => {
  return httpClient.post("/chart/analyze-gemini", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
