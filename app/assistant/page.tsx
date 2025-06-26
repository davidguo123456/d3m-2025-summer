'use client';

import { Suspense } from 'react';
import AssistantSessionPage from '@/components/SessionPage/AssistantSessionPage';

export default function Page() {
  return (
    <Suspense>
      <AssistantSessionPage />
    </Suspense>
  );
}
