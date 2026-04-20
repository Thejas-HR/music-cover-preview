"use client";

import { useEffect, useState } from "react";
import Uploader from "@/components/Uploader";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import AppleMusicPlayer from "@/components/AppleMusicPlayer";
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
        if (!cancelled) setPalette({ dominant: "#2a2a2a", palette: ["#2a2a2a", "#1a1a1a", "#121212", "#000000"] });
      });
    return () => {
      cancelled = true;
    };
  }, [imgUrl]);

  const reset = () => setImgUrl(null);

  if (!imgUrl || !palette) {
    return (
      <main className="flex flex-1 items-center justify-center bg-black">
        {!imgUrl ? (
          <Uploader onPick={setImgUrl} />
        ) : (
          <div className="text-white/60 text-sm">Reading colors…</div>
        )}
      </main>
    );
  }

  return (
    <main className="flex-1 bg-black">
      {platform === "spotify" ? (
        <SpotifyPlayer imgUrl={imgUrl} dominant={palette.dominant} />
      ) : (
        <AppleMusicPlayer imgUrl={imgUrl} palette={palette.palette} />
      )}
      <PlatformToggle platform={platform} onChange={setPlatform} onReset={reset} />
    </main>
  );
}
