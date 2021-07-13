import styled from "styled-components";

const Button = props => {
  return <ButtonContainer color={props.color}>{props.title}</ButtonContainer>;
};

export default Button;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
  align-items: center;
  font-weight: bold;
  line-height: 1.4rem;
  letter-spacing: -0.3px;
  width: 100%;
  height: 3.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: 0.0625rem solid ${({ theme }) => theme.colors.main};
  background-color: ${props =>
    props.color === "white" ? "white" : props.theme.colors.main};
  color: ${props =>
    props.color === "white" ? props.theme.colors.main : "white"};
`;
