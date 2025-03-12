'use client';

import { NextUIProvider as NextUIProviderInternal } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProviderInternal navigate={router.push}>
      {children}
    </NextUIProviderInternal>
  );
} 