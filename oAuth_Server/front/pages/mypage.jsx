import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { backend, frontend } from "../utils/ip.js";
import { deleteCookie } from "cookies-next";

import AppModal from "../components/appModal.jsx";
import Link from "next/link.js";

// 사용자는 마이 페이지에서 자신이 운영하는 서비스를 연동 등록 가능
// 내가 연동한 어플리케이션을 보여주는 리스트도 만들자..
// 발급 받기 > 연동할 어플리케이션 이름을 입력하면 rest api, secret등을 준다.

// rest api를 발급받고 redirect uri를 발급받을 로컬 서버 관리자는
// 로그인이 된 상태라고 가정

const Mypage = ({ email, age, name, mobile, addr, gender, appList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myAppList, setmyAppList] = useState(appList);
  const [userEmail, setUsermail] = useState(email);

  const getMyApp = async () => {
    const response = await axios.post(`${backend}/api/appl/getMyApp`, {
      email: email,
    });

    setmyAppList(response.data.myapp);
  };

  const showAppList = myAppList?.map((v, k) => {
    return (
      <Box p="5%" key={k}>
        <Flex justifyContent={"space-around"}>
          <Text px="5%">
            <Link
              href={{ pathname: `/appinfo`, query: { appName: v.appName } }}
            >
              {v.appName}
            </Link>
          </Text>
          <Text>{v.restAPI}</Text>
        </Flex>
      </Box>
    );
  });

  const closeAndUpdate = () => {
    onClose();
    getMyApp();
  };

  const [getDelete, setGetDelete] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");

  const confirmDelete = async () => {
    const response = await axios.post(`${backend}/api/oauth/deleteUser`, {
      email,
      password: deleteKey,
    });

    deleteCookie("loginInfo", { path: "/", domain: `localhost` });

    if (response.data.status == true) {
      alert(response.data.msg);
      location.href = `${frontend}`;
      return;
    }

    if (response.data.status == false) {
      alert(response.data.msg);
      return;
    }
  };

  return (
    <>
      <Tabs>
        <TabList>
          <Tab>내 정보</Tab>
          <Tab>어플리케이션 관리</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>내 정보</Text>
            <Box>
              <Text>{email}</Text>
              <Text>{name}</Text>
              <Text>{age}</Text>
              <Text>{mobile}</Text>
              <Text>{addr}</Text>
              <Text>{gender}</Text>
            </Box>
            <Box>
              <Button>회원 수정</Button>

              <Box>
                {getDelete == false ? (
                  <Button
                    onClick={() => {
                      setGetDelete(!getDelete);
                    }}
                  >
                    회원 탈퇴
                  </Button>
                ) : (
                  <>
                    <Input
                      type="password"
                      placeholder="회원 탈퇴를 하려면 비밀번호를 입력해주세요."
                      onChange={(e) => {
                        setDeleteKey(e.target.value);
                      }}
                    />
                    <Button onClick={confirmDelete}>탈퇴확인</Button>
                  </>
                )}
              </Box>
            </Box>
          </TabPanel>
          <TabPanel>
            <Text>{email}</Text>
            <Box px="5%" py="5%" w="70%" mx="auto" my="0">
              <Flex mx="auto" my="0" justifyContent={"center"} mb="10%">
                <Box w="40%" mx="auto" my="0">
                  <Text>어플리케이션 등록</Text>
                  <Button onClick={onOpen}>어플리케이션 생성</Button>
                  <AppModal isOpen={isOpen} onClose={closeAndUpdate} />
                </Box>
              </Flex>
              <Flex>
                <Box mx="auto" my="0" justifyContent={"center"}>
                  <Text>내 어플리케이션</Text>

                  <Box>{showAppList}</Box>
                </Box>
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookie = ctx.req ? ctx.req.headers.cookie : "";
  const encodedCookie = cookie.split("=")[1];
  const email = JSON.parse(
    Buffer.from(encodedCookie, "base64").toString("utf-8")
  ).email;

  const response = await axios.post(`${backend}/api/appl/getMyApp`, {
    email,
  });

  return { props: { appList: response.data.myapp } };
};

export default Mypage;
