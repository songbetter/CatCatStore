import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  deleteAllCart,
  updateCart,
  handleModal,
} from "../redux/actions/index";
import Button from "../components/button";
import Loader from "../components/loader";
import { BASICAUTH, CARTPATH, CONTENTTYPE, URL } from "../common/api";
import { useDebounce, useScroll } from "../common/hooks";

const Cart = () => {
  const dispatch = useDispatch();
  // const optionRef = useRef();
  const inputRef = useRef();
  const [cartItem, totalPrice, qty] = useSelector(state => [
    state?.cart,
    state?.cart.totalPrice,
    state?.cart.list.qty,
  ]);
  // const totalPrice = useSelector(state => state?.cart.totalPrice);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);

  useScroll("unset", []);

  useEffect(() => {
    dispatch(handleModal(false));
  }, []);

  const deleteCartItem = async e => {
    const id = e.target.dataset.idx;
    const filterItem = cartItem.list?.filter(
      el => Number(el.id) !== Number(id)
    );

    dispatch(deleteCart(filterItem));
    // try {
    //   await fetch(`${URL}${CARTPATH}/${id}`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": CONTENTTYPE,
    //       Authorization: BASICAUTH,
    //     },
    //   }).then(res =>
    //     res.detail ? alert(res.detail) : alert("장바구니에서 삭제되었습니다.")
    //   );
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   alert("장바구니에서 삭제되었습니다.");
    // }
  };

  const deleteAllCartItem = () => {
    dispatch(deleteAllCart());
    alert("장바구니에서 삭제되었습니다.");
  };

  const updateCartItem = async e => {
    // current를 찾지 못해..
    // const id = optionRef?.current?.dataset.idx;
    // const name = document.getElementById("quantity");
    // const select = name.options.selectedIndex;
    // const quantity = Number(name.options[select].value);
    const id = e.target.dataset.idx;
    const quantity = e.target.value;
    const filterItem = cartItem.list.filter(el => Number(el.id) !== Number(id));
    dispatch(updateCart(filterItem, quantity));

    try {
      setLoading(true);
      await fetch(`${URL}${CARTPATH}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": CONTENTTYPE,
          Authorization: BASICAUTH,
        },
        body: JSON.stringify({
          qty: quantity,
        }),
      });
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  };

  // useDebounce(inputRef.addEventListener("mouseup", updateCartItem), 400, [
  //   cartItem,
  // ]);

  if (loading) return <Loader />;
  else
    return (
      <CartContainer>
        <CartHeader>
          <SelectBox>
            <input type="checkbox" defaultChecked />
            전체선택
          </SelectBox>
          <DeleteBtn onClick={deleteAllCartItem}>선택삭제</DeleteBtn>
        </CartHeader>
        <ProductsMain>
          {cartItem.count ? (
            <>
              {cartItem.list.map(cart => (
                <CartMain key={cart.id}>
                  <CartMainHeader>
                    <SelectBox>
                      <input type="checkbox" defaultChecked />
                      <CartName>{cart.pog?.name}</CartName>
                    </SelectBox>
                    <DeleteBtn data-idx={cart.id} onClick={deleteCartItem}>
                      삭제
                    </DeleteBtn>
                  </CartMainHeader>
                  <SelectBox>
                    <ProductImage>
                      <Image
                        src={cart.pog?.image}
                        width="132px"
                        height="140px"
                      />
                    </ProductImage>
                    <FlexCol>
                      <ProductPrice>
                        {cart.pog?.price?.toLocaleString()}원
                      </ProductPrice>
                      <CartPoint>
                        최대{(cart.pog?.price * 0.1)?.toLocaleString()}원 적립
                        예정
                      </CartPoint>
                      <CountContainer>
                        <button onClick={() => setCount(count - 1)}>-</button>
                        {/*qty 변경하는 action을 추가하고, 변경한 qty를 updateCartItem에 넘겨줘서 PATCH*/}
                        <input
                          type="number"
                          ref={inputRef}
                          defaultValue="1"
                          data-idx={cart.id}
                          onChange={updateCartItem}
                        />
                        <button onClick={() => setCount(count + 1)}>+</button>
                        {/* <select
                          data-idx={cart.id}
                          onChange={updateCartItem}
                          defaultValue="1"
                          id="quantity"
                          ref={optionRef}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, idx) => (
                            <option selected value={data} key={idx}>
                              {data}
                            </option>
                          ))}
                        </select> */}
                      </CountContainer>
                    </FlexCol>
                  </SelectBox>
                </CartMain>
              ))}
              <CartTotal>
                <span>총 상품가격</span>
                <ProductPrice>{totalPrice.toLocaleString()}원</ProductPrice>
              </CartTotal>
              <CartTotal>
                <span>총 배송비</span>
                <ProductPrice>
                  {totalPrice < 30000 ? `3,000` : `0`}원
                </ProductPrice>
              </CartTotal>
              {totalPrice < 30000 && (
                <Free>
                  {Number(30000 - totalPrice).toLocaleString()}원 추가 시 배송비
                  무료
                </Free>
              )}
              <CartTotal total>
                <ProductPrice>합계</ProductPrice>
                <ProductPrice>
                  {totalPrice < 30000
                    ? (totalPrice + 3000).toLocaleString()
                    : totalPrice.toLocaleString()}
                  원
                </ProductPrice>
              </CartTotal>
            </>
          ) : (
            <EmptyCart>
              <Image
                src="https://images.unsplash.com/photo-1587896046517-d8154a1e633c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZW1wdHklMjBjYXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                height="215px"
                width="206px"
              />
              장바구니가 비었습니다.
            </EmptyCart>
          )}
        </ProductsMain>
        {cartItem.count ? (
          <Button title={`구매하기 (${cartItem.count})`} />
        ) : (
          <Link href="/">
            <a>
              <Button title="캣캣스토어 둘러보기" />
            </a>
          </Link>
        )}
      </CartContainer>
    );
};

export default Cart;

const CartContainer = styled.section`
  min-width: 100vw;
`;

const CartHeader = styled.header`
  height: 42px;
  padding: 0 20px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectBox = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteBtn = styled.div`
  width: 70px;
  color: ${({ theme }) => theme.colors.main};
  font-weight: bold;
`;
const ProductsMain = styled.div``;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  line-height: 2rem;
`;
const CartMainHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CartMain = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #dee1e3;
`;
const CartName = styled.div`
  overflow: hidden;
  padding: 0.2rem;
  font-size: 18px;
  line-height: 1.5rem;
  letter-spacing: -0.3px;
  color: #1d1e1f;
`;
const ProductPrice = styled.div`
  margin-top: 8px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;

const CartPoint = styled.div``;
const ProductImage = styled.div`
  border-radius: 6px;
  background-color: #f2f2f2;
  margin: 0.3rem;
`;
const CountContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  border: 1px solid #dee1e3;
  border-radius: 4px;
  width: 30%;
  input {
    width: 30%;
  }
`;
const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 161px);
`;
const Free = styled.div`
  text-align: end;
  margin: 0.5rem 1rem;
`;
const CartTotal = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: ${props => props.total && "1px solid #dee1e3"};
`;
