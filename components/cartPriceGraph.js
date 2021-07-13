import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CartPriceGraph = () => {
  const isModalOpen = useSelector(state => state?.modal);
  const cartPrice = useSelector(state => state?.cart.totalPrice);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const graphPrice =
      cartPrice > 100000
        ? (cartPrice - 100000) * 0.00025 + 75
        : ((cartPrice + 50000) / 200000) * 100;
    graphPrice > 100 ? setTotalPrice(100) : setTotalPrice(graphPrice);
  }, [isModalOpen, cartPrice]);

  const discountPrice = () => {
    let needPrice;
    if (0 <= cartPrice && cartPrice < 50000)
      needPrice = { discount: 10, price: 50000 - cartPrice };
    if (50000 <= cartPrice && cartPrice < 100000)
      needPrice = { discount: 13, price: 100000 - cartPrice };
    if (100000 <= cartPrice && cartPrice < 200000)
      needPrice = { discount: 15, price: 200000 - cartPrice };
    if (cartPrice > 200000) needPrice = { discount: 15, price: 10000000000 };
    return needPrice;
  };

  const needPrice = useMemo(discountPrice, [cartPrice]);

  return (
    <ModalGraphBackground>
      <ModalGraphFull price={totalPrice} />
      <ModalBalloon
        first={needPrice.discount === 5}
        sec={needPrice.discount === 10}
        third={needPrice.discount === 13}
        fourth={needPrice.discount === 15}
      >
        {cartPrice >= 200000
          ? `${needPrice.discount}% 할인 달성!`
          : `${needPrice.price.toLocaleString()}원 추가시 ${
              needPrice.discount
            }% 할인`}
      </ModalBalloon>

      {DISCOUNT.map(data => (
        <React.Fragment key={data.id}>
          <ModalGraphPoint name={data.name} />
          <ModalDiscount name={data.name} active={cartPrice > data.count}>
            {data.discount}
          </ModalDiscount>
        </React.Fragment>
      ))}
    </ModalGraphBackground>
  );
};
export default CartPriceGraph;

const DISCOUNT = [
  { id: 1, name: "first", discount: "기본 5% ↓", count: 0 },
  { id: 2, name: "sec", discount: "5만원 10% ↓", count: 50000 },
  { id: 3, name: "third", discount: "10만원 13% ↓", count: 100000 },
  { id: 4, name: "fourth", discount: "20만원 15% ↓", count: 200000 },
];

const ModalGraphBackground = styled.div`
  position: relative;
  height: 0.5rem;
  border-radius: 0.4375rem;
  background-color: rgb(216, 216, 216);
`;

const ModalGraphFull = styled.div`
  position: relative;
  width: ${props => props.price}%;
  height: 100%;
  margin-bottom: 0.3rem;
  border-radius: 0.4375rem;
  background-image: linear-gradient(
    to right,
    rgb(242 242 242),
    rgb(127 131 135)
  );
  transition: 0.5s;
`;
const ModalGraphPoint = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: -0.1875rem;
  right: ${props =>
    props.name === "first"
      ? "75.2351%"
      : props.name === "sec"
      ? "50.1567%"
      : props.name === "third"
      ? "25.0784%"
      : props.name === "fourth" && "0%"};
  width: 0.875rem;
  height: 0.875rem;
  border: 0.125rem solid rgb(127 131 135);
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
`;
const ModalBalloon = styled.div`
  position: absolute;
  width: 25%;
  top: -2.5rem;
  right: ${props =>
    props.first
      ? "75.2351%"
      : props.sec
      ? "50.1567%"
      : props.third
      ? "25.0784%"
      : props.fourth && "0%"};
  border-radius: 0.78125rem;
  line-height: 0.6875rem;
  letter-spacing: -0.3px;
  font-size: 0.688rem;
  text-align: center;
  border: 0.0625rem solid rgb(127 131 135);
  padding: 0.2rem;
  background-color: white;
`;

const ModalDiscount = styled.span`
  position: absolute;
  right: ${props =>
    props.name === "first"
      ? "75.2351%"
      : props.name === "sec"
      ? "50.1567%"
      : props.name === "third"
      ? "25.0784%"
      : props.name === "fourth" && "0%"};
  line-height: 0.95625rem;
  letter-spacing: -0.27px;
  width: 4.6875rem;
  font-size: 0.675rem;
  text-align: right;
  color: ${props => (props.active ? "black" : "rgb(127, 131, 135)")};
`;
