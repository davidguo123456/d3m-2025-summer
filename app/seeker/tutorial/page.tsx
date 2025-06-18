'use client';

import { Suspense } from 'react';
import { T_PATHS } from '@/app/constants';
import SeekerSessionPage from '@/components/SessionPage/SeekerSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = 'tutorial';
  return (
    <Suspense>
      <SeekerSessionPage
        category="t"
        sessionCode={sessionCode}
        productJsonPaths={shuffleArray(T_PATHS, sessionCode)}
      />
    </Suspense>
  );
}
