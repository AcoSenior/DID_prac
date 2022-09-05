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

{
npx truffle migration --network optimism-goerli

    npx truffle migration --reset --network optimism-goerli

    npx truffle console --network optimism-goerli

}

네트워크 아이디를 설정해주지 않으면 디폴트인 가나시로 배포를 하려고 하기 때문에 에러가 뜬다.

뒤에 --networkid 플래그를 붙여줘야 함.

ca : 0x21Ce640c5d79Ea8A5113f5fB69279038B646E53d
block# : 1
txHash : 0xebbb5086e039c5eca6d4985f59490cd3b3b2d84d2a925dbbd3e55b5559d3422f
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

`` 8/31

뭐부터 할까..

oauth 서버의 기능은 크게 두 가지로 나뉜다.

1. 첫 번째는 사용자에 관련된 기능

id, pw를 이용해 로그인을 하고, 이 상태에서 자신의 개인 정보를 읽고 수정할 수 있어야 한다.

- 사실 연동 해지 기능도 좀 만들고 싶은데 이 메커니즘을 어떤식으로 해야 할 지 아직 모르겠음. oauth login을 한 후에 시도해보도록 하자.

2. 두 번째는 클라이언트 서버 관리자와 관련된 기능 (카카오 Develpoer 생각하면 됨)

oauth서버와 연동할 어플리케이션을 등록할 수 있어야 하고,

자신이 연동한 어플리케이션 목록을 볼 수 있어야 하고,

각 어플리케이션 페이지에서 rest api, client_secret 확인, 사용자에게 어떤 정보를 제공받을지 설정할 수 있어야 한다.

3. oauth 서버에서는 이에 관련한 정보를 db에 저장한다.

app - 사용자에게 어떤 정보를 받을지 : { appName, email(service owner), email(제공 여부 - 아마 거의 T로 받는게 좋겠지만), gender, mobile 등.. }

app - 어플리케이션 동작에 관한 정보 : { email(owner), appName, redirectURI, restAPI, client_secret }

user - 사용자 각각을 특정할 hash(id+pw)에 그 해시 주인의 각 사이트의 연동 여부 : { hashid(string), A(t/f), B(t/f), C(t/f), D(t/f) }

- 생각해보니까 이거 그냥 table 하나로 해도 될 것 같은데 왜 두개로 나눠놨을까..

- 사용자의 개인 정보는 db에 저장하지 않는다. 이는 사용자가 로그인 했을 경우 블록체인으로부터 가져와 일시적으로 저장하고, 이 후 메모리에서 날려버린다.

- 포인트에 관련된 기능은 어떡하지.. 그냥 이것도 oauth의 db에 일원화 시키는게 좀 더 좋아보이긴 하는데..

proposal - { hash(id+pw), A(t/f), Apoint(integer), B(t/f), BPoint(integer), ... }

---

회원 정보에 대한 crud먼저 생각을 해보자.

create 부터..

oauth에서 회원 가입을 해서 oauth 소유의 블록체인에 사용자의 정보를 넣어야 한다.

사용자의 정보 입력 > 회원 가입 > 백엔드로 전달 > 백엔드가 정보를 적당히 가공해 블록체인에 넣는다.

oauth server의 DB에는 사용자의 hash, 클라이언트서버 a,b,c,d에 대한 연동 여부가 t/f 로 저장된다.

사용자가 oauth 서버에 로컬로그인을 할 경우

i) 즉, id와 pw를 입력할 경우, 이를 해시화 한 값을 oauth 백엔드에 전달한다.

ii) 백엔드는 이 hash(id+pw)이 db에 있는지를 확인하고, 없으면 등록되지 않은 사용자라고 튕겨낸다.

iii) hash(id+pw)와 일치하는 데이터 셋이 존재한다면 블록체인에 접근, 해시값을 주고 대응하는 사용자의 정보를 가져온다.

> > 사용자가 마이 페이지 등의 페이지에 들어가 자신의 정보를 확인할 경우 이 블록체인에서 가져온 정보와 함께, a,b,c,d 사이트에 연동되었는지 여부를 보여주면 된다.

- 여기서 의문인건 사용자가 연동한 웹 사이트의 정보를 어떤 식으로 저장할 것인가, 이 경우엔 4개라고 가정을 했지만 실제로는 게속 늘어나잖아..

사용자가 연동된 웹사이트를 지속적으로 추가해 나간다면 이걸 어떤식으로 저장을 하는게 좋을까?

그걸 감안한다면 연동 여부 혹은 연동 웹 사이트에 대한 정보는 블록체인 상에 배열로 저장하고 매핑을 가져오는 것도 나쁘지 않을 것 같다.

hash(id+pw) => [ 연동 사이트1, 연동 사이트2, ... ] 이런 느낌?

연동을 끊으면 그냥 배열의 요소를 날려버리면 되나?

---

`` 9/1

다른 걸 하기 전에 우선 db 스키마를 다듬기로 했다.

우선 이걸 가오 있어보이게 해야 아마추어처럼 안 보이고 듣는 사람도 나머지 내용을 듣는다고 하더라..

외래키와 join을 시퀄라이즈에서 잘 이용하는 것을 목표로 가도록 해보자.

아 진짜 하기 싫다 ㅅㅂ ㅋㅋㅋ

외래키 같은건 어떻게 설정을 해야 하지..

우선 oauthdb에서 가장 핵심적인 테이블이 될 것 같은 (restAPI가 연관되는 곳이 많다.)

AppInfo table과 이 텡블과만 연결된 userInfo table을 먼저 만들고 관계를 지어줘보기로 함.

{
AppInfo : RestAPI, Appname, owner(email) column이 있다.

    UserInfo : email, hash 가 있다.

}

이 중 Appinfo에선 restAPI가 primarykey이고 다양한 테이블과 연결이 될거지만,

UserInfo는 owner column이 UserInfo의 email과 관계를 가진다.

userinfo(email) - appinfo(owner) 는 1:N읜 관계를 가진다.

관계는 시퀄라이즈에서 어떻게 설정을 해주냐?

우선 (N) 쪽인 AppInfo.js 는 다음과 같이 추가할 수 있다.

    Appinfo.associate = db => {
        Appinfo.belongsTo(db.UserInfo, { foreignKey : 'owner', targetKey: 'email'})
    }

AppInfo 테이블은 associate되어있다.

belongTo함수는 연결된 테이블과 1:N 관계이고, 내가 N임을 의미한다.

첫 번째 파라미터는 UserInfo 테이블인데, 걍 연관된 테이블을 의미함.

두 번째 파라미터는 객체가 들어가는데,

객체의 키를 보면 foreignKey는 외래 키 칼럼 (새로 만들어질)을,

targetKey는 연결된 테이블의 어떤 칼럼을 볼지..

반대로 1:N 관계에서 1인 UserInfo는 다음과 같이 associate를 추가하면 된다.

    UserInfo.associate = db => {
        UserInfo.hasMany(db.AppInfo, { foreignKey : 'AppOwner', sourceKey: 'owner'})
    }

const AppInfo = require('./AppInfo')(sequelize, DataTypes);
const UserInfo = require('./UserInfo')(sequelize, DataTypes);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.AppInfo = AppInfo;
db.UserInfo = UserInfo;

이렇게 적고 해봤는데 되는건지 모르겠다.

근데 이 associate를 꼭 써야하나?

걍 각각 테이블 만들 필요할때만 그냥 join문으로 하면 안되나..?

이 외래키라는걸 난 잘 모르겠음..

`` 9/5

우선 외래키는 보류하기로 합니다. 이거 없이 db를 만들고, 컨트랙트의 기능 (유저 정보 crud)가 잘 작동하는지 확인 후, oauth를 만져보면 될 것 같다.
