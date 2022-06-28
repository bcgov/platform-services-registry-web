import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  z-index: 1000;
  background-color: #036;
  border-top: 2px solid #fcba19;
  color: #fff;
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  position: fixed;
  bottom: 0px;
  height: 46px;
  @media (max-width: 25%) {
    height: 55px;
  }
  width: 100%;
`;

export const Footer = () => {
    return  (
        <StyledFooter>
          **********  FOOTER CONTENT HERE  **********
        </StyledFooter>
    );
}


export default Footer;
