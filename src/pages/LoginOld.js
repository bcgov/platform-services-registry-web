import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from "react-router-dom";
import { Box, Text, Flex } from "rebass";
import { Label, Checkbox } from "@rebass/forms";
import styled from "@emotion/styled";

export const StyledButton = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #fcba19;
  color: #003366;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-radius: 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
`;

const titleForAuthenticationState = (keycloak) => {
  if (keycloak.authenticated) {
    return "Logout";
  }

  return "Login";
};

const actionForCurrentState = (keycloak) => {
  if (keycloak.authenticated) {
    return () => keycloak.logout();
  }

  // TODO: update this once a better access control is in place
  // where we check if users are part of our GitHub organization
  return () => keycloak.login();
};

const Button = (props) => {
  const { keycloak } = useKeycloak();

  return (
    <StyledButton onClick={actionForCurrentState(keycloak)}>
      LOGIN
      {props.children}
    </StyledButton>
  );
};

Button.defaultProps = {
  children: null,
  onClick: () => {
    // this is intentional (required by Sonarcloud)
  }
};

const StyledExternalLink = styled.a`
  color: #003366;
  font-weight: 600;
  :visited: {
    color: #003366;
  }
`;

const StyledacknowledgeMessage = styled(Label)`
  ${({ active }) => active && ` color: red;`}
`;

const StyledList = styled.ul`
  margin-top: 10px;
  padding-left: 15px;
`;

const Login = () => {
  const { keycloak } = useKeycloak();
  const [isAttendedSession, SetIsAttendedSession] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  return (
    <Flex
      flexDirection="column"
      sx={{
        lineHeight: 2,
        maxHeight: 100,
        marginTop: 30,
        marginLeft: 50
      }}
    >
      <Box mb={3}>
        <Text as="h1" mb={3}>
          Welcome to B.C. Government's Platform as a Service(PaaS) Product Registry
        </Text>
      </Box>

      <Box mb={3}>
        <Text as="h1" mb={3}>
          Private Cloud OpenShift Platform and Public Cloud AWS
        </Text>
      </Box>

      <Box mb={3}>
        <Text as="h2" mb={2}>
          Make changes to an existing product
        </Text>
        <Text mb={2}>
          For existing application's hosted on OpenShift 4 Platform or B.C. Government landing zone in AWS. You can
          update/change all product details and request product resource quota
          increases and downgrades (including CPU/RAM/Storage.)
        </Text>
        <StyledButton onClick={() => keycloak.login()}>Login</StyledButton>
      </Box>
      <Box mb={3}>
        <Text as="h2" mb={2}>
          Register a new product
        </Text>
        <Text mb={2}>
          If you are a Product Owner for a new cloud-native application and are interested in hosting the application please review the available options below:{" "}
          <Text as="li">
          <StyledExternalLink
            rel="noopener noreferrer"
            href="https://developer.gov.bc.ca/topic/featured/Service-Overview-for-BC-Government-Private-Cloud-as-a-ServiceOpenshift-4-Platform"
            target="_blank"
          >
            Private cloud hosting
          </StyledExternalLink>
          </Text>

          <Text as="li">
          <StyledExternalLink
            rel="noopener noreferrer"
            href="https://digital.gov.bc.ca/cloud/services/public/intro/"
            target="_blank"
          >
            Public cloud hosting
          </StyledExternalLink>
          </Text>
        </Text>
      </Box>
      <Box mb={3}>
        <Text as="h3" mb={2}>
          Before you start:
        </Text>
        <Text mb={2}>
          
          This self-serve online tool is for teams who have attended an onboarding session with the platform team.
          <br></br>
          If you haven't attended an onboarding session, please contact:
          <br></br>

          

          <Text as="li">
            Private Cloud Platform Adminstrators <StyledExternalLink
            rel="noopener noreferrer"
            href="mailto:PlatformServicesTeam@gov.bc.ca "
            target="_blank"
          >
            PlatformServicesTeam@gov.bc.ca 
          </StyledExternalLink>
          {" "} to book an onboarding session for the OpenShift 4 Platform
          </Text>

          <Text as="li">
            Public Cloud Platform Adminstrators <StyledExternalLink
            rel="noopener noreferrer"
            href="mailto:Cloud.Pathfinder@gov.bc.ca "
            target="_blank"
          >
            Cloud.Pathfinder@gov.bc.ca 
          </StyledExternalLink>
          {" "} to book an onboarding session for the B.C. Government landing zone in AWS
          </Text>
            
        </Text>
       
        <StyledButton
          onClick={() => {
            if (isAttendedSession) {
              keycloak.login();
              return;
            }
            setShowWarningMessage(true);
          }}
        >
          REGISTER A NEW PRODUCT (log in with BC IDIR)
        </StyledButton>
        {showWarningMessage && (
          <Text as="p" color="red">
            Please confirm above checkbox before continuing.
          </Text>
        )}
      </Box>
      <Box mb={3}>
        <Text as="h3">What you will need</Text>
        <StyledList>
          <Text as="li">
            Fulfill the onboarding prerequisites
          </Text>
          <Text as="li">Have a valid IDIR account, which you'll use to access the registry</Text>
          <Text as="li">
            Provide an application name and description without using acronyms
          </Text>
          <Text as="li">
            Share contact details and IDIR information for the product owner and up to 2 technical leads
          </Text>
          <Text as="li">
            An idea of which common components you will use
          </Text>
          <Text as="li">
            Provide an estimate for your project's projected budget if using AWS
          </Text>
        </StyledList>
      </Box>
    </Flex>
  );
};

export default Login;
