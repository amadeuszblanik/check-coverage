import Head from "next/head";
import CHeader from "../src/components/header";
import CForm from "../src/components/form";

export default function Home() {
  return (
    <>
      <Head>
        <title>Check mobile coverage by Blanik.me</title>
        <meta name="description" content="Created by Blanik.me" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CHeader />
      <CForm />
    </>
  );
}
