'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { B_PATHS } from '@/app/constants';
import SeekerSessionPage from '@/components/SessionPage/SeekerSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return (
    <Suspense>
      <SeekerSessionPage
        category="b"
        sessionCode={sessionCode}
        productJsonPaths={shuffleArray(B_PATHS, sessionCode)}
      />
    </Suspense>
  );
}
