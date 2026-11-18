import React from 'react';
import styled from 'styled-components';

import { fourthColor, mainColor } from "../../colors";

const Header = (): JSX.Element => {
  return (
    <Container>
      <AlignContainer>
        Fundy
      </AlignContainer>
    </Container>
  );
};

const AlignContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${mainColor};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: ${fourthColor};
  height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  padding: 40px;
  font-size: 24px;
  z-index: 2000;
`;

export default Header;
