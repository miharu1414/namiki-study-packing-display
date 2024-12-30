'use client';
import { Flex } from '@chakra-ui/react';
import { CanvasComponent } from './CanvasComponent';
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
