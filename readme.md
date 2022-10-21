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

- 게임 시작 전, 내가 보유한 우주선들 중에 하나 선택. 선택하면, 그 우주선에 해당하는 function 호출.
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

7. 배경음악 기능

- main 페이지
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

## 회원가입 기능 수정 및 전체 기능 점검 (22.10.20~21)
- nick 공백 불허로 공백 검사 코드 추가
- main 페이지
- game 페이지
- ranking 페이지
- mypage 페이지
- shop 페이지
