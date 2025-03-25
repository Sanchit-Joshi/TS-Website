'use client';

import { useEffect, useState } from 'react';

export default function ClientSideWrapper({
  children,
  ...delegated
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}