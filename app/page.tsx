"use client";

import { useEffect, useState } from "react";
import Uploader from "@/components/Uploader";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import AppleMusicPlayer from "@/components/AppleMusicPlayer";
import SpotifyDesktopPlayer from "@/components/SpotifyDesktopPlayer";
import AppleMusicDesktopPlayer from "@/components/AppleMusicDesktopPlayer";
import PlatformToggle, { Platform } from "@/components/PlatformToggle";
import { extractColors, Palette } from "@/lib/extractColors";

export default function Home() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<Palette | null>(null);
  const [platform, setPlatform] = useState<Platform>("spotify");

  useEffect(() => {
    if (!imgUrl) {
      setPalette(null);
      return;
    }
    let cancelled = false;
    extractColors(imgUrl)
      .then((p) => {
        if (!cancelled) setPalette(p);
      })
      .catch(() => {
        if (!cancelled)
          setPalette({
            dominant: "#2a2a2a",
            palette: ["#2a2a2a", "#1a1a1a", "#121212", "#000000"],
          });
      });
    return () => {
      cancelled = true;
    };
  }, [imgUrl]);

  const reset = () => setImgUrl(null);

  if (!imgUrl || !palette) {
    return (
      <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-black">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #1ed76033 0%, transparent 55%), radial-gradient(circle at 80% 80%, #fa233b33 0%, transparent 55%)",
          }}
        />
        {!imgUrl ? (
          <Uploader onPick={setImgUrl} />
        ) : (
          <div className="relative text-white/60 text-sm">Reading colors…</div>
        )}
      </main>
    );
  }

  return (
    <main className="relative flex-1 bg-black">
      <div className="md:hidden">
        {platform === "spotify" ? (
          <SpotifyPlayer imgUrl={imgUrl} dominant={palette.dominant} />
        ) : (
          <AppleMusicPlayer imgUrl={imgUrl} palette={palette.palette} />
        )}
      </div>

      <div className="hidden md:block">
        {platform === "spotify" ? (
          <SpotifyDesktopPlayer imgUrl={imgUrl} dominant={palette.dominant} />
        ) : (
          <AppleMusicDesktopPlayer imgUrl={imgUrl} palette={palette.palette} />
        )}
      </div>

      <PlatformToggle platform={platform} onChange={setPlatform} onReset={reset} />
    </main>
  );
}
