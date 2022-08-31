import { Box, Button, Flex, useDisclosure, Image, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import LoginModal from './LoginModal'
import { deleteCookie } from 'cookies-next';
import { frontend } from '../utils/ip';
import { Search2Icon } from '@chakra-ui/icons';


const Header = ({userId}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const logoutHandler = () => {
        deleteCookie('loginInfo', {path: '/', domain:`localhost`})
        location.href=`${frontend}`
    }

    return (
        <Box>
            <Box pt='2rem'>
                <Flex borderBottom='1px' borderColor='gray.200' justifyContent="space-between" px="2.5rem" pb='1rem' w="full" z-index='10'>
                    <Box bg="white">
                        <Link href="/"><Button size='sm' variant='ghost' fontSize='2xl' pl='5rem' mr='3rem' ml='1rem'>Kyungil Tour</Button></Link>
                        <Input type='text' w = '28rem' borderRadius='1.25rem' pd='1.5rem' placeholder='검색어를 입력해주세요'
                        // _after={{content:<Search2Icon/>, display:'inline-block'}}
                        />
                        
                    </Box>
                    <Box>
                        {
                            userId 
                            ?
                            <>
                                <Button onClick={logoutHandler}>logout</Button>
                                <Link href='mypage'><Button size='sm' variant='ghost' h='40px' bg='blue.200' mx='0.25rem'>my page</Button></Link>
                            </>
                            :
                            <>
                                <Button colorScheme='blue'onClick={onOpen} w='6rem'>login</Button>
                                <LoginModal isOpen={isOpen} onClose={onClose}/>
                                <Button colorScheme='gray' w='6rem' mx='1rem' my='0.25rem'><Link href='/register'>join</Link></Button>
                            </>
                        }                    
                    </Box>
                </Flex>
            </Box>

            <Box px='7.75rem' borderBottom='1px' borderColor='gray.200'>
                <Flex justifyContent='space-between' alignItems='center' h='3.5rem'>
                    <Box borderX='1px' borderColor='gray.200'>
                        <Text py='1rem' px='0.875rem'>ㅡㅡ  -  전체메뉴</Text>
                    </Box>

                    <Flex justifyContent='space-evenly' pr='4rem'>
                        <Text p='0.75rem' marginX='0.125rem'>해외여행</Text>
                        <Text p='0.75rem' marginX='0.125rem'>제주/국내여행</Text>
                        <Text p='0.75rem' marginX='0.125rem'>항공</Text>
                        <Text p='0.75rem' marginX='0.125rem'>호텔/펜션</Text>
                        <Text p='0.75rem' marginX='0.125rem'>투어/입장권</Text>
                        <Text p='0.75rem' marginX='0.125rem'>허니문</Text>
                        <Text p='0.75rem' marginX='0.125rem'>골프</Text>
                        <Text p='0.75rem' marginX='0.125rem'>제우스</Text>
                        <Text p='0.75rem' marginX='0.125rem'>MICE</Text>
                        <Text p='0.75rem' marginX='0.125rem'>하나LIVE</Text>                        
                    </Flex>
                    
                    <Flex justifyContent="space-evenly">
                        <Text mx='1rem'>여행기획전</Text>
                        <Text >기업출장/단체</Text>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
}


export default Header;