'use client';

import SeekerSessionPage from '@/components/SeekerSessionPage/SeekerSessionPage';
import { A_PATHS } from '@/app/constants';
import { shuffleArray } from '@/lib/utils/random';
import { usePathname } from 'next/navigation';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return <SeekerSessionPage sessionCode={sessionCode} productJsonPaths={shuffleArray(A_PATHS, sessionCode)} />;
}

