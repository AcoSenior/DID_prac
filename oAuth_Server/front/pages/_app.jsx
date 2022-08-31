import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { getCookie } from 'cookies-next'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
