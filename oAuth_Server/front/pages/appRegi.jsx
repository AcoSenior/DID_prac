import { Box, Button, Flex, Text, Input, FormControl, Image,
    FormLabel, FormErrorMessage, FormHelperText, Select, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import axios from 'axios'
import { useState, useEffect } from "react";
import { backend, frontend } from '../utils/ip.js'
import Link from 'next/link'


// rest api를 발급받고 redirect uri를 발급받을 로컬 서버 관리자는
// 로그인이 된 상태라고 가정

const ServerRegi = () => {
    const [ myRestApi, setMyRestApi ] = useState(false)
    const [confirmAppname, setConfirmAppname ] = useState(false)
    const [ appName, setAppName ] = useState(undefined)
    const [restAPI, setRestAPI] = useState(undefined)
    const [ secret, setSecret ] = useState(undefined)

    const getRestApi = async() => {
        if(!appName || confirmAppname == false) {
            alert('어플리케이션 이름을 설정해주세요')
            return;
        }
        setMyRestApi(true)
        const email = '619049@naver.com'
        const response = await axios.post(`${backend}/api/oauth/apiDistribution`, {appName:appName, email:email})

        setRestAPI(response.data.REST_API)
        setSecret(response.data.client_secret)
    }

    return (
      <>
        <Box px='5%' py='5%'>
            <Flex mx='auto' my='0' justifyContent={'center'}>
                <Box>
                    {
                        confirmAppname == false ?
                    <>
                    <Input type='text' placeholder='어플리케이션 이름을 입력해주세요'
                    onChange={(e) => setAppName(e.target.value)}
                    defaultValue={appName}
                    />
                    <Button onClick={() => setConfirmAppname(!confirmAppname)}>어플리케이션 이름 확인</Button>
                    </>
                    :
                    <>
                        <Text>어플리케이션 이름 : {appName}</Text>
                        {
                            myRestApi == false ?
                            <Button onClick={() => setConfirmAppname(!confirmAppname)}>수정</Button>
                            :
                            <Text>Rest API가 발급되었습니다</Text>
                        }
                        
                    </>
                    }

                    <Box> RestAPI 를 발급받으려면 버튼을 클릭해주세요 </Box>
                    {
                        myRestApi == false ?
                        <Button onClick={getRestApi}>REST API 발급 받기</Button>
                        :
                        <Flex>
                            <Box>
                                <Text>rest api : {restAPI}</Text>
                                <Text>client secret : {secret}</Text>
                            </Box>
                            <Box>
                                <Button><Link href={`/`}> 홈으로 </Link></Button>
                            </Box>
                        </Flex>
                    }
                    
                </Box>
            </Flex>
        </Box>
      </>
    )
}

export default ServerRegi;