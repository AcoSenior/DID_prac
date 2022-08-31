import HeaderTemplate from './styles/HeaderStyle';
import Link from 'next/link';
import { Button, Flex, Box, Center, Text, useDisclosure, SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import JoinModal from './JoinModal.jsx';
import LoginModal from './LoginModal.jsx';
import MypageDrawer from './MypageDrawer.jsx';
import { deleteCookie } from 'cookies-next';

export default function Home({ user }) {
  const [menu, setMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure();
  const { isOpen: joinIsOpen, onOpen: joinOnOpen, onClose: joinOnClose } = useDisclosure();
  const { isOpen: MypageIsOpen, onOpen: MypageOnOpen, onClose: MypageOnClose } = useDisclosure();

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, []);

  return (
    <>
      <HeaderTemplate>
        <Flex className="header">
          <Link href="">
            <Center className="logo" h="4rem" fontSize="1.5rem" fontWeight="bold">
              Kyungil Mall
            </Center>
          </Link>
          <Flex className="menu" onMouseOver={() => setMenu(true)} onMouseOut={() => setMenu(false)}>
            <Center flex="1" h="4rem">
              <Text>SEASON OFF 🙌</Text>
            </Center>
            <Center flex="1" h="4rem">
              <Text>ACC</Text>
            </Center>
            <Center flex="1" h="4rem">
              <Text>LADIES</Text>
            </Center>
            <Center flex="1" h="4rem">
              <Text>MEN</Text>
            </Center>
            <Center flex="1" h="4rem">
              <Text>SPORTS</Text>
            </Center>
            <Center flex="1" h="4rem">
              <Text>BEAUTY</Text>
            </Center>
            <Center flex="1" h="4rem">
              <Text>EVENT</Text>
            </Center>
          </Flex>
          <Flex className="user">
            {isLogin ? (
              <>
                <Button
                  onClick={(req, res) => {
                    deleteCookie('user', { req, res, maxAge: 60 * 60 * 24 * 1000 });
                    setIsLogin(false);
                    window.location.replace('/');
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  LOGOUT
                </Button>
                <Button onClick={MypageOnOpen} colorScheme="teal" variant="outline">
                  PROFILE
                </Button>
              </>
            ) : (
              <>
                <Button onClick={joinOnOpen} colorScheme="teal" variant="outline">
                  JOIN
                </Button>
                <Button onClick={loginOnOpen} colorScheme="teal" variant="outline">
                  LOGIN
                </Button>
              </>
            )}
          </Flex>
          <JoinModal joinIsOpen={joinIsOpen} joinOnClose={joinOnClose} />
          <LoginModal loginIsOpen={loginIsOpen} loginOnClose={loginOnClose} />
          {user ? <MypageDrawer MypageIsOpen={MypageIsOpen} MypageOnClose={MypageOnClose} user={user} /> : null}
        </Flex>
        {menu ? (
          <Box className="menuHover">
            <SimpleGrid columns={5} spacingY="14rem">
              <Box h="1rem" pl="10rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  여성 가방
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">토트백</Text>
                  <Text h="2rem">숄더백</Text>
                  <Text h="2rem">크로스백</Text>
                  <Text h="2rem">백팩</Text>
                  <Text h="2rem">클러치/파우치</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  여성 지갑
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">반지갑</Text>
                  <Text h="2rem">중지갑</Text>
                  <Text h="2rem">장지갑</Text>
                  <Text h="2rem">명함/카드지갑</Text>
                  <Text h="2rem">동전지갑</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  스카프/머플러
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">머플러</Text>
                  <Text h="2rem">스카프</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  남성가방
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">서류가방</Text>
                  <Text h="2rem">백팩</Text>
                  <Text h="2rem">크로스백</Text>
                  <Text h="2rem">토트백/숄더백</Text>
                  <Text h="2rem">캔버스/에코백</Text>
                  <Text h="2rem">클러치백</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  남성지갑
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">반지갑</Text>
                  <Text h="2rem">장지갑</Text>
                  <Text h="2rem">머니클립</Text>
                  <Text h="2rem">명함/카드지갑</Text>
                  <Text h="2rem">중지갑</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="10rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  벨트
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">여성벨트</Text>
                  <Text h="2rem">남성벨트</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  양말
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">남성양말</Text>
                  <Text h="2rem">여성양말</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  장갑
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">남성장갑</Text>
                  <Text h="2rem">여성장갑</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  키링/키홀더
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">키링</Text>
                  <Text h="2rem">키홀더</Text>
                </Box>
              </Box>
              <Box h="4rem" pl="5rem">
                <Text h="2rem" fontSize="1.2rem" fontWeight="bold">
                  모자
                </Text>
                <Box fontSize="0.8rem">
                  <Text h="2rem">전체</Text>
                  <Text h="2rem">야구모자</Text>
                  <Text h="2rem">페도라</Text>
                  <Text h="2rem">비니</Text>
                  <Text h="2rem">썬캡</Text>
                </Box>
              </Box>
            </SimpleGrid>
          </Box>
        ) : null}
      </HeaderTemplate>
    </>
  );
}
