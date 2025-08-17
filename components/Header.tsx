import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {/* Logo under /public */}
          <Image
            src="/logo-with-tagline.png"
            alt="Nature's Way Soil"
            width={128}
            height={40}
            priority
          />
          <span className="sr-only">Nature's Way Soil</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:text-green-700">Shop</Link>
          <Link href="/policy" className="hover:text-green-700">Policy</Link>
        </nav>
      </div>
    </header>
  );
}
