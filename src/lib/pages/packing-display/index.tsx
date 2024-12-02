'use client';
import { Flex } from '@chakra-ui/react';
import { CanvasComponent } from './components/CanvasComponent';
export const PackingDisplay = () => {
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
