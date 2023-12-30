import { useEffect, useRef } from 'react';

interface UseScrollToBottomArgs {
  dependency: unknown;
}

export const useScrollToBottom = ({ dependency }: UseScrollToBottomArgs) => {
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewport.current) return;
    const scrollHeight = viewport.current.scrollHeight;
    viewport.current.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  }, [dependency]);

  return viewport;
};
