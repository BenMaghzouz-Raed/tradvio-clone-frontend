/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toastNotification } from "@/lib/toast";
import {
  AISettings,
  getAISettings,
  updateAISettings,
  listAvailableModels,
  validateKey,
} from "@/services/domain/AdminAISettingsService";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<AISettings>({ selected_model: null, model_chain: [], api_keys: [], risk_defaults: { SWING: {}, SCALP: {} } });
  const [models, setModels] = useState<string[]>([]);
  const [newKey, setNewKey] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cfg, m] = await Promise.all([getAISettings(), listAvailableModels()]);
      setSettings(cfg);
      setModels(m);
    } catch (e: any) {
      toastNotification({ type: "error", message: e?.message || "Failed to load AI settings" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const save = async () => {
    setLoading(true);
    try {
      const res = await updateAISettings(settings);
      setSettings(res);
      toastNotification({ type: "success", message: "Settings saved" });
    } catch (e: any) {
      toastNotification({ type: "error", message: e?.message || "Failed to save settings" });
    } finally {
      setLoading(false);
    }
  };

  const addKey = () => {
    const k = newKey.trim();
    if (!k) return;
    if ((settings.api_keys || []).includes(k)) {
      toastNotification({ type: "error", message: "Key already added" });
      return;
    }
    setSettings((s) => ({ ...s, api_keys: [...(s.api_keys || []), k] }));
    setNewKey("");
  };

  const removeKey = (k: string) => {
    setSettings((s) => ({ ...s, api_keys: (s.api_keys || []).filter((x) => x !== k) }));
  };

  const validateFirstKey = async () => {
    try {
      const res = await validateKey(settings.api_keys?.[0]);
      if (res.ok) {
        toastNotification({ type: "success", message: `Key valid (model: ${res.model_used || "?"})` });
      } else {
        toastNotification({ type: "error", message: `Validation failed: ${res.error || "unknown"}` });
      }
    } catch (e: any) {
      toastNotification({ type: "error", message: e?.message || "Validation error" });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-neutral-800">Gemini Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600">Selected Model</label>
              <select
                className="w-full border rounded p-2 mt-1"
                value={settings.selected_model || ""}
                onChange={(e) => setSettings((s) => ({ ...s, selected_model: e.target.value }))}
              >
                <option value="">-- choose model --</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Fallback Model Chain</label>
              <div className="text-xs text-neutral-500 mt-1 mb-1">Order matters (selected model is attempted first automatically)</div>
              <Input
                value={(settings.model_chain || []).join(", ")}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, model_chain: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) }))
                }
                placeholder="gemini-2.5-pro, gemini-2.5-flash, ..."
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-600">API Keys</label>
            <div className="flex gap-2 mt-1">
              <Input placeholder="Enter Gemini API key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
              <Button className="cursor-pointer" onClick={addKey} disabled={loading}>
                Add
              </Button>
              <Button variant="outline" className="cursor-pointer" onClick={validateFirstKey} disabled={loading || (settings.api_keys || []).length === 0}>
                Validate First Key
              </Button>
            </div>
            <ul className="mt-3 divide-y divide-neutral-100">
              {(settings.api_keys || []).map((k) => (
                <li key={k} className="flex items-center justify-between py-2">
                  <span className="font-mono text-xs break-all">{k}</span>
                  <Button variant="outline" className="cursor-pointer" onClick={() => removeKey(k)}>
                    Remove
                  </Button>
                </li>
              ))}
              {(settings.api_keys || []).length === 0 && (
                <li className="text-sm text-neutral-500 py-2">No keys configured.</li>
              )}
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <CardTitle className="text-base text-neutral-800 mb-2">Risk Parameters Defaults</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(["SWING", "SCALP"] as const).map((tt) => (
                <div key={tt} className="space-y-3">
                  <div className="font-medium text-neutral-700">{tt === "SWING" ? "Swing Trading" : "Scalp Trading"}</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-neutral-600">Account Balance ($)</label>
                      <Input
                        type="number"
                        step="any"
                        value={(settings.risk_defaults?.[tt]?.account_balance as any) ?? ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            risk_defaults: {
                              ...(s.risk_defaults || {}),
                              [tt]: { ...(s.risk_defaults?.[tt] || {}), account_balance: e.target.valueAsNumber },
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Risk Per Trade (%)</label>
                      <Input
                        type="number"
                        step="any"
                        value={(settings.risk_defaults?.[tt]?.risk_per_trade_percent as any) ?? ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            risk_defaults: {
                              ...(s.risk_defaults || {}),
                              [tt]: { ...(s.risk_defaults?.[tt] || {}), risk_per_trade_percent: e.target.valueAsNumber },
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Stop Loss (Points)</label>
                      <Input
                        type="number"
                        step="any"
                        value={(settings.risk_defaults?.[tt]?.stop_loss_points as any) ?? ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            risk_defaults: {
                              ...(s.risk_defaults || {}),
                              [tt]: { ...(s.risk_defaults?.[tt] || {}), stop_loss_points: e.target.valueAsNumber },
                            },
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-neutral-600">Take Profit (Points)</label>
                      <Input
                        type="number"
                        step="any"
                        value={(settings.risk_defaults?.[tt]?.take_profit_points as any) ?? ""}
                        onChange={(e) =>
                          setSettings((s) => ({
                            ...s,
                            risk_defaults: {
                              ...(s.risk_defaults || {}),
                              [tt]: { ...(s.risk_defaults?.[tt] || {}), take_profit_points: e.target.valueAsNumber },
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3">
              <Button onClick={save} className="cursor-pointer" disabled={loading}>
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
