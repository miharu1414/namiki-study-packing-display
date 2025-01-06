'use client';

import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

// CanvasComponentをdynamicインポートする
const CanvasComponent = dynamic(() => import('./CanvasComponent'), {
  ssr: false, // サーバーサイドレンダリングを無効化
});

export const PresentationPacking = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <CanvasComponent />
    </Flex>
  );
};
