import Head from "next/head";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { Media } from "@/components/Media";
import { NextPageWithLayout } from "@/types/app";
import { ResourceHeadLink } from "@/components/ResourceHeadLink";
import { Publication } from "@/types/global";
import { PublicationPanel } from "@/components/PublicationPanel";
import { usePreselectedResource } from "@/hooks/usePreselectedResource";

interface PressPageProps {
  publications: Publication[];
}

const PressPage: NextPageWithLayout<PressPageProps> = ({ publications }) => {
  const preselectedResourceId = usePreselectedResource();

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

      <div id="publications-list" className="flex flex-col">
        {publications.map((publication) => (
          <PublicationPanel
            key={publication._id}
            isInitialOpen={publication._id === preselectedResourceId}
            publication={publication}
          />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/publications`
  );

  const { publications } = await res.json();

  return {
    props: {
      publications,
      // publications: [],
    },
  };
}

PressPage.Layout = ResourcesLayout;

export default PressPage;
