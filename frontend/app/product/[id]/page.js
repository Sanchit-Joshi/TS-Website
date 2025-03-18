"use client";

import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled to avoid hydration issues with client components
const ProductDetailPage = dynamic(
  () => import("../../../src/pages/product/[id]"),
  { ssr: false }
);

export default function ProductDetail() {
  return <ProductDetailPage />;
}
