"use client";

import Image from "next/image";
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden hidden md:block"
      >
        <Image
          src={imgUrl}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover blur-3xl scale-110 opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative min-h-dvh md:flex md:items-center md:justify-center md:py-12 md:px-6">
        <div
          className="
            fixed inset-0
            md:static md:inset-auto
            md:h-[min(88vh,860px)]
            md:w-auto md:aspect-[9/19.5]
            md:rounded-[52px]
            md:overflow-hidden
            md:border-[11px] md:border-neutral-900
            md:shadow-[0_40px_90px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.08)]
            md:bg-black
          "
        >
          {platform === "spotify" ? (
            <SpotifyPlayer imgUrl={imgUrl} dominant={palette.dominant} />
          ) : (
            <AppleMusicPlayer imgUrl={imgUrl} palette={palette.palette} />
          )}
        </div>
      </div>

      <PlatformToggle platform={platform} onChange={setPlatform} onReset={reset} />
    </main>
  );
}
