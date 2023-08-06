import { Box, Heading, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Notification({heading, message}) {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error);
    }
  }, [router.query]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: ['50vh', '70vh', '89vh'],
        bg: 'background',
        color: 'text',
        padding: ['2', '3', '4'],
        mb: [170, 0, 0],
        pt: [170, 0, 0]
      }}
    >
      <Heading as="h1" sx={{ fontSize: [3, 4, 5], mb: [3, 4, 4], textAlign: 'center'}}>
        {heading}
      </Heading>
      <Text sx={{ fontSize: [1, 2, 3], textAlign: 'center'}}>
        {message + error}
      </Text>
    </Box>
  );
}
