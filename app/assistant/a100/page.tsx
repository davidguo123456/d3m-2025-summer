'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { A_PATHS } from '@/app/constants';
import AssistantSessionPage from '@/components/SessionPage/AssistantSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return (
    <Suspense>
      <AssistantSessionPage
        sessionCode={sessionCode}
        productJsonPaths={shuffleArray(A_PATHS, sessionCode)}
      />
    </Suspense>
  );
}
