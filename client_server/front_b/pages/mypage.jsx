import {useState,useEffect} from 'react';
import { Box, Button, Flex, Text, Input, FormControl,
    FormLabel, FormErrorMessage, FormHelperText, useLatestRef,} from "@chakra-ui/react";
import axios from 'axios';
import { backend,frontend } from '../utils/ip';


const mypage = ({userId, email, point})  => {
    const [tryDid, setTryDid] = useState(false)
    const [ pw, setPw ] = useState(undefined) 

    const didRegister = () => {
        setTryDid(!tryDid)
    }

    const getPs = (e) => {
        setPw(e.target.value)
    }

    const didLoginHandler = async () => {
        const response = await axios.post(`${backend}/api/Oauth/oauthregister`, {email, password : pw})
        if(response.data.status == false && response.data.msg == 1  ) {
            alert('비밀 번호를 확인해주세요')
            return;
        }
        if(response.data.status == false, response.data.msg == 2 ) {
            alert('이미 연동된 계정입니다.')
            return;
        }
        alert(`${response.data.data} 이메일로 did login이 연동되었습니다.`)
    }

    const changePw = () => {
        location.href=`${frontend}/changePw`
    }

    return (
        <Box pt='6rem'>
            {
                tryDid == false 
                ?
            <>
                <Box w='30%' mx='auto' my='0' fontSize={'125%'} justifyContent='center'>

                    <Box fontSize={'125%'} px='10%' mb='5%'>
                        <Text mb='2%' px='5%'>{userId}님, 안녕하세요.</Text>
                        <Text mb='2%' px='5%'> email : {email}</Text>
                        <Text mb='2%' px='5%'> point : {point}</Text>
                    </Box>

                    <Flex justifyContent={'center'}>
                        <Button onClick={didRegister} colorScheme='blue' mx='1%' w='25%'>
                            DID login 연동
                        </Button>
                        <Button mx='1%' w='25%' onClick={changePw}>
                            비밀번호 변경
                        </Button>
                        <Button mx='1%' w='25%'>
                            포인트 충전
                        </Button>
                    </Flex>
                    
                </Box>
            </>
            :
            <>
                <FormControl w='15%' mx='auto' my='0'>
                    <Text fontSize={'1.25rem'} mb='0.5rem'> 비밀번호를 다시 한 번 입력해주세요. </Text>
                    <Input type='password' placeholder='password을 입력해주세요' size='md' id='userPw' mb='3%' onChange={getPs}/>
                    <Flex justifyContent={'space-evenly'}>
                        <Button onClick={didRegister}> 취소 </Button>
                        <Button onClick={didLoginHandler} colorScheme='blue' w='32' >DID 등록</Button>
                    </Flex>

                </FormControl>
            </>
            }
        </Box>
    )
}

export default mypage;