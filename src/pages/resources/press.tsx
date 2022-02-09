import Head from "next/head";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { NextPageWithLayout } from "@/types/app";

interface PressPageProps {
  publications: any[];
}

const PressPage: NextPageWithLayout<PressPageProps> = ({ publications }) => {
  console.log("publications", publications);
  return (
    <div>
      <Head>
        <title>Press & Publications | Our Hut</title>
        <meta
          name="description"
          content="A comprehensive list of all our publications"
        />
      </Head>

      <div className="bg-white pb-8">THE PRESS</div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/teaching-resources`
  );

  const { teachingResources } = await res.json();

  return {
    props: {
      publications: [
        ...teachingResources,
        ...teachingResources,
        ...teachingResources,
        ...teachingResources,
      ],
    },
  };
}

PressPage.Layout = ResourcesLayout;

export default PressPage;
