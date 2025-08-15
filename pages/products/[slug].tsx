import Head from "next/head";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { Product } from "@/lib/products";
import { getProduct, products } from "@/lib/products";

type Props = { product: Product | null };

export default function ProductDetail({ product }: Props) {
  if (!product) return <main className="p-10">Product not found.</main>;

  return (
    <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <Head>
        <title>{product.title} – Nature’s Way Soil</title>
      </Head>

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="mt-2 text-2xl">${product.price.toFixed(2)}</p>

      <div className="mt-6 flex gap-3">
        {/* On-site checkout */}
        <a
          href={`/checkout?slug=${product.slug}&qty=1`}
          className="px-6 py-3 rounded-2xl bg-green-700 text-white"
        >
          Buy
        </a>

        <Link href="/products" className="px-6 py-3 rounded-2xl border">
          Back
        </Link>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug || "");
  const product = getProduct(slug) || null;
  return { props: { product } };
};
