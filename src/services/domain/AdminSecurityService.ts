import http from "@/lib/http";

export async function listBlockedIps(): Promise<string[]> {
  const res = (await http.get("/admin/blocked-ips")) as string[];
  return Array.isArray(res) ? res : [];
}

export async function addBlockedIp(ip: string): Promise<void> {
  await http.post("/admin/blocked-ips", { item: ip });
}

export async function removeBlockedIp(ip: string): Promise<void> {
  // Axios delete with body
  await http.delete("/admin/blocked-ips", { data: { item: ip } } as any);
}

export async function checkIp(ip: string): Promise<{ ip: string; blocked: boolean }>{
  return (await http.get(`/admin/blocked-ips/check`, { params: { ip } })) as {
    ip: string;
    blocked: boolean;
  };
}
