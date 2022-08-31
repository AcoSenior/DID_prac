import { Flex, Select, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Center } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const JoinModal = ({ joinIsOpen, joinOnClose }) => {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [domain, setDomain] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');

  const [emailAuth, setEmailAuth] = useState(false);
  const [emailNum, setEmailNum] = useState([]);
  const [inputEmailNum, setInputEmailNum] = useState([0, 0, 0, 0, 0, 0]);
  const [emailNumCheck, setEmailNumCheck] = useState('');

  const onChange = async (e, type) => {
    switch (type) {
      case 'Email':
        setEmail(e.target.value);
        if (domain === '') {
          setEmailCheck('check domain');
        } else {
          let id = e.target.value + domain;

          console.log('이메일 변경');

          const response = await axios.post('http://localhost:4001/api/auth/idCheck', { email: id });

          console.log(response.data);

          if (response.data.status === 1) {
            setEmailCheck('true');
          } else {
            setEmailCheck('false');
          }
        }
        if (e.target.value === '') setEmailCheck('');

        break;
      case 'Select':
        setDomain(e.target.value);

        if (email === '') {
          setEmailCheck('');
        } else if (email !== '' && e.target.value === '') {
          setEmailCheck('check domain');
        } else {
          let id = email + e.target.value;

          console.log('도메인 변경');

          const response = await axios.post('http://localhost:4001/api/auth/idCheck', { email: id });

          console.log(response.data);

          if (response.data.status === 1) {
            setEmailCheck('true');
          } else {
            setEmailCheck('false');
          }

          if (e.target.value === '') setDomain('');
        }
        break;
      case 'Password':
        const passwordCd = /^(?=.*[a-zA-Z])(?=.*[\~\․\!\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\|\\\;\:\\'\"\<\>\,\.\?\/])(?=.*[0-9]).{9,21}$/;

        if (passwordCd.test(e.target.value)) {
          setPasswordCheck(true);
        } else {
          setPasswordCheck(false);
        }

        if (e.target.value === '') setPasswordCheck('');

        setPassword(e.target.value);
        break;
      case 'Nickname':
        setNickname(e.target.value);
        break;
      default:
        break;
    }
  };

  const auth = async () => {
    const response = await axios.post('http://localhost:4001/api/auth/email', { email: email + domain });

    if (response.data.status) {
      setEmailAuth(true);
      setEmailNum(response.data.number);
      setEmailCheck('');
    }

    console.log(response.data.number);
  };

  const emailAuthInput = () => {
    return emailNum.map((v, k) => {
      return (
        <Input
          maxLength="1"
          fontSize={14}
          key={k}
          onChange={(e) => {
            inputEmailNum[k] = e.target.value;
            setInputEmailNum(inputEmailNum);
          }}
        ></Input>
      );
    });
  };

  const onClose = () => {
    setEmail('');
    setEmailCheck('');
    setDomain('');

    setPassword('');
    setPasswordCheck('');
    setNickname('');

    setEmailAuth(false);
    setEmailNum([]);
    setInputEmailNum([0, 0, 0, 0, 0, 0]);
    setEmailNumCheck('');

    joinOnClose();
  };

  const onClick = async () => {
    const body = {
      email: email + domain,
      password,
      nickName: nickname,
    };

    const response = await axios.post('http://localhost:4001/api/auth/SignUp', body);

    if (response.data.status === 1) {
      setEmail('');
      setEmailCheck('');
      setDomain('');

      setPassword('');
      setPasswordCheck('');
      setNickname('');

      setEmailAuth(false);
      setEmailNum([]);
      setInputEmailNum([0, 0, 0, 0, 0, 0]);
      setEmailNumCheck('');

      alert('회원가입이 완료되었습니다.');

      joinOnClose();
    }
  };

  return (
    <>
      <Modal isOpen={joinIsOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Input
                variant="flushed"
                placeholder="Email"
                onChange={(e) => {
                  onChange(e, 'Email');
                }}
                w={180}
              />
              <Select
                placeholder="Select Domain"
                w={230}
                ml={2}
                onChange={(e) => {
                  onChange(e, 'Select');
                }}
              >
                <option value="@kakao.com">@kakao.com</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@gmail.com">@gmail.com</option>
              </Select>
              {!emailAuth ? (
                <Button w={120} ml={2} onClick={auth} disabled={emailCheck ? false : true}>
                  이메일 인증
                </Button>
              ) : (
                <Button w={120} ml={2} onClick={auth}>
                  재발급
                </Button>
              )}
            </Flex>
            {emailAuth ? (
              <>
                <Center mt={5} mb={5}>
                  {emailNumCheck === '' ? <Text style={{ color: 'blue', fontSize: '12px' }}>{'발급받은 인증 번호를 입력해주세요'}</Text> : emailNumCheck ? <Text style={{ color: 'green', fontSize: '12px' }}>{'인증 번호가 일치합니다. 회원가입을 계속하세요'}</Text> : <Text style={{ color: 'red', fontSize: '12px' }}>{'인증 번호가 일치하지 않습니다. 인증번호를 다시 확인하세요'}</Text>}
                </Center>
                <Center>
                  <Flex w={250} justifyContent="space-around">
                    {emailAuthInput()}
                  </Flex>
                </Center>
                <Center>
                  <Button
                    mt={5}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => {
                      console.log(inputEmailNum.toString());
                      console.log(emailNum.toString());
                      if (inputEmailNum.toString() === emailNum.toString()) {
                        setEmailNumCheck(true);
                      } else {
                        setEmailNumCheck(false);
                      }
                    }}
                  >
                    확인
                  </Button>
                </Center>
              </>
            ) : null}
            {emailCheck === 'check domain' ? <Text style={{ color: 'red' }}>- 도메인을 체크해주세요.</Text> : emailCheck === 'true' ? <Text style={{ color: 'green' }}>- 사용 가능한 Email 입니다.</Text> : emailCheck === 'false' ? <Text style={{ color: 'red' }}>- 이미 사용중인 Email 입니다.</Text> : null}
            <Input
              variant="flushed"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                onChange(e, 'Password');
              }}
            />
            {passwordCheck === '' ? null : passwordCheck ? (
              <Center mt={5} mb={5}>
                <Text style={{ color: 'green', fontSize: '12px' }}>사용 가능한 비밀번호입니다.</Text>
              </Center>
            ) : (
              <>
                <Center mt={2}>
                  <Text style={{ color: 'red', fontSize: '12px' }}>사용 불가능한 비밀번호입니다.</Text>
                </Center>
                <Center mt={2}>
                  <Text style={{ color: 'red', fontSize: '12px' }}>영문자, 특수문자, 숫자를 포함하여 9~21자리로 구성해주세요.</Text>
                </Center>
              </>
            )}
            <Input
              variant="flushed"
              placeholder="Nickname"
              onChange={(e) => {
                onChange(e, 'Nickname');
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button width="5rem" colorScheme="teal" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button width="5rem" colorScheme="teal" mr={3} variant="outline" onClick={onClick} disabled={emailNumCheck && passwordCheck && nickname !== '' ? false : true}>
              회원가입
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinModal;
