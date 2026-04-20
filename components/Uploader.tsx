"use client";

import { ChangeEvent, useRef } from "react";
import { ImageUp } from "lucide-react";

type Props = {
  onPick: (dataUrl: string) => void;
};

export default function Uploader({ onPick }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onPick(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-8 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-white">Cover Preview</h1>
        <p className="text-sm text-white/60 max-w-xs">
          Upload an album cover to see how it looks on Spotify and Apple Music.
        </p>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-3 rounded-full bg-white px-7 py-4 text-black font-semibold text-base shadow-lg active:scale-95 transition-transform"
      >
        <ImageUp size={20} strokeWidth={2.2} />
        Pick a cover
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
