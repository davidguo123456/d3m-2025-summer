'use client';

import { usePathname } from 'next/navigation';
import { A_PATHS } from '@/app/constants';
import SeekerSessionPage from '@/components/SessionPage/SeekerSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return (
    <SeekerSessionPage
      category="a"
      sessionCode={sessionCode}
      productJsonPaths={shuffleArray(A_PATHS, sessionCode)}
    />
  );
}
