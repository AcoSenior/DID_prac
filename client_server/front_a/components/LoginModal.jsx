import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Lorem, ModalFooter, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { setCookie } from 'cookies-next';

const LoginModal = ({ loginIsOpen, loginOnClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClick = async (req, res) => {
    const response = await axios.post('http://localhost:4001/api/auth/login', {
      userEmail: email,
      userPw: password,
    });

    if (response.data.status) {
      const payload = response.data.token.split('.')[1];
      setCookie('user', payload, { req, res, maxAge: 60 * 60 * 24 * 1000 });

      window.location.replace('/');
    } else {
      alert(response.data.msg);
    }
  };

  return (
    <>
      <Modal isOpen={loginIsOpen} onClose={loginOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input variant="flushed" placeholder="아이디를 입력해주세요" onChange={(e) => setEmail(e.target.value)} />
            <Input variant="flushed" placeholder="비밀번호를 입력해주세요" type="password" onChange={(e) => setPassword(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button
              width="7rem"
              colorScheme="teal"
              variant="outline"
              mr="7.2rem"
              onClick={() => {
                console.log('DID 로그인');
              }}
            >
              DID 로그인
            </Button>
            <Button width="5rem" colorScheme="teal" mr={3} onClick={loginOnClose}>
              취소
            </Button>
            <Button width="5rem" colorScheme="teal" variant="outline" onClick={onClick}>
              로그인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
