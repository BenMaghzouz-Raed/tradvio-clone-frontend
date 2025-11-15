/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tag from "@/components/tag";
import { toastNotification } from "@/lib/toast";
import {
  addBlockedIp,
  checkIp,
  listBlockedIps,
  removeBlockedIp,
} from "@/services/domain/AdminSecurityService";
import { ShieldBan, ShieldCheck, Trash2, Plus } from "lucide-react";

function isValidIpOrCidr(value: string) {
  // Simple client-side validation; backend remains source of truth
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/; // IPv4
  const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/(\d|[12]\d|3[0-2])$/; // IPv4/CIDR
  return ipRegex.test(value) || cidrRegex.test(value);
}

export default function Security() {
  const [loading, setLoading] = useState(false);
  const [ips, setIps] = useState<string[]>([]);

  const [addValue, setAddValue] = useState("");
  const [checkingIp, setCheckingIp] = useState("");
  const [checkResult, setCheckResult] = useState<null | { ip: string; blocked: boolean }>(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const rows = await listBlockedIps();
      setIps(rows);
    } catch (e: any) {
      toastNotification({ type: "error", message: e?.message || "Failed to load blocked IPs" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleAdd = async () => {
    if (!addValue.trim()) return;
    if (!isValidIpOrCidr(addValue.trim())) {
      toastNotification({ type: "error", message: "Please enter a valid IP or CIDR (e.g. 192.168.1.1 or 192.168.1.0/24)" });
      return;
    }
    try {
      await addBlockedIp(addValue.trim());
      toastNotification({ type: "success", message: `Blocked ${addValue.trim()}` });
      setAddValue("");
      fetchList();
    } catch (e: any) {
      toastNotification({ type: "error", message: e?.message || "Failed to add IP" });
    }
  };

  const handleRemove = async (ip: string) => {
    try {
      await removeBlockedIp(ip);
      toastNotification({ type: "success", message: `Removed ${ip}` });
      fetchList();
    } catch (e: any) {
      toastNotification({ type: "error", message: e?.message || "Failed to remove IP" });
    }
  };

  const handleCheck = async () => {
    if (!checkingIp.trim()) return;
    try {
      const res = await checkIp(checkingIp.trim());
      setCheckResult(res);
    } catch (e: any) {
      toastNotification({ type: "error", message: e?.message || "Failed to check IP" });
      setCheckResult(null);
    }
  };

  const sortedIps = useMemo(() => [...ips].sort((a, b) => a.localeCompare(b)), [ips]);

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg text-neutral-800">Blocked IPs</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. 192.168.1.10 or 192.168.1.0/24"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
              className="w-72"
            />
            <Button onClick={handleAdd} className="cursor-pointer" disabled={loading}>
              <Plus className="w-4 h-4 mr-1" /> Block
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-sm text-neutral-500">Loading...</div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {sortedIps.map((ip) => (
                <li key={ip} className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                      <ShieldBan className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-medium text-neutral-800">{ip}</p>
                      <p className="text-xs text-neutral-500">Blocked</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="cursor-pointer" onClick={() => handleRemove(ip)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </Button>
                  </div>
                </li>
              ))}
              {sortedIps.length === 0 && (
                <li className="p-6 text-sm text-neutral-500">No blocked IPs.</li>
              )}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg text-neutral-800">Check IP</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Enter IP to check"
              value={checkingIp}
              onChange={(e) => setCheckingIp(e.target.value)}
              className="w-72"
            />
            <Button onClick={handleCheck} variant="outline" className="cursor-pointer">
              Check
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {checkResult && (
            <div className="flex items-center gap-3">
              {checkResult.blocked ? (
                <Tag label="Blocked" variant="error" />
              ) : (
                <Tag label="Allowed" variant="success" />
              )}
              <span className="text-sm text-neutral-700">{checkResult.ip}</span>
              {checkResult.blocked ? (
                <span className="text-xs text-neutral-500 flex items-center gap-1">
                  <ShieldBan className="w-4 h-4 text-red-500" /> This IP is currently blocked
                </span>
              ) : (
                <span className="text-xs text-neutral-500 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> This IP can access the app
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
