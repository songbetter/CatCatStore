# Overview

> 레이아웃은 퍼플스토어 웹페이지를 참고하여 웹뷰로 제작하였습니다.

- 기술스택: Redux, Next.js Javascript ES6+, Styled-Components
- 작업기간: 2021.06.12 ~ 2021.6.16
- TREE 구조

```js
├─common
├─components
├─pages
├─public
│ ├─data
│ └─image
├─redux
│ ├─actions
│ ├─reducers
│ └─store
└─styles
```

- 프로젝트 실행방법: 1) npm install 2) npm run dev 3) 개발자도구-모바일 모드

# 페이지 구성

<p align="center">
  <img src="https://user-images.githubusercontent.com/75013112/126886219-2c256c47-bc4f-443a-af36-5434cbe41186.gif">
</p>

## 상품리스트

<p align="center">
 <img src="https://user-images.githubusercontent.com/75013112/126886707-979628a9-f375-47e6-a00b-ddbb43daa90e.png">
</p>

- 상단에 고정 된 헤더에는 장바구니 수량이 표시됩니다. (목데이터 default값: 5개)
- 상품리스트 상단에 조회하고 있는 상품의 수량을 표시합니다.
- get 요청으로 product 상품을 불러옵니다. 상품을 불러오는 동안 loader 컴포넌트로 로딩중임을 표시합니다.
- get 요청 실패 시 콘솔에 에러 메세지가 나타납니다.

## 장바구니 모달창

<p align="center">
 <img src="https://user-images.githubusercontent.com/75013112/126886559-ff11b62c-05d8-4bb7-b310-1a7911ea2d8d.png">
</p>

- 원하는 상품의 장바구니 버튼 클릭 시 장바구니 담기 모달창이 열리면서 장바구니에 상품이 추가됩니다.
- 모달창 진입 시 장바구니 총 금액에 맞는 섹션에 그래프가 그려지면서 할인율이 표시됩니다.
- 모달창이 open 되어있는 동안 스크롤이 발생하지 않습니다.
- "계속담기" 클릭 시, 모달창의 배경 클릭 시 상품리스트로 돌아가고, "장바구니 확인" 클릭 시 장바구니로 이동합니다.

## 장바구니

<p align="center">
 <img src="https://user-images.githubusercontent.com/75013112/126886609-538377aa-526a-4f3d-92fb-394db78c5a6b.png">
</p>

- 장바구니 페이지 진입 시 전체 상품이 선택되고, 선택삭제 버튼을 클릭하면 장바구니의 모든 상품이 삭제됩니다.
- 상품 추가/삭제/수량 변경 시 장바구니 수량이 및 가격이 바로 반영되어 나타납니다. (=> update 기능 수정중)
- 배송비가 30,000원 이하일 경우, 무료배송에 대한 안내와 배송비 3,000원이 표시됩니다.
- 장바구니에 상품이 있을 경우 하단 버튼에 장바구니 수량과 "구매하기" 버튼이 렌더됩니다.
- 장바구니가 비었을 경우 empty 이미지와 "캣캣스토어 둘러보기" 버튼이 렌더되고, 클릭 시 상품 리스트 페이지로 이동합니다.

# Review

[블로그 바로가기](https://velog.io/@songbetter/CatCatStore-PurpleStore%EB%A5%BC-%EB%AA%A8%ED%8B%B0%EB%B8%8C%EB%A1%9C-%ED%95%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)
