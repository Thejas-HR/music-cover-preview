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
    <div className="relative flex flex-col items-center justify-center gap-7 px-8 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Cover Preview
        </h1>
        <p className="mx-auto max-w-sm text-sm md:text-base text-white/60 leading-relaxed">
          Upload an album cover to see how it looks on Spotify and Apple Music
          Now Playing screens — gradients extracted from your artwork.
        </p>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-3 rounded-full bg-white px-7 py-4 md:px-8 md:py-4 text-black font-semibold text-base shadow-lg active:scale-95 hover:bg-white/90 transition"
      >
        <ImageUp size={20} strokeWidth={2.2} />
        Pick a cover
      </button>
      <p className="text-[11px] md:text-xs text-white/40 max-w-xs">
        Works best with square artwork. Nothing is uploaded — images stay on
        your device.
      </p>
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
