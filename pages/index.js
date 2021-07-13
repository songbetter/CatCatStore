import Head from "next/head";
import styled from "styled-components";
import Products from "./products";
import FooterContainer from "../components/footer";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>CatCatStore</title>
      </Head>
      <Products />
      <FooterContainer />
    </Container>
  );
}

const Container = styled.main`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
