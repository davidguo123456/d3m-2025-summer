'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import AssistantSessionPage from '@/components/SessionPage/AssistantSessionPage';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return (
    <Suspense>
      <AssistantSessionPage />
    </Suspense>
  );
}
