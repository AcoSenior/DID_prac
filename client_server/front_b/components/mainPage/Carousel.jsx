import styled from 'styled-components';
import { Box, Button, Center, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const images = [
    { imageURL : "https://image.hanatour.com/usr/manual/md/2022/07/PL00113229/PL00113229.jpg" },
    { imageURL : "https://image.hanatour.com/usr/manual/md/2022/08/PL00113255/PL00113255.jpg" }, 
    { imageURL : 'https://image.hanatour.com/usr/manual/md/2022/03/PL00113033/PL00113033.jpg' }, 
    { imageURL : 'https://image.hanatour.com/usr/manual/md/2022/03/PL00113003/pc_mb.jpg' }, 
    { imageURL : 'https://image.hanatour.com/usr/manual/md/2022/07/PL00113215/PL00113215.jpg' }
]

const MainCarousel = () => {
    const [ slide, setSlide ] = useState(0)

    const trans = {
        transform: `translateX(${slide * -40 - 6}rem)`,
    };

    const leftHandler = () => {
        setSlide(slide - 1);
        if (slide == 0) {
          setSlide(4);
        }
    };
    
    const rightHandler = () => {
        setSlide(slide + 1);
        if (slide === 4) {
            setSlide(0);
        }
    };

    const Items = () => {
        return images.map((v, k) => {
          return (
            <Box w="40rem" key={k}>
                <Image src={v.imageURL} />
            </Box>
            );
        });
      };
    
      return (
        <Box>
          <Carousel style={trans} >
            <Slider>{Items()}</Slider>
          </Carousel>

          <SlideBtn>
            <Center>
              <Button onClick={leftHandler} leftIcon={<ArrowBackIcon ml={2} />} colorScheme="teal" variant="outline" width={20}  />
              <Button onClick={rightHandler} rightIcon={<ArrowForwardIcon mr={2} />} colorScheme="teal" variant="outline" width={20} />
            </Center>
          </SlideBtn>
        </Box>
      );
    };
    
export default MainCarousel;
    
const Carousel = styled.div`
    width: 100%;
    position: absolute;
    transition: all 1s;
    z-index:0;
`;

const Slider = styled.div`
  width: 200rem;
  display: flex;
`;

const SlideBtn = styled.div`
  width: 100%;
  padding-top: 34rem;
`;
