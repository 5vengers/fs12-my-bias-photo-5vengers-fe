# :camera: 최애의 포토
# :superhero: 5VENGERS (오벤져스)
([5vengers 노션 링크](https://app.notion.com/p/Part_3-Project-5vengers_Dash-board-36cf7270cef78027b9b6c04840ff285f?source=copy_link))


# :astronaut: 팀원 구성
강정민 ([Github 링크](https://github.com/jeongmin00))

김나연 ([Github 링크](https://github.com/9g-g9))

김성현 ([Github 링크](https://github.com/Obebe-creator))

원세빈 ([Github 링크](https://github.com/sebikawa32))

이상윤 ([Github 링크](https://github.com/sensertive05))


# :rocket: 프로젝트 소개
최애의 포토카드를 다른 사람과 교환, 판매, 구매할 수 있는 활발한 거래 사이트 제작

프로젝트 기간: 2026.06.01 ~ 2026.06.24


# :gear: 기술 스택
Frontend: Next.js, React 19, Tailwind CSS v4, TanStack Query
Backend: Prisma ORM, Express.js, Zustand, Axios
Database: PostgreSQL
공통 Tool: Git & Github, Discord, Code Rabbit


# :wrench: 팀원별 구현 기능 상세
#### 강정민
- 인증인가 구현
  - 로그인 폼
    - JWT 기반 구글 소셜 로그인 구현
    - Token 처리
    - Validate 체크
  - 로그아웃
  - 회원가입 폼
    - Validate 체크
  - 전체적인 페이지의 Auth 관리 hook 및 Provider구현
- 알림 기능 구현
  - SSE 를 사용한 실시간 알림 시스템 및 UI 구현
  - 전체 읽음 처리를 추가하여 유연한 UX 구현 

#### 김나연
- 공통 컴포넌트
  - Button
  - Bedge
  - Card (합성 컴포넌트)
  - Chip
  - FormField
  - Header (초안 작성)
  - Input
  - Modal (합성 컴포넌트)
  - Pagination
  - Select (합성 컴포넌트)
  - Title
  - Toast
  - 결과 페이지
- 랜딩페이지
- 랜덤 포인트 UI
  - LocalStorage 내 값 저장으로 Timer 관리 
- 마이갤러리 페이지
  - 검색 및 필터링 포함
- 포토 카드 생성
  - file data 업로드
  - Validate 체크
- 나의 판매 포토카드 페이지
  - 검색 및 필터링 포함

#### 김성현
- 마켓플레이스 페이지
  - 판매 포토카드 상세 (구매자)
    - 포토카드 구매
    - 포토카드 교환 신청
    - form validate 체크
  - 판매 포토카드 상세 (판매자)
    - 판매 카드 수정
    - 판매 카드 판매 취소
    - form validate 체크

#### 원세빈
- 마켓플레이스 페이지
  - 검색 및 필터링 포함
  - 로그인 여부에 따른 기능 제한
  - 나의 포토카드 판매하기 모달
    - form validate 체크
  - 판매 포토카드 상세 (판매자)
    - 교환 제시 목록 조회
    - 교환 제시 목록 거절 및 승인

#### 이상윤
.


# :file_folder: 파일 구조
```
fs12-my-bias-photo-5vengers-fe
 ┣ public
 ┃ ┣ images
 ┃ ┃ ┣ ic-alarm-default.svg
 ┃ ┃ ┣ img-box1.png
 ┃ ┃ ┣ img-box2.png
 ┃ ┃ ┣ img-box3.png
 ┃ ┃ ┣ img-landing-0.webp
 ┃ ┃ ┣ img-landing-1.webp
 ┃ ┃ ┣ img-landing-2.webp
 ┃ ┃ ┣ img-landing-3.webp
 ┃ ┃ ┣ img-landing-4-1.webp
 ┃ ┃ ┣ img-landing-4-2.webp
 ┃ ┃ ┣ img-landing-4.webp
 ┃ ┃ ┣ img-landing-5.webp
 ┃ ┃ ┗ img-logo.webp
 ┃ ┣ file.svg
 ┃ ┣ globe.svg
 ┃ ┣ logo.svg
 ┃ ┣ next.svg
 ┃ ┣ placeholder.jpg
 ┃ ┣ vercel.svg
 ┃ ┗ window.svg
 ┣ src
 ┃ ┣ app
 ┃ ┃ ┣ (auth)
 ┃ ┃ ┃ ┣ auth
 ┃ ┃ ┃ ┃ ┗ callback
 ┃ ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┣ login
 ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┣ register
 ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┗ layout.jsx
 ┃ ┃ ┣ (main)
 ┃ ┃ ┃ ┣ (private)
 ┃ ┃ ┃ ┃ ┣ (myGallery)
 ┃ ┃ ┃ ┃ ┃ ┣ cardCreate
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ myGallery
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┃ ┃ ┗ mySales
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┃ ┣ market
 ┃ ┃ ┃ ┃ ┃ ┗ [itemId]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┃ ┣ result
 ┃ ┃ ┃ ┃ ┃ ┣ AuthResult.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ CardResult.jsx
 ┃ ┃ ┃ ┃ ┃ ┣ page.jsx
 ┃ ┃ ┃ ┃ ┃ ┗ result.config.js
 ┃ ┃ ┃ ┃ ┗ layout.jsx
 ┃ ┃ ┃ ┣ market
 ┃ ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┃ ┣ layout.jsx
 ┃ ┃ ┃ ┗ page.jsx
 ┃ ┃ ┣ fonts
 ┃ ┃ ┃ ┣ baskin_robbins_B.otf
 ┃ ┃ ┃ ┣ baskin_robbins_B.woff
 ┃ ┃ ┃ ┣ baskin_robbins_B.woff2
 ┃ ┃ ┃ ┣ baskin_robbins_R.otf
 ┃ ┃ ┃ ┣ baskin_robbins_R.woff
 ┃ ┃ ┃ ┗ baskin_robbins_R.woff2
 ┃ ┃ ┣ favicon.ico
 ┃ ┃ ┣ globals.css
 ┃ ┃ ┣ layout.jsx
 ┃ ┃ ┣ not-found.jsx
 ┃ ┃ ┣ providers.jsx
 ┃ ┃ ┗ reset.css
 ┃ ┣ assets
 ┃ ┃ ┣ icons
 ┃ ┃ ┃ ┣ ic-alarm-active.svg
 ┃ ┃ ┃ ┣ ic-alarm-default.svg
 ┃ ┃ ┃ ┣ ic-alert.svg
 ┃ ┃ ┃ ┣ ic-back.svg
 ┃ ┃ ┃ ┣ ic-close.svg
 ┃ ┃ ┃ ┣ ic-down.svg
 ┃ ┃ ┃ ┣ ic-exchange.svg
 ┃ ┃ ┃ ┣ ic-filter.svg
 ┃ ┃ ┃ ┣ ic-go.svg
 ┃ ┃ ┃ ┣ ic-google.svg
 ┃ ┃ ┃ ┣ ic-invisible.svg
 ┃ ┃ ┃ ┣ ic-left.svg
 ┃ ┃ ┃ ┣ ic-menu.svg
 ┃ ┃ ┃ ┣ ic-minus.svg
 ┃ ┃ ┃ ┣ ic-plus.svg
 ┃ ┃ ┃ ┣ ic-point.svg
 ┃ ┃ ┃ ┣ ic-profile.svg
 ┃ ┃ ┃ ┣ ic-right.svg
 ┃ ┃ ┃ ┣ ic-search.svg
 ┃ ┃ ┃ ┣ ic-up.svg
 ┃ ┃ ┃ ┗ ic-visible.svg
 ┃ ┃ ┗ images
 ┃ ┃ ┃ ┣ img-box1.png
 ┃ ┃ ┃ ┣ img-box2.png
 ┃ ┃ ┃ ┣ img-box3.png
 ┃ ┃ ┃ ┣ img-boxs-L.png
 ┃ ┃ ┃ ┣ img-boxs-M.png
 ┃ ┃ ┃ ┣ img-boxs-S.png
 ┃ ┃ ┃ ┣ img-image1.png
 ┃ ┃ ┃ ┣ img-image2.png
 ┃ ┃ ┃ ┣ img-image3.png
 ┃ ┃ ┃ ┣ img-logo.svg
 ┃ ┃ ┃ ┣ img-point-lg.png
 ┃ ┃ ┃ ┣ img-point-sm.png
 ┃ ┃ ┃ ┗ img-soldout.png
 ┃ ┣ components
 ┃ ┃ ┣ commons
 ┃ ┃ ┃ ┣ AuthGuard
 ┃ ┃ ┃ ┃ ┗ AuthGuard.jsx
 ┃ ┃ ┃ ┣ Badge
 ┃ ┃ ┃ ┃ ┣ Badge.jsx
 ┃ ┃ ┃ ┃ ┗ GradeText.jsx
 ┃ ┃ ┃ ┣ Button
 ┃ ┃ ┃ ┃ ┣ Button.jsx
 ┃ ┃ ┃ ┃ ┗ Button.module.css
 ┃ ┃ ┃ ┣ Card
 ┃ ┃ ┃ ┃ ┣ Card.jsx
 ┃ ┃ ┃ ┃ ┣ CardBtnLayout.jsx
 ┃ ┃ ┃ ┃ ┣ CardDescription.jsx
 ┃ ┃ ┃ ┃ ┣ CardGrade.jsx
 ┃ ┃ ┃ ┃ ┣ CardImage.jsx
 ┃ ┃ ┃ ┃ ┣ CardInfo.jsx
 ┃ ┃ ┃ ┃ ┣ CardInfoLayout.jsx
 ┃ ┃ ┃ ┃ ┣ CardMain.jsx
 ┃ ┃ ┃ ┃ ┣ CardSale.jsx
 ┃ ┃ ┃ ┃ ┣ CardSaleLayout.jsx
 ┃ ┃ ┃ ┃ ┗ CardTitle.jsx
 ┃ ┃ ┃ ┣ Chip
 ┃ ┃ ┃ ┃ ┗ Chip.jsx
 ┃ ┃ ┃ ┣ FormField
 ┃ ┃ ┃ ┃ ┗ FormField.jsx
 ┃ ┃ ┃ ┣ Header
 ┃ ┃ ┃ ┃ ┣ Header.jsx
 ┃ ┃ ┃ ┃ ┣ Header.module.css
 ┃ ┃ ┃ ┃ ┗ Profile.jsx
 ┃ ┃ ┃ ┣ Input
 ┃ ┃ ┃ ┃ ┣ Input.jsx
 ┃ ┃ ┃ ┃ ┣ PasswordInput.jsx
 ┃ ┃ ┃ ┃ ┣ Search.jsx
 ┃ ┃ ┃ ┃ ┗ Textarea.jsx
 ┃ ┃ ┃ ┣ Modal
 ┃ ┃ ┃ ┃ ┣ Modal.jsx
 ┃ ┃ ┃ ┃ ┣ Modal.module.css
 ┃ ┃ ┃ ┃ ┣ ModalClose.jsx
 ┃ ┃ ┃ ┃ ┣ ModalDescription.jsx
 ┃ ┃ ┃ ┃ ┣ ModalMain.jsx
 ┃ ┃ ┃ ┃ ┗ ModalTitle.jsx
 ┃ ┃ ┃ ┣ Notification
 ┃ ┃ ┃ ┃ ┣ NotificationBell.jsx
 ┃ ┃ ┃ ┃ ┣ NotificationDropdown.jsx
 ┃ ┃ ┃ ┃ ┣ NotificationItem.jsx
 ┃ ┃ ┃ ┃ ┗ SSEProvider.jsx
 ┃ ┃ ┃ ┣ Pagination
 ┃ ┃ ┃ ┃ ┣ DropDown.jsx
 ┃ ┃ ┃ ┃ ┗ Pagination.jsx
 ┃ ┃ ┃ ┣ Select
 ┃ ┃ ┃ ┃ ┣ Select.jsx
 ┃ ┃ ┃ ┃ ┣ SelectMain.jsx
 ┃ ┃ ┃ ┃ ┗ SelectOption.jsx
 ┃ ┃ ┃ ┣ Title
 ┃ ┃ ┃ ┃ ┣ Title.jsx
 ┃ ┃ ┃ ┃ ┗ Title.module.css
 ┃ ┃ ┃ ┣ Toast
 ┃ ┃ ┃ ┃ ┣ LoggedInToast.jsx
 ┃ ┃ ┃ ┃ ┗ Toast.jsx
 ┃ ┃ ┃ ┗ .gitkeep
 ┃ ┃ ┣ LoginPage
 ┃ ┃ ┃ ┗ LoginForm.jsx
 ┃ ┃ ┣ MainPage
 ┃ ┃ ┃ ┣ Sections
 ┃ ┃ ┃ ┃ ┣ FooterCTASection.jsx
 ┃ ┃ ┃ ┃ ┣ HeroSection.jsx
 ┃ ┃ ┃ ┃ ┣ NotificationSection.jsx
 ┃ ┃ ┃ ┃ ┣ PointSection.jsx
 ┃ ┃ ┃ ┃ ┗ RandomBoxSection.jsx
 ┃ ┃ ┃ ┣ MainPage.jsx
 ┃ ┃ ┃ ┗ MainPage.module.css
 ┃ ┃ ┣ MarketDetailPage
 ┃ ┃ ┃ ┣ BuyerMarketDetailPage.jsx
 ┃ ┃ ┃ ┣ ExchangeProposalCard.jsx
 ┃ ┃ ┃ ┣ ExchangeRequestModal.jsx
 ┃ ┃ ┃ ┣ MarketDetailPageClient.jsx
 ┃ ┃ ┃ ┣ MarketEditModal.jsx
 ┃ ┃ ┃ ┣ QuantityStepper.jsx
 ┃ ┃ ┃ ┗ SellerMarketDetailPage.jsx
 ┃ ┃ ┣ MarketPage
 ┃ ┃ ┃ ┣ MarketModal
 ┃ ┃ ┃ ┃ ┣ ExchangeInfoForm.jsx
 ┃ ┃ ┃ ┃ ┣ FormStep.jsx
 ┃ ┃ ┃ ┃ ┣ GalleryStep.jsx
 ┃ ┃ ┃ ┃ ┣ ModalSell.jsx
 ┃ ┃ ┃ ┃ ┣ PriceSection.jsx
 ┃ ┃ ┃ ┃ ┗ QuantitySection.jsx
 ┃ ┃ ┃ ┣ MarketCard.jsx
 ┃ ┃ ┃ ┣ MarketListPage.jsx
 ┃ ┃ ┃ ┗ MarketPageClient.jsx
 ┃ ┃ ┣ RegisterPage
 ┃ ┃ ┃ ┗ RegisterForm.jsx
 ┃ ┃ ┣ ResultPage
 ┃ ┃ ┃ ┗ ResultContent.jsx
 ┃ ┃ ┣ SurpriseModal
 ┃ ┃ ┃ ┗ SurpriseModal.jsx
 ┃ ┃ ┗ .gitkeep
 ┃ ┣ constants
 ┃ ┃ ┣ enums.js
 ┃ ┃ ┣ marketOptions.js
 ┃ ┃ ┗ notificationRoutes.js
 ┃ ┣ hooks
 ┃ ┃ ┣ queries
 ┃ ┃ ┃ ┗ useNotification.js
 ┃ ┃ ┣ useAuth.js
 ┃ ┃ ┣ useCreationLog.js
 ┃ ┃ ┣ useInfiniteScroll.js
 ┃ ┃ ┣ useMarket.js
 ┃ ┃ ┣ useMarketItems.js
 ┃ ┃ ┣ useMouseOut.js
 ┃ ┃ ┣ usePoint.js
 ┃ ┃ ┣ useSellForm.js
 ┃ ┃ ┣ useSSE.js
 ┃ ┃ ┣ useToast.js
 ┃ ┃ ┗ useValidation.js
 ┃ ┣ libs
 ┃ ┃ ┣ service
 ┃ ┃ ┃ ┣ authService.js
 ┃ ┃ ┃ ┣ marketService.js
 ┃ ┃ ┃ ┣ myGalleryService.js
 ┃ ┃ ┃ ┣ mySalesService.js
 ┃ ┃ ┃ ┣ notificationService.js
 ┃ ┃ ┃ ┗ pointService.js
 ┃ ┃ ┣ .gitkeep
 ┃ ┃ ┣ apiClient.js
 ┃ ┃ ┣ formValidate.js
 ┃ ┃ ┗ myGalleryUtils.js
 ┃ ┗ store
 ┃ ┃ ┣ authStore.js
 ┃ ┃ ┣ cardStore.js
 ┃ ┃ ┣ notificationStore.js
 ┃ ┃ ┗ supriseStore.js
 ┣ .coderabbit.yaml
 ┣ .env.local
 ┣ .gitignore
 ┣ .prettierignore
 ┣ .prettierrc
 ┣ build.sh
 ┣ eslint.config.mjs
 ┣ jsconfig.json
 ┣ next.config.mjs
 ┣ package-lock.json
 ┣ package.json
 ┣ postcss.config.mjs
 ┗ README.md
```


# :globe_with_meridians: 구현 홈페이지

5vengers 최애의 포토 사이트 :point_down:
https://fs12-my-bias-photo-5vengers-fe.vercel.app/


# :page_facing_up: 프로젝트 회고록

