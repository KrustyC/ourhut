import Head from "next/head";
import { TeachingResource } from "@/types/global";
import { TeacherResourcePanel } from "@/components/TeacherResourcePanel";
import { Media } from "@/components/Media";
import { NextPageWithLayout } from "@/types/app";
import { ResourceHeadLink } from "@/components/ResourceHeadLink";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { usePreselectedResource } from "@/hooks/usePreselectedResource";
interface TeacherResourcesPageProps {
  teachingResources: TeachingResource[];
}

const TeacherResourcesPage: NextPageWithLayout<TeacherResourcesPageProps> = ({
  teachingResources,
}) => {
  const preselectedResourceId = usePreselectedResource();

  return (
    <>
      <Head>
        <title>Teacher Resources | Our Hut</title>
        <meta
          name="description"
          content="A comprehensive list of all our resources"
        />
      </Head>

      <Media lessThan="md">
        <ResourceHeadLink
          label="Teacher Resources"
          leftHref="/resources/research"
          rightHref="/resources/press"
        />
      </Media>

      <div id="teacher-resources-list" className="flex flex-col">
        {teachingResources.map((teachingResource) => (
          <TeacherResourcePanel
            key={teachingResource._id}
            isInitialOpen={teachingResource._id === preselectedResourceId}
            teachingResource={teachingResource}
          />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/teaching-resources`
  );

  const { teachingResources } = await res.json();

  return {
    props: {
      teachingResources,
    },
  };
}

TeacherResourcesPage.Layout = ResourcesLayout;

export default TeacherResourcesPage;
