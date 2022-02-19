import Head from "next/head";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { Media } from "@/components/Media";
import { NextPageWithLayout } from "@/types/app";
import { ResourceHeadLink } from "@/components/ResourceHeadLink";

interface PressPageProps {
  publications: unknown[];
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

      <Media lessThan="md">
        <ResourceHeadLink
          label="Press & Publications"
          leftHref="/resources"
          rightHref="/resources/research"
        />
      </Media>

      <div className="bg-white py-8">THE PRESS</div>
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
