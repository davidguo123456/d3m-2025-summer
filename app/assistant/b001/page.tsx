'use client';

import AssistantSessionPage from '@/components/AssistantSessionPage/AssistantSessionPage';
import { B_PATHS } from '@/app/constants';
import { shuffleArray } from '@/lib/utils/random';
import { usePathname } from 'next/navigation';

export default function Page() {
  const sessionCode = usePathname().split('/').at(-1) ?? '';
  return <AssistantSessionPage sessionCode={sessionCode} productJsonPaths={shuffleArray(B_PATHS, sessionCode)} />;
}
