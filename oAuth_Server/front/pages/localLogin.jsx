import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  Image,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { backend, frontend } from "../utils/ip";
import { getCookie, setCookie } from "cookies-next";

export default function LocalLogin() {
  const [userID, setUserID] = useState("");
  const [userPw, setUserPw] = useState("");

  const getId = (e) => {
    setUserID(e.target.value);
    console.log(userID);
  };

  const getPw = (e) => {
    setUserPw(e.target.value);
  };

  const didLoginHandler = async ({ req, res }) => {
    console.log(userID, userPw);
    const response = await axios.post(`${backend}/api/oauth/oauthlogin`, {
      userID,
      userPw,
    });
    console.log(response.data.result);
    if (response.data.status == true) {
      const payload = response.data.token.split(".")[1];
      setCookie("loginInfo", payload, { req, res, maxAge: 60 * 60 * 24 * 100 });
      alert("로그인 되었습니다.");
      location.href = `${frontend}/mypage`;
    } else {
      alert("id/pw를 확인해주세요");
      return;
    }
  };

  return (
    <>
      <Flex w="60%" mx="auto" my="4%" justifyContent={"center"}>
        <Box w="50%" mx="3%" px="5%" py="6%">
          <Text fontSize={"1.5rem"} mb="2%">
            oAuth 로그인으로 다양한 서비스를 이용해보세요.
          </Text>
          <Text fontSize="0.75rem" mb="0.5%">
            oauth 서버에서 당신의 어플리케이션을 관리해보세요.
          </Text>
          <Text fontSize="0.75rem" mb="4%">
            사용 중인 DID계정으로 로그인해 보세요
          </Text>
          <Image
            mr="1%"
            src="https://accounts.kakao.com/assets/weblogin/techin/retina/banner_login2-7800b65948f0912306346a56a61832a98aa302c7e6cf3411eacd35db47d53a3c.png"
          ></Image>
        </Box>

        <Box
          w="35%"
          mx="3%"
          border={"1px"}
          borderColor="gray.200"
          px="5%"
          py="5%"
        >
          <Text fontSize={"2rem"} mb="1rem">
            DID Service
          </Text>
          <FormControl mb="1rem">
            <FormLabel fontSize="xl" mb="2.5">
              Email
            </FormLabel>
            <Input
              type="text"
              placeholder="email을 입력해주세요"
              size="md"
              id="Email"
              mb="7%"
              onChange={getId}
            />

            <FormLabel fontSize="xl" mb="2.5">
              Password
            </FormLabel>
            <Input
              type="password"
              placeholder="password을 입력해주세요"
              size="md"
              id="userPw"
              mb="5%"
              onChange={getPw}
            />
          </FormControl>
          <Button onClick={didLoginHandler} bg="yellow.300" w="100%">
            로그인
          </Button>
        </Box>
      </Flex>
    </>
  );
}
