"use client";

import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled to avoid hydration issues with client components
const ProductList = dynamic(() => import("../../src/pages/ProductList.next"), {
  ssr: false,
});

export default function Products() {
  return <ProductList />;
}
