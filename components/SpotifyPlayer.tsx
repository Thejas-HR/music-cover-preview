"use client";

import Image from "next/image";
import {
  ChevronDown,
  MoreHorizontal,
  Heart,
  Shuffle,
  SkipBack,
  Play,
  SkipForward,
  Repeat,
  MonitorSpeaker,
  Share2,
} from "lucide-react";

type Props = {
  imgUrl: string;
  dominant: string;
  title?: string;
  artist?: string;
  album?: string;
};

export default function SpotifyPlayer({
  imgUrl,
  dominant,
  title = "Track Title",
  artist = "Artist",
  album = "Album Name",
}: Props) {
  const background = `linear-gradient(180deg, ${dominant} 0%, ${dominant}cc 20%, #121212 75%, #000000 100%)`;

  return (
    <div
      className="absolute inset-0 flex flex-col text-white overflow-hidden"
      style={{
        background,
        paddingTop: "max(env(safe-area-inset-top), 16px)",
        paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
      }}
    >
      <header className="flex items-center justify-between px-5 py-3">
        <button aria-label="Close" className="p-2 -ml-2">
          <ChevronDown size={26} strokeWidth={2.2} />
        </button>
        <div className="flex flex-col items-center -mt-0.5">
          <span className="text-[11px] uppercase tracking-wider text-white/80">
            Playing from album
          </span>
          <span className="text-sm font-semibold truncate max-w-[55vw]">
            {album}
          </span>
        </div>
        <button aria-label="More" className="p-2 -mr-2">
          <MoreHorizontal size={24} strokeWidth={2.2} />
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative w-full aspect-square max-w-[92vw] rounded-md overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
          <Image
            src={imgUrl}
            alt="Album cover"
            fill
            sizes="92vw"
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      <div className="px-6 pb-1">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[22px] font-bold truncate leading-tight">
              {title}
            </h2>
            <p className="text-[15px] text-white/70 truncate mt-0.5">
              {artist}
            </p>
          </div>
          <button aria-label="Like" className="pb-1">
            <Heart size={26} strokeWidth={2} />
          </button>
        </div>

        <div className="mt-5 space-y-1">
          <div className="h-1 w-full rounded-full bg-white/25 overflow-hidden">
            <div className="h-full w-[22%] bg-white rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] text-white/65 font-medium tabular-nums">
            <span>0:42</span>
            <span>-2:39</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button aria-label="Shuffle">
            <Shuffle size={22} strokeWidth={2} className="text-[#1ed760]" />
          </button>
          <button aria-label="Previous">
            <SkipBack size={32} strokeWidth={0} fill="currentColor" />
          </button>
          <button
            aria-label="Play"
            className="h-16 w-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
          >
            <Play size={28} strokeWidth={0} fill="currentColor" className="ml-1" />
          </button>
          <button aria-label="Next">
            <SkipForward size={32} strokeWidth={0} fill="currentColor" />
          </button>
          <button aria-label="Repeat">
            <Repeat size={22} strokeWidth={2} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between text-white/80">
          <button aria-label="Devices">
            <MonitorSpeaker size={20} strokeWidth={2} />
          </button>
          <button aria-label="Share">
            <Share2 size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
