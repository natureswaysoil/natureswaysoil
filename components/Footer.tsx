import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Nature’s Way Soil</p>
        <div className="flex items-center gap-4">
          <Link href="/policy" className="hover:text-green-700">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
}
