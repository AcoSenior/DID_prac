import { Avatar, AvatarBadge, AvatarGroup, Button, Flex, Box, Center, Text, useDisclosure, Wrap, WrapItem, Container, Spacer } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import Carousel from '../components/styles/Carousel.jsx';
import MainTemplate from '../components/styles/Mainstyle';
import ItemCarousel from '../components/styles/ItemCarousel';

const Home = () => {
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    setSlide(true);
  }, []);

  return (
    <Box pt={10}>
      {slide ? <Carousel /> : null}
      <MainTemplate>
        <Wrap className="menuIcon">
          <Center className="menuFlex">
            <Avatar size="lg" src="5.png" color="teal" background="#fff" border="0.01rem solid #24d024">
              <Text pl={1} fontSize={14} fontWeight="bold">
                HOT
              </Text>
            </Avatar>
            <Avatar size="lg" src="6.jpeg" color="teal" background="#fff" border="0.01rem solid #24d024">
              <Text pl={1} fontSize={14} fontWeight="bold">
                LADIES
              </Text>
            </Avatar>
            <Avatar size="lg" src="7.jpeg" color="teal" background="#fff" border="0.01rem solid #24d024">
              <Text pl={1} fontSize={14} fontWeight="bold">
                MEN
              </Text>
            </Avatar>
            <Avatar size="lg" src="8.jpeg" color="teal" background="#fff" border="0.01rem solid #24d024">
              <Text pl={1} fontSize={14} fontWeight="bold">
                SPORTS
              </Text>
            </Avatar>
            <Avatar size="lg" src="9.png" color="teal" background="#fff" border="0.01rem solid #24d024">
              <Text pl={1} fontSize={14} fontWeight="bold">
                ACC
              </Text>
            </Avatar>
            <Avatar size="lg" src="10.png" color="teal" background="#fff" border="0.01rem solid #24d024">
              <Text pl={1} fontSize={14} fontWeight="bold">
                BEAUTY
              </Text>
            </Avatar>
            <Avatar size="lg" src="11.jpeg" color="teal" background="#fff" border="0.01rem solid #24d024">
              <Text pl={1} fontSize={14} fontWeight="bold">
                SHOES
              </Text>
            </Avatar>
          </Center>
        </Wrap>
        <Center pt="10rem">
          <Text fontSize="5rem" fontWeight="bold">
            N E W
          </Text>
        </Center>
        {slide ? <ItemCarousel /> : null}
      </MainTemplate>
    </Box>
  );
};

export default Home;
