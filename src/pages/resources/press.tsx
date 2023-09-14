import Head from "next/head";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { Media } from "@/components/Media";
import { NextPageWithLayout } from "@/types/app";
import { ResourceHeadLink } from "@/components/ResourceHeadLink";
import { Publication } from "@/types/global";
import { PublicationPanel } from "@/components/PublicationPanel";
import { usePreselectedResource } from "@/hooks/usePreselectedResource";
import { usePageviewTracking } from "@/hooks/usePageviewTracking";

interface PressPageProps {
  publications: Publication[];
}

const PressPage: NextPageWithLayout<PressPageProps> = ({ publications }) => {
  usePageviewTracking({ title: "Press" });
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
          rightHref="/resources"
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

const PUBLICATIONS_ORDER = [
  "650122503fe365991c3a7db9", // Inventive Vents
  "6223c9ceced81b628eaa1fb8", // Sublime Structure - Crystal Palace
  "646ef77006b8e19efde58c46", // C20 Society
  "6223c8a5ced81b628eaa1fb7", // Caravan
];

function sortPublications(publications: Publication[]) {
  return publications.sort((a, b) => {
    if (!a._id || !b._id) return 0;

    return (
      PUBLICATIONS_ORDER.indexOf(a._id) - PUBLICATIONS_ORDER.indexOf(b._id)
    );
  });
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/publications`
  );

  const { publications } = await res.json();

  return {
    props: {
      publications: sortPublications(publications),
    },
  };
}

PressPage.Layout = ResourcesLayout;

export default PressPage;
