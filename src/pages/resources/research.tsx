import Head from "next/head";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { Media } from "@/components/Media";
import { NextPageWithLayout } from "@/types/app";
import { ResourceHeadLink } from "@/components/ResourceHeadLink";
import { Research } from "@/types/global";
import { ResearchPanel } from "@/components/ResearchPanel";
import { usePreselectedResource } from "@/hooks/usePreselectedResource";

interface ResearchPageProps {
  researches: Research[];
}

const ResearchPage: NextPageWithLayout<ResearchPageProps> = ({
  researches,
}) => {
  const preselectedResourceId = usePreselectedResource();

  return (
    <div>
      <Head>
        <title>Research | Our Hut</title>
        <meta
          name="description"
          content="A comprehensive list of all our researches"
        />
      </Head>

      <Media lessThan="md">
        <ResourceHeadLink
          label="Research"
          leftHref="/resources/press"
          rightHref="/resources"
        />
      </Media>

      <div id="researches-list" className="flex flex-col">
        {researches.map((research) => (
          <ResearchPanel
            key={research._id}
            isInitialOpen={research._id === preselectedResourceId}
            research={research}
          />
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/researches`
  );

  const { researches } = await res.json();

  return {
    props: {
      researches,
    },
  };
}

ResearchPage.Layout = ResourcesLayout;

export default ResearchPage;
