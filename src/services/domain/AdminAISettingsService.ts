import http from "@/lib/http";

export type AISettings = {
  selected_model: string | null;
  model_chain: string[];
  api_keys: string[];
};

export type AISettingsUpdate = Partial<AISettings>;

export async function getAISettings(): Promise<AISettings> {
  return (await http.get("/admin/ai-settings")) as AISettings;
}

export async function updateAISettings(payload: AISettingsUpdate): Promise<AISettings> {
  return (await http.put("/admin/ai-settings", payload)) as AISettings;
}

export async function listAvailableModels(): Promise<string[]> {
  return (await http.get("/admin/ai-settings/models")) as string[];
}

export async function validateKey(api_key?: string): Promise<{ ok: boolean; error?: string; model_used?: string }>{
  return (await http.post("/admin/ai-settings/validate", { api_key })) as {
    ok: boolean;
    error?: string;
    model_used?: string;
  };
}
