import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import PlusCircle from "./icons/plus-circl";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface UploadProps {
  name: string;
  label: string;
  className?: string;
}

// TODO: replace label with filename after upload
export default function Upload({ name, label, className }: UploadProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(undefined);

  return (
    <Card
      className={cn("w-72 h-36 flex items-center justify-center", className)}
    >
      <Input type="file" name={name} hidden ref={inputRef} />
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        <PlusCircle fill="#0A0A0A" />
        <span className="sm:text-md text-sm">{label}</span>
      </Button>
    </Card>
  );
}
