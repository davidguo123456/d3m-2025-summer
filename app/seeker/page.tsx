'use client';

import { Suspense } from 'react';
import SeekerSessionPage from '@/components/SessionPage/SeekerSessionPage';

export default function Page() {
  return (
    <Suspense>
      <SeekerSessionPage />
    </Suspense>
  );
}
