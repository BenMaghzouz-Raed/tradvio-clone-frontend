import { Card } from "./ui/card";

export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Card className="p-4 flex flex-col gap-2 bg-accent w-64">
      <h6 className="text-sm font-normal text-muted-foreground">{label}</h6>
      <h3 className="text-2xl font-semibold">{value}</h3>
    </Card>
  );
}
