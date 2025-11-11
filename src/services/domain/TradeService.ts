/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/lib/http";
import { ITrade } from "@/types/trade";

export const createTrade = (values: ITrade) => {
  return http.post("/trade-journal/trades", values);
};

export const getTrades = (filters: any) => {
  return http.get("/trade-journal/trades", {
    params: filters,
  });
};

export const getTrade = (tradeId: string) => {
  return http.get(`/trade-journal/trades/${tradeId}`);
};
