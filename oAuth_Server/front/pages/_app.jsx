import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  const [email, setEmail] = useState(undefined);
  let userEmail = "";
  const userCookie = getCookie("loginInfo");

  if (userCookie) {
    userEmail = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).email;
  }

  useEffect(() => {
    setEmail(userEmail);
  }, []);

  return (
    <CookiesProvider>
      <ChakraProvider>
        <Component {...pageProps} email={email} />
      </ChakraProvider>
    </CookiesProvider>
  );
}

export default MyApp;
