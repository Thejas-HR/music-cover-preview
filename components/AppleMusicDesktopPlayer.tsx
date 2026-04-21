"use client";

import Image from "next/image";
import {
  Pause,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  AirVent,
  ListMusic,
  Quote,
  Minimize2,
  Shuffle,
  Repeat,
} from "lucide-react";

type Props = {
  imgUrl: string;
  palette: string[];
  title?: string;
  artist?: string;
  album?: string;
};

export default function AppleMusicDesktopPlayer({
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
    <div className="relative h-dvh w-full overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={imgUrl}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover blur-3xl scale-[1.4] opacity-90"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 18% 20%, ${c1}cc 0%, transparent 50%),
              radial-gradient(circle at 82% 25%, ${c2}bb 0%, transparent 55%),
              radial-gradient(circle at 15% 85%, ${c3}aa 0%, transparent 60%),
              radial-gradient(circle at 88% 92%, ${c4}cc 0%, transparent 60%),
              linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)
            `,
          }}
        />
      </div>

      <div className="absolute top-6 right-8 flex items-center gap-4 text-white/80 z-10">
        <button aria-label="Lyrics" className="hover:text-white">
          <Quote size={18} strokeWidth={2} />
        </button>
        <button aria-label="Queue" className="hover:text-white">
          <ListMusic size={18} strokeWidth={2} />
        </button>
        <button aria-label="AirPlay" className="hover:text-white">
          <AirVent size={18} strokeWidth={2} />
        </button>
        <button aria-label="Minimize" className="hover:text-white">
          <Minimize2 size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-10 gap-8">
        <div
          className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_45px_90px_rgba(0,0,0,0.55)]"
          style={{ height: "min(58vh, 540px)" }}
        >
          <Image
            src={imgUrl}
            alt="Album cover"
            fill
            sizes="540px"
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        <div className="text-center max-w-xl">
          <h1 className="text-4xl xl:text-5xl font-semibold tracking-tight leading-tight">
            {title}
          </h1>
          <p className="mt-3 text-xl text-white/80 truncate">{artist}</p>
          <p className="mt-1 text-sm text-white/55 truncate">{album}</p>
        </div>

        <div className="w-full max-w-xl">
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/65 tabular-nums">0:42</span>
            <div className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden">
              <div className="h-full w-[22%] bg-white/85 rounded-full" />
            </div>
            <span className="text-[11px] text-white/65 tabular-nums">-2:39</span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-8 text-white">
            <button aria-label="Shuffle" className="text-white/70 hover:text-white">
              <Shuffle size={18} strokeWidth={2} />
            </button>
            <button aria-label="Previous">
              <SkipBack size={34} strokeWidth={0} fill="currentColor" />
            </button>
            <button aria-label="Play/Pause" className="px-2">
              <Pause size={56} strokeWidth={0} fill="currentColor" />
            </button>
            <button aria-label="Next">
              <SkipForward size={34} strokeWidth={0} fill="currentColor" />
            </button>
            <button aria-label="Repeat" className="text-white/70 hover:text-white">
              <Repeat size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-6 mx-auto max-w-sm flex items-center gap-3 text-white/70">
            <Volume1 size={16} />
            <div className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden">
              <div className="h-full w-[55%] bg-white/85 rounded-full" />
            </div>
            <Volume2 size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
