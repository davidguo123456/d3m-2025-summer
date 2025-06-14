'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { C_PATHS } from '@/app/constants';
import SeekerSessionPage from '@/components/SessionPage/SeekerSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return (
    <Suspense>
      <SeekerSessionPage
        category="c"
        sessionCode={sessionCode}
        productJsonPaths={shuffleArray(C_PATHS, sessionCode)}
      />
    </Suspense>
  );
}
