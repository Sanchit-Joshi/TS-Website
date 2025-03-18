"use client";

import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled to avoid hydration issues with client components
const CartPage = dynamic(() => import("../../src/pages/CartPage.next"), {
  ssr: false,
});

export default function Cart() {
  return <CartPage />;
}
