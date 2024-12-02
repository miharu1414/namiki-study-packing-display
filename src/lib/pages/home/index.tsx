'use client';
import { Flex } from '@chakra-ui/react';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // useRouterフックをインポート
export const Home = () => {
  const router = useRouter(); // useRouterを初期化

  const onClickMove = () => {
    router.push('/packing-display'); // 遷移先を指定
  };
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
      <Button onClick={onClickMove}>パッキング表示ページへ</Button>
    </Flex>
  );
};
