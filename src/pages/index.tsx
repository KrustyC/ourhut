import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "src/components/Navbar";

const images = [];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Our Hut</title>
        <meta name="description" content="Website for the Charity Our Hut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        config={{
          burgerColor: "bg-primary",
          textColor: "text-black",
          logoColor: "bg-primary",
        }}
      />
      <div>Work in progress...</div>
    </div>
  );
};

export default Home;
