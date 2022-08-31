import { Box, Button, Flex, Text, Input, Table, Thead, Tbody, Th, Td, Tr, Divider } from "@chakra-ui/react";
import axios from 'axios'
import { useState, useEffect } from "react";
import { backend } from '../utils/ip.js'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AppInfo = () => {
    const router = useRouter()
    const email = '619049@naver.com'
    const appName = router.query.appName
    const [ showInfo, setShowInfo ] = useState(false)
    const [ appInfo, setAppInfo ] = useState(undefined)
    const [ isModifying, setIsModifying ] = useState(null)
    const [ uri, seturi ] = useState(undefined)

    const revealInfo = async () => {
        const response = await axios.post(`${backend}/api/oauth/appinfo`, 
        {appName: router.query.appName, email:email})
        console.log(response.data.appInfo)
        setAppInfo(response.data.appInfo)
        seturi(response.data.appInfo.redirectURI)
        setShowInfo(true)
    }

    const setUri = (k) => (e) => {
        uri[k] = e.target.value
    }

    const confirmURI = (k) => (e) => {
        if( e.key !=='Enter') return;
        setIsModifying(null)
    }

    const modifyRed = async () => {
        if(isModifying !== null) {
            alert(`uri 설정을 완료한 후 계속 진행해주세요.`)
            return;
        }
        const response = await axios.post(`${backend}/api/oauth/updateRedirect`, {uri, email:email, appName: appName})
        alert(response.data.msg)
    }

    const uris = uri?.map((v,k) => {
        return(
            <Box key={k} h='2rem' justifyContent={'center'}>
                {
                    isModifying == k
                    ?
                    <Input placeholder="redirect url을 등록해주세요." 
                    w='35%' mb='0.7%'
                    size='sm' px='3%'
                    defaultValue={uri[k]}
                    onChange ={setUri(k)}
                    onKeyDown={confirmURI(k)}
                    borderColor={'gray.400'}
                    />
                    :
                    (
                        uri[k] == null
                        ?
                        <Box onClick={() => setIsModifying(k)} mb='0.7%' textColor={'gray.500'}>
                            redirect uri를 등록해주세요
                        </Box>
                        :
                        (
                            uri[k] == ''
                            ?
                            <Box onClick={() => setIsModifying(k)} mb='0.7%' textColor={'gray.500'}>
                                redirect uri를 등록해주세요
                            </Box>
                            :
                            <Box onClick={() => setIsModifying(k)} mb='0.7%'>{uri[k]}</Box>
                        )
                       
                    )
                }
            </Box>
        )
    })

    return(
        <>
            <Box pt='5%' w='70%' mx='auto' my='0'>
                
                <Flex flexDirection={'column'} alignItems='center' mb='3%'>
                    <Box fontSize={'175%'} mb='0.5%'>어플리케이션 관리 페이지</Box>
                    <Box fontSize={'120%'}> Application : {router.query.appName} </Box>
                </Flex>

                <Flex flexDirection={'column'} alignItems={'center'}>
                    {
                        showInfo == false ?
                        <Button onClick={revealInfo}>Rest api, client_secret 보기</Button>
                        :
                        <>  
                            <Box mb='4%' w='100%' px='10%' borderColor='gray.400' border={'1px'}>
                                <Table >
                                    <Thead>
                                        <Tr>
                                            <Th textAlign={'center'}>Rest API</Th>
                                            <Th textAlign={'center'}>Client Secret</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td textAlign={'center'}>{ appInfo.restAPI }</Td>
                                            <Td textAlign={'center'}>{ appInfo.clientSecretKey }</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </Box>

                            <Divider orientation="horizontal" mb='3%'/>

                            <Box textAlign={'center'} w='100%' mb='2%' borderColor='gray.400' border={'1px'}>
                                <Box fontSize={'175%'} mb='0%'>Redirect URI 관리</Box>
                                <Text mb='1.5%'>리다이렉트 url은 최대 5개까지  등록할 수 있습니다.</Text>
                                
                                <Box>
                                    {uris}
                                </Box>
                            </Box>

                            <Box mb='1%'><Text>uri 수정 후, 수정 완료 버튼을 눌려주세요.</Text></Box>
                            <Button onClick={modifyRed}>수정 완료</Button>
                        </>
                    }    
                </Flex>
            </Box>
        </>
    )
}

// export const getServerSideProps = async () => {
//     const router = useRouter()
//     const email = '619049@naver.com'
//     const appName = router.pathname.split('?')[1].split('=')[1]
//     const qwe = router.query
//     console.log(appName, qwe)
//     const response = await axios.post(`${backend}/api/oauth/getMyApp`, {appName: appName, email:email})
  
//     return { props: {appInfo : response.data.status} };
// };

export default AppInfo;