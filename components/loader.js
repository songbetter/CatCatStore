import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <LoadingBox>
      {Array(3)
        .fill(0)
        .map((circle, index) => (
          <LoadingCircle key={index} circleIndex={index} />
        ))}
    </LoadingBox>
  );
};

export default Loader;

const bounce = keyframes`
    0%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;
const LoadingBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90px;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoadingCircle = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.main};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  animation: ${bounce} 1.5s infinite ease-in-out both;
  animation-delay: ${props =>
    props.circleIndex === 0
      ? "-0.30s"
      : props.circleIndex === 1
      ? "-0.15s"
      : "0s"};
`;
