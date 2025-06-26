'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import AssistantSessionPage from '@/components/SessionPage/AssistantSessionPage';

export default function Page() {
  return (
    <Suspense>
      <AssistantSessionPage />
    </Suspense>
  );
}
