// pages/_app.tsx
import type { AppProps } from "next/app";
import HeaderCart from "../components/HeaderCart";
import "../styles/globals.css"; // if you have it

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Your site header goes here... */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          <a href="/" className="font-semibold">Nature’s Way Soil</a>
          <HeaderCart />
        </div>
      </div>

      <Component {...pageProps} />
    </>
  );
}
