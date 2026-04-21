"use client";

import Image from "next/image";
import {
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Play,
  Volume2,
  Mic2,
  ListMusic,
  MonitorSpeaker,
  Minimize2,
  Heart,
} from "lucide-react";

type Props = {
  imgUrl: string;
  dominant: string;
  title?: string;
  artist?: string;
  album?: string;
};

export default function SpotifyDesktopPlayer({
  imgUrl,
  dominant,
  title = "Track Title",
  artist = "Artist",
  album = "Album Name",
}: Props) {
  const background = `linear-gradient(180deg, ${dominant} 0%, ${dominant}aa 25%, #121212 80%, #000000 100%)`;

  return (
    <div
      className="relative h-dvh w-full overflow-hidden text-white flex flex-col"
      style={{ background }}
    >
      <header className="flex items-center justify-between px-10 pt-8">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/70">
            Playing from album
          </div>
          <div className="text-sm font-semibold mt-0.5 truncate">{album}</div>
        </div>
        <div className="flex items-center gap-5 text-white/75">
          <button aria-label="Lyrics" className="hover:text-white">
            <Mic2 size={18} strokeWidth={2} />
          </button>
          <button aria-label="Queue" className="hover:text-white">
            <ListMusic size={18} strokeWidth={2} />
          </button>
          <button aria-label="Minimize" className="hover:text-white">
            <Minimize2 size={18} strokeWidth={2} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center gap-14 px-16 min-h-0">
        <div
          className="relative aspect-square rounded-md overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.65)]"
          style={{ height: "min(62vh, 560px)" }}
        >
          <Image
            src={imgUrl}
            alt="Album cover"
            fill
            sizes="560px"
            unoptimized
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-col max-w-md min-w-0">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
            Song
          </div>
          <h1 className="mt-3 text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-xl text-white/80 truncate">{artist}</p>
          <p className="mt-1 text-sm text-white/55 truncate">{album}</p>

          <div className="mt-8 flex items-center gap-4">
            <button
              aria-label="Play"
              className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-[1.04] transition-transform"
            >
              <Play size={22} strokeWidth={0} fill="currentColor" className="ml-1" />
            </button>
            <button aria-label="Like" className="text-white/80 hover:text-white">
              <Heart size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <footer className="px-10 pb-8 pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-7 mb-3 text-white/90">
            <button aria-label="Shuffle" className="text-[#1ed760]">
              <Shuffle size={18} strokeWidth={2} />
            </button>
            <button aria-label="Previous">
              <SkipBack size={22} strokeWidth={0} fill="currentColor" />
            </button>
            <button
              aria-label="Play"
              className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center"
            >
              <Play size={18} strokeWidth={0} fill="currentColor" className="ml-0.5" />
            </button>
            <button aria-label="Next">
              <SkipForward size={22} strokeWidth={0} fill="currentColor" />
            </button>
            <button aria-label="Repeat">
              <Repeat size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/70 tabular-nums">0:42</span>
            <div className="flex-1 h-[3px] bg-white/25 rounded-full overflow-hidden">
              <div className="h-full w-[22%] bg-white rounded-full" />
            </div>
            <span className="text-[11px] text-white/70 tabular-nums">3:21</span>
          </div>
        </div>

        <div className="absolute bottom-8 right-10 flex items-center gap-4 text-white/75">
          <button aria-label="Devices" className="hover:text-white">
            <MonitorSpeaker size={18} strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2">
            <Volume2 size={18} strokeWidth={2} />
            <div className="h-[3px] w-24 bg-white/25 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-white rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
