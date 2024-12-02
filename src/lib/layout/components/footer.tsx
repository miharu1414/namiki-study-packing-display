import { Flex, Link, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link href="" target="_blank" rel="noopener noreferrer">
          namikiの研究用
        </Link>
      </Text>
    </Flex>
  );
};
