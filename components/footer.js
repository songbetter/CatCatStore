import Link from "next/link";
import styled from "styled-components";

const FooterContainer = () => {
  return (
    <Footer>
      <FooterTitle>CATCAT STORE</FooterTitle>
      <FooterLinks>
        <FooterLink>
          {FOOTERLINKA.map((link, idx) => (
            <Link href="#" key={idx}>
              <a>
                <FooterLinkList>{link.title}</FooterLinkList>
              </a>
            </Link>
          ))}
        </FooterLink>
        <FooterLink>
          {FOOTERLINKA.map((link, idx) => (
            <Link href="#" key={idx}>
              <a>
                <FooterLinkList>{link.title}</FooterLinkList>
              </a>
            </Link>
          ))}
        </FooterLink>
      </FooterLinks>
    </Footer>
  );
};

export default FooterContainer;

const Footer = styled.footer`
  padding: 40px 20px 20px;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  width: 100vw;
`;

const FooterTitle = styled.div``;
const FooterLinks = styled.div``;
const FooterLink = styled.ul`
  font-size: 13px;
  list-style: none;
  float: left;
  width: 50%;
  margin-top: 32px;
  padding-bottom: 26px;
  border-bottom: 1px solid rgba(216, 216, 216, 0.2);
`;
const FooterLinkList = styled.li`
  margin-top: 10px;
`;

const FOOTERLINKA = [
  {
    title: "회사소개",
  },
  {
    title: "채용안내",
  },
  {
    title: "입점문의",
  },
  {
    title: "도매문의",
  },
];
