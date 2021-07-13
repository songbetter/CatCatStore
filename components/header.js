import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/actions";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { BASICAUTH, CARTPATH, CONTENTTYPE, URL } from "../common/api";

const HeaderContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCarts = async () => {
      try {
        await fetch(/*`${URL}${CARTPATH}` */ "data/cart.json", {
          headers: {
            "Content-Type": CONTENTTYPE,
            Authorization: BASICAUTH,
          },
        })
          .then(res => res.json())
          .then(res => dispatch(getCart(res.results)));
      } catch (e) {
        console.log(e);
      }
    };
    getCarts();
  }, []);

  const cartCount = useSelector(state => state?.cart.count);

  return (
    <Header>
      <Image alt="menu" src="/image/menu.png" width="20px" height="20px" />
      <Link href="/">
        <HeaderTitle>CATCAT STORE</HeaderTitle>
      </Link>
      <Link href="/cart">
        <CartImage>
          <Image alt="cart" src="/image/cart.png" width="28px" height="28px" />
          <CartCount>{cartCount}</CartCount>
        </CartImage>
      </Link>
    </Header>
  );
};

export default HeaderContainer;

const Header = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 100;
  top: 0;
  padding: 6px 20px;
  height: 52px;
  background: white;
  box-sizing: border-box;
`;

const HeaderTitle = styled.a`
  color: ${({ theme }) => theme.colors.main};
  padding: 11px 4px;
  font-weight: bold;
  font-size: 20px;
`;

const CartImage = styled.a`
  position: absolute;
  right: 0;
  margin-right: 10px;
`;

const CartCount = styled.div`
  position: absolute;
  z-index: 10;
  right: 1rem;
  top: 0;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  width: 1rem;
  text-align: center;
`;
