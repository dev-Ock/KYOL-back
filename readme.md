# KYOL팀 프로젝트

# 주제 : 슈팅게임 사이트

## 주제 선정 및 요구사항 분석 (10.06 ~ 07)

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

- validation 방식은 token

3. 게임 기능

- 게임 시작 전, gear 페이지
- gear 페이지 : 내가 보유한 우주선들 중에 하나 선택. 선택하면, 그 우주선에 해당하는 function 호출.
- gear 페이지 : 배경음악 있음
- 게임 실행
  (1) display 설정(사이즈, 배경이미지)
  (2) image rendering cycle(사용자 우주선, enemy, bullet, Meteor)
  (3) control(사용자 우주선, enemy, bullet) - fixed movement, reactive movement, hit box
  (4) background music, reactive sound effect
  (5) condition(score, gold, game leveling)
  (6) game over가 되면 restart 버튼 생성 (최종 score /지급 gold/ re-start)

4. 랭킹 기능

- top ranking, weekly ranking 게시
  (1) top ranking : Scoredata DB에서 점수 기반으로 상위 10명 점수 / 명예의 전당(1~3등) 별도 게시
  (2) weekly ranking : Scoredata DB에서 시간 기반(일주일)으로 상위 10명 점수
- 사용자들이 게임 끝날 때마다 랭킹 update

5. 상점 기능

- 우주선 쇼핑 리스트 게시 : 우주선 리스트(사진, 가격), 사용자의 현재 cash, 구매불가한 경우를 미리 filter.
- filter 1순위 : 이미 보유하고 있는가, 2순위 : 해당 우주선을 구매할 gold를 보유하고 있는가.
- 구매버튼 누르면 구매가 성사되면 '보유중'으로 표시. 서버에서는 차감된 gold로 DB update.
- 보유 우주선 리스트 update.

6. 마이페이지 기능

- 마이페이지 들어가기 전 password 검사 페이지
- 게시 항목 : 프로필, 회원탈퇴 버튼
- 프로필 : 사용자의 현재 우주선 img, nickname, 내가 구매한 우주선 list, nickname 수정 기능, password 수정 기능
- nickname 수정 시 unique 조건
- password 수정 시 new password 두 번 입력하고 일치하면 update 가능.
- 회원탈퇴 기능 : User model deletedAt, Spaceship model에서 삭제

7. 게시판 기능

- [Community Page]를 접속하면 전체 게시판이 뜸.
- 전체 게시판의 게시글들은 페이징으로 나누어져 있음.
- 게시판 컬럼에는 번호, 제목, 글쓴이, 등록일, 조회, 추천이 있음
- 페이징 번호 누르면 해당 페이지의 게시글들이 뜸
- 글쓰기 버튼 누르면 [글쓰기 Page]로 이동
- 게시판의 게시글의 제목을 누르면 해당 [게시글 보기 Page]로 이동
- 글쓰기 Page
  - 글 제목과 본문 내용을 입력하고 등록 버튼을 누르면 게시글 등록되고 [Community Page]로 이동
  - 취소 버튼을 누르면 [Community Page]으로 이동
- 게시글 보기 Page
  - 로그인 여부와 상관없이 글 제목, 작성자, 작성일, 본문 내용, 목록 버튼, 댓글창이 보임
  - 게시글, 댓글, 대댓글은 각각 해당 글을 작성한 사용자에게만 수정, 삭제 버튼이 보임
  - 게시글을 쓴 사용자라면 게시글의 수정, 삭제 버튼이 보임
  - 게시글의 수정 버튼을 누르면 [게시글 수정 Page]로 이동
  - 게시글의 삭제 버튼을 누르면 삭제 적용하고 [Community Page]로 이동
  - 목록 버튼을 누르면 [Community Page]로 이동
  - 댓글 등록창에 내용 입력하고 등록 버튼 누르면 댓글 적용하여 새로고침
  - 각 댓글에는 대댓글보기, 답글달기(대댓글 추가) 버튼이 보임
  - 대댓글보기 버튼을 누르면 대댓글들이 보임
  - 댓글의 답글달기 버튼을 누르면 대댓글 입력창이 뜸
  - 대댓글 입력창에 내용을 입력하고 확인 버튼을 누르면 대댓글 내용이 적용됨
  - 댓글이나 대댓글의 삭제 버튼을 누르면 삭제 확인 알림창이 뜸
  - 삭제 확인 알림창의 확인 버튼을 누르면 삭제가 적용됨
- 게시글 수정 Page
  - 글 제목이나 본문 내용을 수정하고 수정 버튼을 누르면 수정 사항을 적용하고 [Community Page]로 이동
  - 글 제목이나 본문 내용 중 아무것도 수정하지 않고 수정 버튼을 누르면 ‘수정하지 않았습니다’ 알림창이 뜸.
  - 취소 버튼 누르면 [Community Page]로 이동

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
- 게시판 관련 기능을 위한 데이터 모델링/API 설계 및 개발
  <br>
  <br>

< 추가 아이디어 >

- 카카오톡 로그인, 구글 로그인
- 공지사항, Q&A, 후기 게시판
- 게스트(로그인X)로 플레이하기(체험용)
- 게임에 기능 추가 (ex. 특정 stage부터 enemy의 공격도 가능하게)
- 랭킹 페이지에서 역대랭킹, 주간랭킹에 대한 reward
  <br>
  <br>

## 로그인, 회원가입 기능 (22.10.11~)

- package.json, config, models, passport, routes, app.js 만듬

## game, mypage GET 기능 구현 (22.10.12)

- routes/game.js 만듬
- routes/mypage.js 만듬

## 모든 url GET 기능 구현 (22.10.13)

- auth, game, mypage, ranking, shop GET 기능

## 게임, 상점 관련 기능 (22.10.14)

- PUT /game 기능 구현
- GET /ranking 기능 수정 (score와 user 관계커리가 안 되어 있었음)
- GET / shop 기능 수정

## shop purchase 기능 구현, ranking 기능 수정, login 코드 수정 (22.10.15)

- POST /shop/purchase 기능
- ranking 페이지는 로그인 안 한 사람도 볼 수 있도록 GET /ranking 에서 verifyToken 삭제
- POST /auth/login 코드를 효율적으로 변경
- 코드 낭비 줄이기

## Restful API, shipdata model (22.10.16)

- Restful API
- shipdata model 생성

## 회원가입, shop, game (22.10.17)

- 회원가입 3단계
- 회원가입시 User 모델
- GET /shop
- POST /game/update

## ranking 기능 수정 (22.10.18)

- ranking 기능 수정(탈퇴한 회원 기록도 포함)

## mypage 기능 수정 (22.10.19)

- mypage 들어가기 전 password 검사하는 페이지 생성
- mypage nickname 수정 기능, password 수정 기능을 수정

## 회원가입 기능 수정 및 전체 기능 점검 (22.10.20~24)

- nick 공백 불허로 공백 검사 코드 추가
- main 페이지
- game 페이지
- ranking 페이지
- mypage 페이지
- shop 페이지

## controllers (22.10.25~27)

- 각 routes에서 controllers로 세분화

## api-limiter 및 migration (22.11.01~02)

- api-limiter(premium / free)
- migration으로 DB 수정

## response modulation (22.11.03~05)

- response code 및 message 모듈화

## load test & unit test (22.11.10~13)

- load test
- verifyToken unit test
- join API unit test

## community 기능 추가 (22.11.23~12.23)

- community APIs

## 프로젝트 점검 및 마무리 (22.12.23)

- 전체 기능 점검 및 마무리
