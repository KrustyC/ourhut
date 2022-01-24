import type { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";

const images = [];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Our Hut</title>
        <meta name="description" content="Website for the Charity Our Hut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>Our Hut</main>
    </div>
  );
};

export default Home;
