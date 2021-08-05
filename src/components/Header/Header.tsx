import React from "react";
import styled from "styled-components";
import { COLORS } from "../../config/variables";
import Container from "../Container";

const HeaderWrapper = styled.div`
  padding: 15px;
`;

const Logo = styled.h1`
  color: ${COLORS.primary};
  margin: 0;
  font-size: 20px;

  > span {
    color: ${COLORS.secondary};
    font-weight: normal;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Container>
        <Logo>
          Chuck Norris <span>Joke DB</span>
        </Logo>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
