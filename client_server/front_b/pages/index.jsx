import { Box, Button, Flex, Text, Input, Image } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

import { useState } from 'react';
import axios from 'axios';

import { backend } from '../utils/ip.js';
import { useEffect } from 'react';

import MainCarousel from '../components/mainPage/Carousel.jsx';

const Home = ({ userId, email, point, setPoint }) => {
	const [clicked, setClicked] = useState('package');
	const [ product1, product2, product3, product4] = [34900, 39000, 52900, 449000]

	const setUnderLiner = (e) => {
		setClicked(e.target.id);
	};

	const purchase = async (price) => {
		if(!email) {
			alert('로그인 후 이용 가능합니다.')
			return;
		}

		const returnValue = confirm(`선택하신 상품 가격은 ${price}원입니다. 구매하시겠습니까? \n 남은 포인트: ${point}원`);
		if (returnValue == true) {
			try {
				const response = await axios.post(`${backend}/api/auth/usePoint`, { email, price });
				if (response.data.status == true) {
					alert(response.data.msg);
					setPoint(point - price);
				} else {
					alert('잔액이 부족합니다');
				}
			} catch (e) {
				alert(e.message);
			}
		} else {
			return;
		}
	};

	return (
		<>
			<Box bg='blue.200' letterSpacing='-5%' zIndex='1000'>
				<Flex justifyContent='space-around' w='75%' mx='auto' my='0' py='4rem' alignItems='center' bg='blue.200' zIndex={'1100'}>
					<Box px='2.5rem' pt='4rem' pb='4rem' w='30%' zIndex={'1000'} bg='blue.200'>
						<Box fontSize='175%'>고객님,</Box>
						<Box fontSize='175%' pb='8%' fontWeight='700'>
							어떤 여행을 꿈꾸시나요?
						</Box>

						<Flex justifyContent='space-between' fontSize='1.25rem' mb='2%' textAlign='center'>
							<Text id='package' onClick={setUnderLiner} w='33%'>
								패키지
							</Text>
							<Text id='airport' onClick={setUnderLiner} w='33%'>
								항공
							</Text>
							<Text id='hotel' onClick={setUnderLiner} w='33%'>
								호텔
							</Text>
						</Flex>

						<Flex>
							{clicked == 'package' ? <Box h='2.5px' bg='blackAlpha.700' w='34%'></Box> : ''}
							{clicked == 'airport' ? <Box h='2.5px' bg='blackAlpha.700' w='34%' ml='33%'></Box> : ''}
							{clicked == 'hotel' ? <Box h='2.5px' bg='blackAlpha.700' w='34%' ml='66%'></Box> : ''}
						</Flex>

						<Box h='2px' bg='blackAlpha.300' w='100%' mb='1rem' mt='-0.25%'>
							{' '}
						</Box>

						<Box mx='0' my='auto'>
							<Input type='text' w='100%' h='3.5rem' borderRadius='0.25rem' pd='2rem' bg='white' mb='0.75rem' placeholder='어디로 떠나세요?' fontSize='1.125rem' />

							<Flex justifyContent='space-between' pb='0.75rem'>
								<Button w='11.875rem' h='2.75rem' bg='white' mx='0.75%'>
									인천/김포 출발
								</Button>
								<Button w='11.875rem' h='2.75rem' bg='white' mx='0.75%'>
									여행시작일 선택
								</Button>
							</Flex>

							<Flex justifyContent='space-between' pb='2rem'>
								<Button w='11.875rem' h='4rem' mx='0.75%'>
									<Box bg='red' mr='10%'>
										dlall
									</Box>{' '}
									<Text fontSize='0.875rem'>항공권은 있어요</Text>
								</Button>
								<Button w='11.875rem' h='4rem' mx='0.75%'>
									우리끼리만 여행할래요
								</Button>
							</Flex>

							<Flex bg='#222222' borderRadius='0.25rem' h='4rem' alignItems='center'>
								<Text fontSize='1.25rem' mx='auto' my='0' color='white'>
									패키지 검색
								</Text>
							</Flex>
						</Box>
					</Box>

					<Box w='40%' h='38rem' pt='1rem' px='6rem' position='relative' zIndex='100' overflow='hidden'>
						<MainCarousel />
					</Box>
				</Flex>
			</Box>

			{/* 여기부터 상품들.. 구매하면 클릭 되도록 */}
			<Box w='100%' h='40rem' pt='8rem' mx='auto' my='0'>
				<Box w='85%' mx='auto' my='0' px='6.5rem'>
					<Text fontSize='1.75rem' fontWeight='600' mb='1.5rem'>
						도전! 해외여행 착한 가격
					</Text>

					<Flex w='100%' justifyContent='space-between' textAlign='center'>
						<Box w='23.5%' onClick={() => purchase(product1)} id='product1'>
							<Image src='https://image.hanatour.com/usr/cms/resize/250_0/2019/01/18/10000/0b0544c8-cbbe-4e27-a994-dacbb55e3b15.jpg' w='100%' mb='5%' h='60%' />
							<Text textAlign='left' fontSize='115%' mb='0.25rem'>
								다낭 5일 #시내4성 #자유시간
							</Text>
							<Text textAlign='left' fontSize='95%' mb='1rem'>
								#호이안투어 #바나산 #쇼핑3회
							</Text>
							<Text textAlign='left' fontSize='150%'>
								{product1.toLocaleString()}원~
							</Text>
						</Box>

						<Box w='23.5%' onClick={() => purchase(product2)} id='product2'>
							<Image src='https://image.hanatour.com/usr/cms/resize/250_0/2021/12/13/10000/2c56ad37-6385-42ba-9822-d0e88efb0b77.jpg' w='100%' mb='5%' h='60%' />
							<Text textAlign='left' fontSize='115%' mb='0.25rem'>
								싱가포르 자유여행 5일 #왕복항공권
							</Text>
							<Text textAlign='left' fontSize='95%' mb='1rem'>
								#여행자보험 #라운지이용 #데이터유심
							</Text>
							<Text textAlign='left' fontSize='150%'>
								{product2.toLocaleString()}원~
							</Text>
						</Box>

						<Box w='23.5%' onClick={() => purchase(product3)} id='product3'>
							<Image src='https://image.hanatour.com/usr/cms/resize/250_0/2022/06/23/10000/a075696c-13ba-4cb4-81a5-24a04c4e5974.jpg' w='100%' mb='5%' h='60%' />
							<Text textAlign='left' fontSize='115%' mb='0.25rem'>
								[타임세일] 몽골/테렐지 4~5일 #초특가{' '}
							</Text>
							<Text textAlign='left' fontSize='95%' mb='1rem'>
								#올레3코스 #대초원승마 #현대게스2박(4인1실)
							</Text>
							<Text textAlign='left' fontSize='150%'>
								{product3.toLocaleString()}원~
							</Text>
						</Box>

						<Box w='23.5%' onClick={() => purchase(product4)} id='product4'>
							<Image src='https://image.hanatour.com/usr/cms/resize/250_0/2019/01/18/10000/0b0544c8-cbbe-4e27-a994-dacbb55e3b15.jpg' w='100%' mb='5%' h='60%' />
							<Text textAlign='left' fontSize='115%' mb='0.25rem'>
								[출발확정]서유럽 6국 12일
							</Text>
							<Text textAlign='left' fontSize='95%' mb='1rem'>
								#시내호텔 1박 #에펠탑/세느강 유람선{' '}
							</Text>
							<Text textAlign='left' fontSize='150%'>
								{product4.toLocaleString()}원~
							</Text>
						</Box>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default Home;
