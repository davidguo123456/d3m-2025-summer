'use client';

import { Suspense } from 'react';
import { T_PATHS } from '@/app/constants';
import AssistantSessionPage from '@/components/SessionPage/AssistantSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = 'tutorial';
  return (
    <Suspense>
      <AssistantSessionPage
        category="t"
        sessionCode={sessionCode}
        productJsonPaths={shuffleArray(T_PATHS, sessionCode)}
      />
    </Suspense>
  );
}
