'use client';

import { usePathname } from 'next/navigation';
import { B_PATHS } from '@/app/constants';
import AssistantSessionPage from '@/components/SessionPage/AssistantSessionPage';
import { shuffleArray } from '@/lib/utils/random';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return (
    <AssistantSessionPage
      category="c"
      sessionCode={sessionCode}
      productJsonPaths={shuffleArray(B_PATHS, sessionCode)}
    />
  );
}
