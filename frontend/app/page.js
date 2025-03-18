"use client";

import dynamic from "next/dynamic";

// Use dynamic import with SSR disabled to avoid hydration issues with client components
const HomePage = dynamic(() => import("../src/pages/HomePage.next"), {
  ssr: false,
});

export default function Home() {
  return <HomePage />;
}
