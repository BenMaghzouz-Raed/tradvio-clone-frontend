import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CirclePlus, RefreshCw } from "lucide-react";

interface UploadProps extends React.ComponentProps<"input"> {
  name: string;
  label: string;
  className?: string;
}

export default function Upload({
  name,
  label,
  className,
  onChange,
  ...props
}: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
    onChange?.(e); // call parent onChange if provided
  };

  return (
    <Card
      className={cn(
        "w-72 h-36 flex items-center justify-center relative overflow-hidden group",
        className
      )}
      style={
        imageUrl
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <Input
        type="file"
        name={name}
        hidden
        ref={inputRef}
        accept="image/*"
        {...props}
        onChange={handleFileChange}
      />

      {/* Overlay button (visible always, but more transparent if image exists) */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition bg-black/0 group-hover:bg-black/30",
          imageUrl && "bg-black/30"
        )}
      >
        <Button
          type="button"
          variant={imageUrl ? "secondary" : "outline"}
          className={cn(
            "cursor-pointer flex items-center gap-2 transition",
            imageUrl && "opacity-80 hover:opacity-100"
          )}
          onClick={() => inputRef.current?.click()}
        >
          {imageUrl ? <RefreshCw /> : <CirclePlus />}
          <span className="sm:text-md text-sm">
            {imageUrl ? "Change image" : label}
          </span>
        </Button>
      </div>
    </Card>
  );
}
