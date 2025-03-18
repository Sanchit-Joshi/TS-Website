"use client";

import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled to avoid hydration issues with client components
const CheckoutPage = dynamic(
  () => import("../../src/pages/CheckoutPage.next"),
  { ssr: false }
);

export default function Checkout() {
  return <CheckoutPage />;
}
