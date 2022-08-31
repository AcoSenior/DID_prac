import useRouter from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Divider, Stack, Flex, Box, Image, Text, Center } from '@chakra-ui/react';
import axios from 'axios';

const BuyItem = ({ user }) => {
  const router = useRouter;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [formattedPrice, setFormattedPrice] = useState(0);
  const [point, setPoint] = useState(0);

  const buyItem = async () => {
    const response = await axios.post('http://localhost:4000/api/auth/usePoint', { email, price: formattedPrice });
    if (response.data.status) {
      getPoint();
      alert('구매 완료되었습니다');
    }
  };

  const getPoint = async () => {
    const response = await axios.post('http://localhost:4000/api/auth/pointInquiry', { email: user.email });
    if (response.data.status) {
      setPoint(response.data.point);
    }
  };

  useEffect(() => {
    setImageUrl(router.query.imageUrl);
    setTitle(router.query.title);
    setFormattedPrice(router.query.formattedPrice);

    if (user) {
      setUsername(user.username);
      setEmail(user.email);

      getPoint();
    }
  });

  return (
    <Box m="10">
      <Flex>
        <Image flex={1} src={imageUrl} height={700} />
        <Stack flex={1} ml="5" direction="row" p={4}>
          <Divider orientation="vertical" />
          <Flex direction="column">
            <Flex>
              <Box w="40rem" flex={2} pl="0.5rem" pt="1.5rem" borderBottom="1px solid rgba(0, 0, 0, 0.1);">
                <Text fontSize="1.5rem">{title}</Text>
              </Box>
            </Flex>
            <Box w="40rem" flex={2} pl="0.5rem" pt="1rem" borderBottom="1px solid rgba(0, 0, 0, 0.1);">
              <Center borderBottom="1px solid rgba(0, 0, 0, 0.1);">
                <Text fontSize="1.8rem" fontWeight="bold" pt="5rem" pl="24rem" pb="0.5rem">
                  판매가 : {formattedPrice} P
                </Text>
              </Center>
              <Center pt="0.5rem">
                <Text fontSize="1.5rem" fontWeight="bold" pb="1rem">
                  Kyungli Mall 포인트 사용
                </Text>
              </Center>
              <Text fontSize="1.5rem" fontWeight="bold" pl={user ? '19rem' : '24rem'} pt="5rem">
                {user ? `${username}님 보유 포인트 : ${point} P` : '로그인 후 이용가능 합니다'}
              </Text>
              <Button w="15rem" colorScheme="teal" variant="outline" ml="24rem" mt="0.5rem" mb="1rem" onClick={buyItem} disabled={formattedPrice <= point ? false : true}>
                구매
              </Button>
              {user ? (
                formattedPrice >= point ? (
                  <Center mb="0.5rem">
                    <Text color="red" fontSize="1rem">
                      보유 포인트가 부족합니다.
                    </Text>
                  </Center>
                ) : null
              ) : null}
            </Box>
            <Box w="40rem" flex={2} pl="0.5rem" pt="1rem" borderBottom="1px solid rgba(0, 0, 0, 0.1);">
              {user ? (
                <Flex>
                  <Center pt="0.5rem" flex={1}>
                    <Flex direction="column">
                      <Text fontSize="1rem" fontWeight="bold" pb="1rem" textAlign="center">
                        B 사이트 포인트 사용
                      </Text>
                      <Text fontSize="1rem" fontWeight="bold" pt="5rem" textAlign="center">
                        {username}님 보유 포인트 : ??? P
                      </Text>
                      <Button w="5rem" colorScheme="teal" variant="outline" m="0 auto" mt="0.5rem" mb="0.5rem">
                        구매
                      </Button>
                    </Flex>
                  </Center>
                  <Center pt="0.5rem" flex={1}>
                    <Flex direction="column">
                      <Text fontSize="1rem" fontWeight="bold" pb="1rem" textAlign="center">
                        C 사이트 포인트 사용
                      </Text>
                      <Text fontSize="1rem" fontWeight="bold" pt="5rem" textAlign="center">
                        {username}님 보유 포인트 : ??? P
                      </Text>
                      <Button w="5rem" colorScheme="teal" variant="outline" m="0 auto" mt="0.5rem" mb="0.5rem">
                        구매
                      </Button>
                    </Flex>
                  </Center>
                  <Center pt="0.5rem" flex={1}>
                    <Flex direction="column">
                      <Text fontSize="1rem" fontWeight="bold" pb="1rem" textAlign="center">
                        D 사이트 포인트 사용
                      </Text>
                      <Text fontSize="1rem" fontWeight="bold" pt="5rem" textAlign="center">
                        {username}님 보유 포인트 : ??? P
                      </Text>
                      <Button w="5rem" colorScheme="teal" variant="outline" m="0 auto" mt="0.5rem" mb="0.5rem">
                        구매
                      </Button>
                    </Flex>
                  </Center>
                </Flex>
              ) : (
                <Center>
                  <Text fontSize="1.5rem" fontWeight="bold" pl="24rem" pt="12rem" pb="0.5rem">
                    로그인 후 이용가능 합니다
                  </Text>
                </Center>
              )}
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default BuyItem;
