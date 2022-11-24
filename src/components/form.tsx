/* eslint-disable no-magic-numbers */
import React from "react";
import { Button, Container, Group, SegmentedControl } from "@mantine/core";
import styled from "styled-components";
import { useRouter } from "next/router";
import CDropdown from "./dropdown";

const StyledForm = styled.form`
  padding-top: 24px;
  text-align: center;
`;

const AVAILABLE_OS = ["iOS", "Android"];

const AVAILABLE_REGIONS = [
  { label: "Worldwide", value: "worldwide", short: "WW" },
  { label: "Africa", value: "africa", short: "AF" },
  { label: "Asia", value: "asia", short: "AS" },
  { label: "North America", value: "north-america", short: "NA" },
  { label: "Oceania", value: "oceania", short: "OC" },
  { label: "South America", value: "south-america", short: "SA" },
  { label: "Europe", value: "europe", short: "EU" },
  { label: "Poland", value: "poland", short: "PL" },
  { label: "Germany", value: "germany", short: "DE" },
  { label: "United Kingdom", value: "united-kingdom", short: "UK" },
  { label: "United States of America", value: "united-states-of-america", short: "US" },
];

const StyledFormControl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
`;

const CForm: React.FunctionComponent = () => {
  const router = useRouter();

  const [os, setOs] = React.useState(AVAILABLE_OS[0]);
  const [region, setRegion] = React.useState(AVAILABLE_REGIONS[0]);

  const handleSubmit = () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    void router.push(`/results?os=${os}&region=Poland&regionShort=pl&month=${month}&year=${year}`);
  };

  return (
    <StyledForm>
      <Container size={1400}>
        <StyledFormControl>
          <h4>Select os:</h4>
          <SegmentedControl radius="xl" size="md" data={AVAILABLE_OS} value={os} onChange={setOs} />
        </StyledFormControl>
        <StyledFormControl>
          <h4>Select os:</h4>
          <CDropdown data={AVAILABLE_REGIONS} value={region} onChange={setRegion} />
        </StyledFormControl>
        <Group position="center" mt="md">
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </Container>
    </StyledForm>
  );
};

export default CForm;
