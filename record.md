`` 8/30

프로젝트에서 조금 더 다양한 코드, 경험을 접해보기 위해,

이제까지 진행된 코드에서 새로운 브랜치로 갈라져 나와 혼자서 이것저것 해보기로 함.

컨트랙트는 어떻게 짤 것인지, ouath 서버와 어떻게 연동을 할지,

oauth 로그인은 어떻게 처리해줄 것인지, 클라이언트 서버와, 사용자와 어떤식으로 상호작용을 할 것인지를 생각해보자.

단, 언제까지나 블록체인에 가까울 수록 핵심이다. 그 반대에 치중하지 말 것.

우선 첫 번쨰로 할 일은 다른 사람이 설정해둔 환경 변수등의 값들을 바꿔주는 것이 되겠다.

우선 truffle 폴더로 가서 npm i 쳐서 패키지들을 쭉 설치한다.

/truffle/.env 에서 각 환경 변수들을 .env.example을 참조해 내 지갑과 api로 바꿔준다.

---

지갑 주소 : 0x16db051fd6cFb19bc8210b5d13398B2285FD2b25

복구 구문 : absurd salute gallery february orient river orphan apology east run alert short
// 비공개키를 입력해도 무방하다.

https://goerlifaucet.com/
https://optimismfaucet.xyz/
테스트용 이더리움, 옵티미즘은 여디서 받아주고

(위는 이더리움, 아래가 옵티미즘 용이다. 둘 다 받아둘 것.)

나는 알케미 인프라를 사용할 것이므로 각 네트워크 api키를 가져오면 된다.

각 환경 변수는 optimism_goerli 네트워크를 기준으로 한다.

---

다 했으면 이제 네트워크에 배포를 진행한다.

npx truffle migration --network optimism-goerli

npx truffle migration --reset --network optimism-goerli

npx truffle console --network optimism-goerli

네트워크 아이디를 설정해주지 않으면 디폴트인 가나시로 배포를 하려고 하기 때문에 에러가 뜬다.

뒤에 --networkid 플래그를 붙여줘야 함.

ca :  0x4E76aBd01Df9f66E5a003b3A02f59261bEaaD5F7
block# :  746449
txHash : 0x3414a3f4de9637e58eb38c2cf460b92288d1fa14da0e46ee206c128a3e87937e
block exp : https://goerli-optimism.etherscan.io/

콘솔로 컨트랙트를 좀 뒤적이고 싶으면

DID.address
> ca 값 return

DID.deployed().then(instance => izone = instance)

izone.함수(파라미터)

를 순서대로 입력해보면 된다.

---

oauth_server도 마찬가지, 여기서 web3 라이브러리로 요청을 날려 블록체인과 직접 상호작용하므로

블록 체인 환경변수도 바꿔줘야 하고,

이메일 보내는 기능도 있으므로 이것도 바꿔준다.


이제 DID login, register에 대한 생각을 해보자.

1. register

user는 oauth에 가입을 했다고 전제하므로 우선 이 과정 crud중 c에 해당하는 과정에 관해 생각을 해보자.

어떤 정보가 db에 oauth 서버의 db에 저장되는지, 컨트랙트 내지는 블록체인에 어떤 정보들을 어떤 식으로 담을 것인지..

1-1 Create

회원 정보가 입력, 제출되면 이 회원 정보에는 id, pw가 포함된다.

(id+pw)를 hash화 한 것을 식별기호로 사용한다.

a) oauth server는 db에 이 hash값을 저장하고, 이를 이용해 컨트랙트에서 해당하는 사용자의 정보를 가져올 수 있다.
    (비밀 번호가 바뀌면 hash(id+pw)도 바뀌므로 이 때 컨트랙트에서도 맞춰서 바뀌어야 함 - 원래 hash(:string) - user(:User) 를 지우고 새로운 매핑을 만든다던가..)

id는 바뀔 일이 없지만 pw는 바뀔 수 있으므로, pw는 다른 정보들보다 좀 더 신경을 써줄 점이 있다.


b) 사용자가 oauth 서버에서 회원 가입을 완료하면 oauth의 백엔드에서는 블록체인 상에 이 정보를 넣는다.

- hash(id+pw) > User { name : '이승준', age:29, addr: '서울시 성북구', mobile:'01065313476', email :'619049@naver.com', gender : 'male'}

이런 hash와 회원 정보 객체를 연결하는 mapping-user 하나,

- hash(id+pw) > true

이런 hash가 등록되어있는지 여부를 t/f로 알려주는 mapping-isRegistered 하나

---

i) Create - Done!

이미 되어 있음.


`` 8/31

