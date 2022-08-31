import { StarIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { Badge, Box, Button, Center } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const property = [
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/HJBA2F450I2_1/asset/HJBA2F450I2_00.jpg?category', title: '베이지 로고배색 가죽 크로스백', formattedPrice: 12500, reviewslide: 68, rating: 5 },
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/HZPA2C371CG_1/asset/HZPA2C371CG_00.jpg?category', title: '차콜그레이 가먼트다잉 치노 셋업 팬츠', formattedPrice: 8900, reviewslide: 12, rating: 4 },
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/HUJU2D612K2_1/asset/HUJU2D612K2_00.jpg?category', title: '카키 로고패치 긴팔점퍼', formattedPrice: 25200, reviewslide: 55, rating: 5 },
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/HSTS2DH53IV_1/asset/HSTS2DH53IV_00.jpg?category', title: '아이보리 레터링프린트 면 긴팔티셔츠', formattedPrice: 6500, reviewslide: 27, rating: 3 },
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/HWPA2D722D3_1/asset/HWPA2D722D3_00.jpg?category', title: '와인 로고장식 면혼방 밴드반바지', formattedPrice: 9900, reviewslide: 8, rating: 4 },
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/SPTS2F102I1_1/asset/SPTS2F102I1_00.jpg?category', title: '아이보리 웜 라이트 코튼 빅 로고 맨투맨', formattedPrice: 7300, reviewslide: 34, rating: 4 },
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/HSTS2DL58P1_1/asset/HSTS2DL58P1_00.jpg?category', title: '핑크 럭비 긴팔티셔츠', formattedPrice: 12800, reviewslide: 87, rating: 5 },
  { imageUrl: 'https://img.hazzys.com/cmsstatic/product/HZJU2D304N2_1/asset/HZJU2D304N2_00.jpg?category', title: '네이비 레터링자수 면 긴팔캐주얼점퍼', formattedPrice: 28800, reviewslide: 105, rating: 5 },
];

const ItemCarousel = () => {
  const [slide, setSlide] = useState(0);

  const leftHandler = () => {
    setSlide(slide - 1);
    if (slide < 0) {
      setSlide(0);
    }
  };

  const rightHandler = () => {
    setSlide(slide + 1);
    if (slide === 5) {
      setSlide(0);
    }
  };

  const Items = () => {
    return property.map((v, k) => {
      return (
        <Link
          href={{
            pathname: '/buyItem',
            query: v,
          }}
          key={k}
        >
          <a>
            <Box minW="25rem" borderWidth="1px" ml="5">
              <Image src={v.imageUrl} width={500} height={600} />
              <Box p="6">
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>
                  {' ' + v.title}
                </Box>

                <Box>{v.formattedPrice} P</Box>
                <Box mt="2" alignItems="center">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon key={i} color={i < v.rating ? 'teal.500' : 'gray.300'} />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {v.reviewslide} reviews
                  </Box>
                </Box>
              </Box>
            </Box>
          </a>
        </Link>
      );
    });
  };

  const trans = {
    transform: `translateX(${slide * -25}rem)`,
  };

  return (
    <>
      <Carousel style={trans}>
        <Slider>{Items()}</Slider>
      </Carousel>
      <SlideBtn>
        <Center>
          <Button onClick={leftHandler} leftIcon={<ArrowBackIcon ml={2} />} colorScheme="teal" variant="outline" width={20} mt={10} mr={4} mb={20} />
          <Button onClick={rightHandler} rightIcon={<ArrowForwardIcon mr={2} />} colorScheme="teal" variant="outline" width={20} mt={10} ml={4} mb={20} />
        </Center>
      </SlideBtn>
    </>
  );
};

export default ItemCarousel;

const Carousel = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 10rem;
  transition: all 1s;
`;

const Slider = styled.div`
  width: 50rem;
  display: flex;
`;

const SlideBtn = styled.div`
  width: 100%;
  padding-top: 48rem;
`;
