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
          Welcome to BC Gov's Product Registry
        </Text>
      </Box>

      <Box mb={3}>
        <Text as="h1" mb={3}>
          Private Cloud OpenShift Platform & BC Gov's Landing Zone in AWS
        </Text>
      </Box>

      <Box mb={3}>
        <Text as="h2" mb={2}>
          Request a new project set or make changes to an existing product
        </Text>
        <Text mb={2}>
          You can request a new project set for hosting on the Private Cloud Openshift Platform or BC Gov's Landing Zone in AWS after logging
          in below. For existing applications's hosted on Private Cloud OpenShift Platform you can update/change all product details and request
          product resource quota increases and downgrades (including CPU/RAM/Storage). For existing applications hosted in the BC Gov's Landing Zone
          in AWS, you can update/change product details, change account coding, and set projected monthly budget for your product to receive spend alerts.
        </Text>
        <StyledButton onClick={() => keycloak.login()}>Login</StyledButton>
      </Box>
      
      <Box mb={2}>
        <Text as="h3">What you will need to request a new project set</Text>
        <StyledList>
          <Text as="li">
            A descriptive product name (no acronyms)
          </Text>
          <Text as="li">
            Contact details and IDIR accounts for the Product Owner and up to 2 Technical Leads
          </Text>
          <Text as="li">
            For Private Cloud OpenShift Platform - An idea of which common components you will use
            (refer to  <a href="https://digital.gov.bc.ca/common-components/" target="_blank" rel="noopener noreferrer">common components list</a>)
          </Text>
          <Text as="li">
            For BC Gov's Landing Zone in AWS an estimate for the product's projected monthly spend on cloud services (Refer to the 
            <a href="https://calculator.aws/#/" target="_blank" rel="noopener noreferrer">AWS Cost Calculator</a>) and an AWS Account Code (Refer to MOU).
          </Text>
        </StyledList>
      </Box>
      <Box>
        <Text as="h4">Note:</Text>
        <Text mb={2}>
          All new Product Teams requesting space on the Private Cloud OpenShift platform, book an onboarding meeting
          with the Platform Services team at <a href="mailto:PlatfomServicesTeam@gov.bc.ca">PlatfomServicesTeam@gov.bc.ca</a> before submitting the provisioning request.
        </Text>
        <Text mb={2}>
          All new Product Teams requesting space in the AWS Landing Zone complete the following 2 steps before submitting
          the provisioning request:
        </Text>
        <StyledList>
          <ol>
          <Text as="li">
            Sign a Memorandum of the Understanding (MoU) with OCIO.
            Request and MoU template from <a href="mailto:cloud.pathfinder@gov.bc.ca">cloud.pathfinder@gov.bc.ca</a>
          </Text>
          <Text as="li">
            Book an onboarding session with the Cloud Pathfinder Team at <a href="mailto:cloud.pathfinder@gov.bc.ca">cloud.pathfinder@gov.bc.ca</a>
          </Text>
          </ol>
        </StyledList>
        </Box>
    </Flex>
  );
};

export default Login;
