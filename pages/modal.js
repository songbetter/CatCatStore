import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../redux/actions";
import styled from "styled-components";
import Button from "../components/button";
import CartPriceGraph from "../components/cartPriceGraph";

const Modal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state?.modal);

  return (
    <ModalContainer>
      <ModalBackground onClick={() => dispatch(handleModal(false))} />
      <ModalContents>
        <ModalHeader>장바구니에 담겼습니다.</ModalHeader>
        <CartPriceGraph modalOpened={isModalOpen} />
        <ModalButton
          onClick={e =>
            e.target.innerText === "장바구니 확인"
              ? router.push("/cart")
              : dispatch(handleModal(false))
          }
        >
          <Button color="white" title="계속 담기" />
          <Button title="장바구니 확인" />
        </ModalButton>
      </ModalContents>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const ModalContents = styled.div`
  width: 400px;
  height: 250px;
  margin: 0px 0.625rem;
  padding: 1.6875rem 1.125rem 1.25rem;
  background-color: white;
  z-index: 11;
`;

const ModalHeader = styled.header`
  font-weight: bold;
  line-height: 1.6375rem;
  letter-spacing: 0px;
  margin-bottom: 3.688rem;
  font-size: 1.125rem;
`;

const ModalButton = styled.div`
  margin-top: 3rem;
  display: flex;
`;
