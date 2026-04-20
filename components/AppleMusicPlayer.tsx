"use client";

import Image from "next/image";
import {
  ChevronDown,
  Pause,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  AirVent,
  ListMusic,
  Quote,
} from "lucide-react";

type Props = {
  imgUrl: string;
  palette: string[];
  title?: string;
  artist?: string;
  album?: string;
};

export default function AppleMusicPlayer({
  imgUrl,
  palette,
  title = "Track Title",
  artist = "Artist",
  album = "Album",
}: Props) {
  const [c1, c2, c3, c4] = [
    palette[0] ?? "#222",
    palette[1] ?? palette[0] ?? "#333",
    palette[2] ?? palette[0] ?? "#444",
    palette[3] ?? palette[1] ?? "#111",
  ];

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden text-white"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 12px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 12px)",
      }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={imgUrl}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover blur-3xl scale-[1.6] opacity-90"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 10%, ${c1}cc 0%, transparent 55%),
              radial-gradient(circle at 85% 25%, ${c2}bb 0%, transparent 55%),
              radial-gradient(circle at 15% 85%, ${c3}aa 0%, transparent 60%),
              radial-gradient(circle at 90% 95%, ${c4}cc 0%, transparent 60%),
              linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)
            `,
          }}
        />
      </div>

      <div className="flex items-center justify-center pt-2 pb-4">
        <div className="h-1 w-10 rounded-full bg-white/35" />
      </div>

      <div className="flex-1 flex items-center justify-center px-8">
        <div className="relative w-full aspect-square max-w-[80vw] rounded-2xl overflow-hidden shadow-[0_35px_70px_rgba(0,0,0,0.45)]">
          <Image
            src={imgUrl}
            alt="Album cover"
            fill
            sizes="80vw"
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      <div className="px-7 pb-2">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[22px] font-semibold truncate leading-tight">
              {title}
            </h2>
            <p className="text-[17px] text-white/75 truncate mt-0.5">
              {artist}
            </p>
          </div>
          <button
            aria-label="More"
            className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0"
          >
            <ChevronDown size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-5 space-y-1">
          <div className="h-[3px] w-full rounded-full bg-white/25 overflow-hidden">
            <div className="h-full w-[22%] bg-white/85 rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] text-white/60 font-medium tabular-nums">
            <span>0:42</span>
            <span>-2:39</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button aria-label="Previous">
            <SkipBack size={38} strokeWidth={0} fill="currentColor" />
          </button>
          <button aria-label="Play/Pause" className="px-4">
            <Pause size={52} strokeWidth={0} fill="currentColor" />
          </button>
          <button aria-label="Next">
            <SkipForward size={38} strokeWidth={0} fill="currentColor" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Volume1 size={16} className="text-white/70" />
          <div className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden">
            <div className="h-full w-[55%] bg-white/85 rounded-full" />
          </div>
          <Volume2 size={18} className="text-white/70" />
        </div>

        <div className="mt-4 flex items-center justify-around text-white/85">
          <button aria-label="Lyrics" className="p-2">
            <Quote size={22} strokeWidth={2} />
          </button>
          <button aria-label="AirPlay" className="p-2">
            <AirVent size={22} strokeWidth={2} />
          </button>
          <button aria-label="Queue" className="p-2">
            <ListMusic size={22} strokeWidth={2} />
          </button>
        </div>

        <p className="mt-2 text-center text-[11px] text-white/50 truncate">
          {album}
        </p>
      </div>
    </div>
  );
}
