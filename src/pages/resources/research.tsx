import Head from "next/head";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { Media } from "@/components/Media";
import { NextPageWithLayout } from "@/types/app";
import { ResourceHeadLink } from "@/components/ResourceHeadLink";

interface ResearchPageProps {
  publications: unknown[];
}

const ResearchPage: NextPageWithLayout<ResearchPageProps> = ({
  publications,
}) => {
  console.log("publications", publications);
  return (
    <div>
      <Head>
        <title>Research & Publications | Our Hut</title>
        <meta
          name="description"
          content="A comprehensive list of all our publications"
        />
      </Head>

      <Media lessThan="md">
        <ResourceHeadLink
          label="Research"
          leftHref="/resources/press"
          rightHref="/resources"
        />
      </Media>

      <div className="bg-white py-8">THE RESEARCH</div>
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

ResearchPage.Layout = ResourcesLayout;

export default ResearchPage;
