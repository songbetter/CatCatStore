### 기술스택

- Redux 사용하여 State 관리
- Next.js, React와 Hooks, JSX 사용
- ES6 이상의 Javascript 사용
- styled-componentsm sass 사용
- UI라이브러리 미사용

## 페이지 구성

레이아웃은 퍼플스토어 웹페이지를 참고하여 웹뷰로 제작하였습니다.
실제 API를 호출하지 않고 목데이터 활용하였습니다.
리덕스 Reducer로 CRUD 로직을 구현하였습니다.

### 상품리스트

- 상단에 고정 된 헤더에는 장바구니 수량이 표시됩니다. (목데이터 default값: 5개)
- 상품리스트 상단에 조회하고 있는 상품의 수량을 표시합니다.
- get 요청으로 product 상품을 불러옵니다. 상품을 불러오는 동안 loader 컴포넌트로 로딩중임을 표시합니다.
- get 요청 실패 시 콘솔에 에러 메세지가 나타납니다.

### 장바구니 모달창

- 원하는 상품의 장바구니 버튼 클릭 시 장바구니 담기 모달창이 열리면서 장바구니에 상품이 추가됩니다.
- 모달창 진입 시 장바구니 총 금액에 맞는 섹션에 그래프가 그려지면서 할인율이 표시됩니다.
- 모달창이 open 되어있는 동안 스크롤이 발생하지 않습니다.
- "계속담기" 클릭 시, 모달창의 배경 클릭 시 상품리스트로 돌아가고, "장바구니 확인" 클릭 시 장바구니로 이동합니다.

### 장바구니

- 장바구니 페이지 진입 시 전체 상품이 선택되고, 선택삭제 버튼을 클릭하면 장바구니의 모든 상품이 삭제됩니다.
- 상품 추가/삭제/수량 변경 시 장바구니 수량이 및 가격이 바로 반영되어 나타납니다. (=> update 기능 수정중)
- 배송비가 30,000원 이하일 경우, 무료배송에 대한 안내와 배송비 3,000원이 표시됩니다.
- 장바구니에 상품이 있을 경우 하단 버튼에 장바구니 수량과 "구매하기" 버튼이 렌더됩니다.
- 장바구니가 비었을 경우 empty 이미지와 "캣캣스토어 둘러보기" 버튼이 렌더되고, 클릭 시 상품 리스트 페이지로 이동합니다.
