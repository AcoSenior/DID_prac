import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/HeaderTemplate.jsx';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);
  console.log('hello');

  const Cookie = getCookie('user');

  let userInfo;

  if (Cookie) {
    userInfo = JSON.parse(Buffer.from(Cookie, 'base64').toString('utf-8'));
  }

  useEffect(() => {
    if (user === {}) {
      setUser(userInfo);
    }
  }, [user]);

  return (
    <ChakraProvider>
      <Header user={userInfo} />
      <Component {...pageProps} user={userInfo} />
    </ChakraProvider>
  );
}

export default MyApp;
