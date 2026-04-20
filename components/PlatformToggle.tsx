"use client";

import { Music2, RotateCcw } from "lucide-react";

export type Platform = "spotify" | "apple";

type Props = {
  platform: Platform;
  onChange: (p: Platform) => void;
  onReset: () => void;
};

export default function PlatformToggle({ platform, onChange, onReset }: Props) {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
      style={{ bottom: "max(env(safe-area-inset-bottom), 18px)" }}
    >
      <div className="flex items-center rounded-full bg-black/55 backdrop-blur-xl p-1 border border-white/15 shadow-lg">
        <button
          onClick={() => onChange("spotify")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            platform === "spotify"
              ? "bg-white text-black"
              : "text-white/80"
          }`}
        >
          Spotify
        </button>
        <button
          onClick={() => onChange("apple")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
            platform === "apple"
              ? "bg-white text-black"
              : "text-white/80"
          }`}
        >
          Apple Music
        </button>
      </div>
      <button
        onClick={onReset}
        aria-label="Pick new cover"
        className="h-9 w-9 flex items-center justify-center rounded-full bg-black/55 backdrop-blur-xl border border-white/15 text-white/85 shadow-lg"
      >
        <RotateCcw size={15} strokeWidth={2.2} />
      </button>
      <span className="sr-only">
        <Music2 />
      </span>
    </div>
  );
}
