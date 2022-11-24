import React from "react";
import { Container, Title } from "@mantine/core";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding-top: 24px;
  text-align: center;
`;

const CHeader: React.FunctionComponent = () => (
  <StyledHeader>
    <Container size={1400}>
      <Title>Check coverage for your next mobile application</Title>
    </Container>
  </StyledHeader>
);

export default CHeader;
