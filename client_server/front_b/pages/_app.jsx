import { ChakraProvider } from '@chakra-ui/react'
import { Search2icon } from '@chakra-ui/icons'
import Layout from '../components/Layout.jsx'

import { useState, useEffect } from 'react';

import { CookiesProvider } from 'react-cookie';
import { getCookie } from 'cookies-next'
import { backend } from '../utils/ip'
import axios from 'axios'

function MyApp({ Component, pageProps }) {
  // const [cookies, setCookie, removeCookie ] = useCookies(['loginInfo'])
  const [ userId, setUserid ] = useState(undefined)
  const [ email, setEmail ] = useState(undefined)
  const [ point, setPoint ] = useState(0)

  const userCookie = getCookie('loginInfo');
  let userName = ''
  let userEmail= ''

  const getPoint = async () => {
    if(userCookie) {
      const email = JSON.parse(Buffer.from(userCookie, 'base64').toString('utf-8')).email
      const response = await axios.post(`${backend}/api/auth/pointInquiry`, {email})
      setPoint(response.data.point)
    }
  }

  if(userCookie){
    userName = JSON.parse(Buffer.from(userCookie, 'base64').toString('utf-8')).username
    userEmail = JSON.parse(Buffer.from(userCookie, 'base64').toString('utf-8')).email
  }

  
  useEffect(() => {
      setUserid(userName)
      setEmail(userEmail)
      getPoint()
  },[point])

  return (
    <CookiesProvider>
      <ChakraProvider>
        <Layout m='2' userId={userId}>
        <Component {...pageProps} userId={userId} email={email} point={point} setPoint={setPoint}/>
        </Layout>
      </ChakraProvider>
    </CookiesProvider>
  )
}

export default MyApp;