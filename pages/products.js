import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, handleModal } from "../redux/actions";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import Image from "next/image";
import Loader from "../components/loader";
import Modal from "./modal";
import {
  BASICAUTH,
  CARTPATH,
  CONTENTTYPE,
  PRODUCTPATH,
  URL,
} from "../common/api";
import { useEventListener, useScroll } from "../common/hooks";

const Products = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({ next: "", list: [] });

  const infiniteScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clinetHeight = document.documentElement.clientHeight;

    if (scrollTop + clinetHeight > scrollHeight - 100 && products.next !== null)
      setPage(page => page + 1);
  };

  useEventListener("scroll", infiniteScroll, []);

  const isModalOpen = useSelector(state => state?.modal);

  isModalOpen
    ? useScroll("hidden", [isModalOpen])
    : useScroll("unset", [isModalOpen]);

  const addCartList = async e => {
    const id = e.target.dataset.idx;
    const filterItem = products.list.filter(el => el.id == id);

    dispatch(handleModal(true));
    dispatch(addCart(filterItem));

    // try {
    //   await fetch(`${URL}${CARTPATH}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": CONTENTTYPE,
    //       Authorization: BASICAUTH,
    //     },
    //     body: JSON.stringify({
    //       pog: id,
    //       qty: 1,
    //     }),
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //       if (
    //         res.code === "cart_item_already_exeists" ||
    //         res.code === "cart_item_exception"
    //       ) {
    //         alert(res.detail);
    //       } else {
    //         // alert("장바구니에 추가되었습니다.");
    //       }
    //     });
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        await fetch("/data/product.json")
          .then(res => res.json())
          .then(res =>
            setProducts({
              ...products,
              ...{ next: res.next, list: [...products.list, ...res.results] },
            })
          );
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    if (products.next !== null) {
      getProduct();
    }
  }, [page]);

  if (loading) return <Loader />;
  else
    return (
      <ProductContainer>
        <ProductHeader>
          <ProductCount>상품 {products.list?.length}개</ProductCount>
          <ProductSorting>
            <select>
              {SORT.map((data, idx) => (
                <option key={idx}>{data}</option>
              ))}
            </select>
          </ProductSorting>
        </ProductHeader>
        <ProductsMain>
          {products.list?.map((product, idx) => (
            <ProductMain key={idx}>
              <ProductImage>
                {<Image src={product.image} width="132px" height="140px" />}
              </ProductImage>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>
                {Number(product.price).toLocaleString()}원
              </ProductPrice>
              <CartIcon onClick={addCartList}>
                <Image
                  data-idx={product.id}
                  alt="cart"
                  src="/image/cart.png"
                  width="28px"
                  height="28px"
                />
              </CartIcon>
            </ProductMain>
          ))}
        </ProductsMain>
        {isModalOpen && <Modal />}
      </ProductContainer>
    );
};

export default Products;

const SORT = ["신상품순", "인기상품순", "낮은상품순", "높은상품순"];

const ProductContainer = styled.section`
  min-width: 100vw;
`;

const ProductHeader = styled.header`
  display: flex;
  padding: 10px 20px;
`;

const ProductCount = styled.div`
  flex: 1;
  padding-top: 7px;
  font-size: 14px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: -0.3px;
  color: #141414;
`;
const ProductSorting = styled.div`
  position: relative;
  margin-left: auto;
  padding: 6px 24px 8px 0;
`;
const ProductsMain = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ProductMain = styled.div`
  position: relative;
  padding: 10px;
`;
const ProductName = styled.div`
  overflow: hidden;
  height: 20px;
  white-space: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.3px;
  color: #1d1e1f;
`;
const ProductPrice = styled.div`
  text-align: end;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.3px;
  color: #141414;
  text-decoration: none;
`;
const ProductImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;
const CartIcon = styled.div`
  position: absolute;
  right: 10%;
  bottom: 30%;
  border-radius: 50%;
  border: solid ${({ theme }) => theme.colors.main} 1px;
  background-color: white;
  padding: 1px;
`;
