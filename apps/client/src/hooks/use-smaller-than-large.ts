import { useMediaQuery } from '@mantine/hooks';

export const useSmallerThanLarge = () => {
  const isSmallerThanLarge = useMediaQuery('(max-width: 1350px)');

  return isSmallerThanLarge;
};
