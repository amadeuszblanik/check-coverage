import Head from "next/head";
import { Container, Table } from "@mantine/core";
import parseCsv from "../src/utils/parse-csv";
import formatData, { DataCoverage } from "../src/utils/format-data";

export default function Results({ data }: { data: DataCoverage }) {
  return (
    <>
      <Head>
        <title>Check mobile coverage by Blanik.me</title>
        <meta name="description" content="Created by Blanik.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container size={1400}>
        <Table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Usage</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data)
              .sort(([_keyA, { version: sortA }], [_keyB, { version: sortB }]) => sortB - sortA)
              .map(([key, values]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{values.usage}%</td>
                  <td>{values.coverage}%</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: {
  query: { os: any; region: any; regionShort: string; month: any; year: any };
}) {
  try {
    const os = context.query.os.toLowerCase();
    const region = context.query.region;
    const regionShort = context.query.regionShort;
    const month = context.query.month;
    const year = context.query.year;

    const date = `${year}-${month}`;
    const dateInt = year + month;

    // https://gs.statcounter.com/ios-version-market-share/mobile-tablet/chart.php?device=Mobile%20%26%20Tablet&device_hidden=mobile%2Btablet&multi-device=true&statType_hidden=ios_version&region_hidden=eu&granularity=monthly&statType=iOS%20Version&region=Europe&fromInt=202110&toInt=202210&fromMonthYear=2021-10&toMonthYear=2022-10&csv=1
    // https://gs.statcounter.com/os-version-market-share/ios/mobile-tablet/chart.php?device=Mobile%20%26%20Tablet&device_hidden=mobile%2Btablet&multi-device=true&statType_hidden=ios_version&region_hidden=PL&granularity=monthly&statType=iOS%20Version&region=Poland&fromInt=202110&toInt=202210&fromMonthYear=2021-10&toMonthYear=2022-10&csv=1

    const url = new URL(
      `https://gs.statcounter.com/${os}-version-market-share/mobile-tablet/chart.php?device=Mobile%20%26%20Tablet&device_hidden=mobile%2Btablet&multi-device=true&statType_hidden=${os}_version&region_hidden=eu&granularity=monthly&statType=${os}%20Version&region=Europe&fromInt=202110&toInt=202210&fromMonthYear=2021-10&toMonthYear=2022-10&csv=1`,
    );

    url.searchParams.set("region_hidden", regionShort);
    url.searchParams.set("region", region);
    // url.searchParams.set("fromMonthYear", date);
    url.searchParams.set("toMonthYear", date);
    // url.searchParams.set("fromInt", dateInt);
    url.searchParams.set("toInt", dateInt);

    const res = await fetch(String(url));
    const dataRaw = await res.text();
    const data = formatData(parseCsv(dataRaw));

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}

// http://localhost:3001/results?os=ios&region=Europe&regionShort=eu&month=10&year=2022
