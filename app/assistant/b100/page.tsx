'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { B_PATHS } from '@/app/constants';
import AssistantSessionPage from '@/components/SessionPage/AssistantSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return (
    <Suspense>
      <AssistantSessionPage
        category="b"
        sessionCode={sessionCode}
        productJsonPaths={shuffleArray(B_PATHS, sessionCode)}
      />
    </Suspense>
  );
}
