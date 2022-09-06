import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  const [email, setEmail] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const [mobile, setMobile] = useState(undefined);
  const [addr, setAddr] = useState(undefined);

  let userEmail = "";
  let userName = "";
  let userAge = "";
  let userGender = "";
  let userMobile = "";
  let userAddr = "";

  const userCookie = getCookie("loginInfo");

  if (userCookie) {
    userEmail = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).email;
    userName = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).name;
    userAge = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).age;
    userGender = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).gender;
    userMobile = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).mobile;
    userAddr = JSON.parse(
      Buffer.from(userCookie, "base64").toString("utf-8")
    ).addr;
  }

  useEffect(() => {
    setEmail(userEmail);
    setName(userName);
    setAge(userAge);
    setGender(userGender);
    setMobile(userMobile);
    setAddr(userAddr);
  }, []);

  return (
    <CookiesProvider>
      <ChakraProvider>
        <Component
          {...pageProps}
          email={email}
          name={name}
          age={age}
          mobile={mobile}
          gender={gender}
          addr={addr}
        />
      </ChakraProvider>
    </CookiesProvider>
  );
}

export default MyApp;
