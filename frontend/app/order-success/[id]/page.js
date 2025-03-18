"use client";

import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled to avoid hydration issues with client components
const OrderSuccessPage = dynamic(
  () => import("../../../src/pages/OrderSuccessPage.next"),
  { ssr: false }
);

export default function OrderSuccess() {
  return <OrderSuccessPage />;
}