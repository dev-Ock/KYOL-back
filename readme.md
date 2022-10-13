# KYOL팀 프로젝트

# 주제 : 슈팅게임 사이트

## 주제 선정 및 요구사항 분석

22.10.06 ~ 07
<br>
<br>

### [요구사항 리스트]

1. 사용자 회원가입 및 로그인 기능
2. 게임 기능
3. 랭킹 기능
4. 상점 기능
5. 마이페이지 기능
6. 배경음악 기능
   <br>
   <br>

### [요구사항 분석]

1. 회원가입 및 로그인 기능

- 사용자 회원가입 기능
- password는 특정 규칙을 부여하여 암호화.
- email, nickname은 unique 조건.

2. 사용자 로그인 기능

- 로그인, 회원가입은 passport.
- 로그인한 후 서비스들은 token.
- 로그인 성공 시, 로그인, 회원가입 버튼 자리에 프로필을 띄우기.

3. 게임 기능

- 게임 페이지로 이동 시, F11 자동 활성화로 웹 전체화면으로 바꾸기.
- 게임 시작 전, 내가 보유한 우주선들 중에 하나 선택. 선택하면, 그 우주선에 해당하는 function 호출.
- 게임 실행
  (1) display 설정(화면, 상태창)
  (2) image rendering(사용자 우주선, enemy, bullet)
  (3) control(사용자 우주선, enemy, bullet)
  (4) background_music
  (5) condition(score/stage/termination)
  (6) game over가 되면 ‘정산 팝업창’ 띄우기(최종 score/지급 cash/re-start, ranking button)

4. 랭킹 기능

- weekly ranking, historical ranking 게시
  (1) weekly ranking : score DB에서 점수 기반으로 상위 10명 점수 / 명예의 전당(1~3등) 별도 게시
  (2) historical ranking : score DB에서 시간 기반(일주일)으로 상위 10명 점수
- 사용자들이 게임 끝날 때마다 랭킹 update
- score DB에서 매주 한 번씩 data 업데이트 기능

5. 상점 기능

- 우주선 쇼핑 리스트 게시 : 우주선 리스트(사진, 가격), 사용자의 현재 cash, 선택한 우주선 img 뜰 수 있는 장바구니(가격 계산 포함)
- 구매하고 싶은 우주선을 선택하면, 게시판에 사용자의 cash와 우주선 가격 비교하여, 우주선 가격이 더 작거나 같으면, 구매버튼 활성화.
- 구매버튼 누르면 사용자 cash에서 우주선 가격 차감하고 남은 비용 가격 나옴. spacecraft DB와 user DB에 association 통하여 반영.

6. 마이페이지 기능

- 게시 항목 : 프로필, 회원정보수정란, 회원탈퇴 버튼
- 프로필 : 사용자의 현재 우주선 img /nickname, cash / 순위조회(100위 안에 없으면 순위 대신 ‘100위 안에 없습니다. 기다리고 있겠습니다.’ 글 보이게.) / 내가 구매한 우주선 list)
- 회원정보수정(password, nickname) : nickname은 unique 조건
- 회원탈퇴 기능 : deletedAt

7. 배경음악 기능

- main 페이지
- 상점 페이지
- 마이페이지
- (게임 관련 배경음악은 2번 참고)
  <br>
  <br>

### [작업 리스트]

1. 프론트엔드

- main 페이지 설계 및 개발
- 사용자 회원가입 페이지 설계 및 개발
- 게임 페이지 설계 및 개발
- 상점 페이지 설계 및 개발
- 마이페이지 설계 및 개발

2. 백엔드

- 사용자 관련 기능을 위한 데이터 모델링/API 설계 및 개발
- 게임 관련 기능을 위한 데이터 모델링/API 설계 및 개발
- score 관련 기능을 위한 데이터 모델링/API 설계 및 개발
- 상점, 구매 관련 기능을 위한 데이터 모델링/API 설계 및 개발
  <br>
  <br>

< 추가 아이디어 >

- 카카오톡 로그인, 구글 로그인
- 공지사항, Q&A 게시판
- 게스트(로그인X)로 플레이하기(체험용)
- 게임에 기능 추가 (ex. 특정 stage부터 enemy의 공격도 가능하게)
- 랭킹 페이지에서 역대랭킹, 주간랭킹에 대한 reward
  <br>
  <br>

## 로그인, 회원가입 기능 (22.10.11)

- package.json, config, models, passport, routes, app.js 만듬

## game, mypage GET 기능 구현 (22.10.12)

- routes/game.js 만듬
- routes/mypage.js 만듬

## 모든 url GET 기능 구현 (22.10.13)

- auth, game, mypage, ranking, shop
