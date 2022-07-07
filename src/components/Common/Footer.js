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

const StyledUl = styled.ul`
  margin: 0;
  color: #fff;
  list-style: none;
  align-items: center;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
`;

const StyledLi = styled.li`
  border-right: 1px solid #4b5e7e;
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledLink = styled.a`
  font-size: 0.813em;
  font-weight: normal; /* 400 */
  color: #fff;
`;
export const Footer = () => {
    return  (
        <StyledFooter>
          <StyledUl>
      <StyledLi>
        <StyledLink href=".">Home</StyledLink>
      </StyledLi>
      <StyledLi>
        <StyledLink href="https://www2.gov.bc.ca/gov/content/home/disclaimer">
          Disclaimer
        </StyledLink>
      </StyledLi>
      <StyledLi>
        <StyledLink href="https://www2.gov.bc.ca/gov/content/home/privacy">Privacy</StyledLink>
      </StyledLi>
      <StyledLi>
        <StyledLink href="https://www2.gov.bc.ca/gov/content/home/accessibility">
          Accessibility
        </StyledLink>
      </StyledLi>
      <StyledLi>
        <StyledLink href="https://www2.gov.bc.ca/gov/content/home/copyright">Copyright</StyledLink>
      </StyledLi>
      <StyledLi>
        <StyledLink href="https://github.com/bcgov/platform-services-registry/issues">
          Contact Us
        </StyledLink>
      </StyledLi>
      {/* <StyledLi>
        <StyledLink target="_blank" rel="noreferrer" href={CREATE_COMMUNITY_ISSUE_URL}>
          Report a bug/Request a feature
        </StyledLink>
      </StyledLi> */}
    </StyledUl>
        </StyledFooter>
    );
}


export default Footer;
