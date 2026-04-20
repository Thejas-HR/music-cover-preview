# Music Cover Preview

A mobile-first web tool for previewing album covers on the Spotify and Apple Music "Now Playing" screens. Upload any cover image and see it rendered full-screen with the platform-accurate dominant-color gradient (Spotify) and blurred multi-tone gradient background (Apple Music).

Built for designers reviewing artwork before release — open it on your phone, install as a PWA, and every cover you pick is shown full-screen, chrome-free, exactly how it would appear in the real apps.

## Features

- Full-screen replicas of the Spotify expanded Now Playing screen and the Apple Music Now Playing sheet
- Automatic dominant-color and 4-color palette extraction from the uploaded image
- Toggle between platforms with a single tap
- PWA-installable — add to iOS home screen for a chrome-free native-feeling experience
- No audio playback, no sign-in, no tracking — purely a visual preview tool

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- `lucide-react` for player icons
- Canvas-based color quantization (no external color lib)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For best results, view from a phone — or toggle DevTools device emulation to a mobile viewport.

## Deployment

This project is a zero-config Next.js app and deploys directly to [Vercel](https://vercel.com):

```bash
npx vercel --prod
```

## Install on iPhone (PWA)

1. Open the deployed URL in Safari
2. Tap the Share icon
3. Tap "Add to Home Screen"
4. Launch the app from the home screen — it opens full-screen with no browser UI

## Project Structure

```text
app/
  layout.tsx           PWA meta, theme, safe-area setup
  page.tsx             Main flow: uploader -> player preview
  globals.css
components/
  Uploader.tsx         File picker (iOS camera roll friendly)
  SpotifyPlayer.tsx    Spotify Now Playing replica
  AppleMusicPlayer.tsx Apple Music Now Playing replica
  PlatformToggle.tsx   Bottom-center platform switcher
lib/
  extractColors.ts     Canvas-based dominant-color + palette extraction
public/
  manifest.json        PWA manifest
  icon.svg             App icon
```

## License

Personal / non-commercial use. Not affiliated with Spotify or Apple.
