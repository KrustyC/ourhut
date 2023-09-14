import Head from "next/head";
import { TeachingResource } from "@/types/global";
import { TeacherResourcePanel } from "@/components/TeacherResourcePanel";
import { Media } from "@/components/Media";
import { NextPageWithLayout } from "@/types/app";
import { ResourceHeadLink } from "@/components/ResourceHeadLink";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";
import { usePreselectedResource } from "@/hooks/usePreselectedResource";
import { usePageviewTracking } from "@/hooks/usePageviewTracking";
interface TeacherResourcesPageProps {
  teachingResources: TeachingResource[];
}

const TeacherResourcesPage: NextPageWithLayout<TeacherResourcesPageProps> = ({
  teachingResources,
}) => {
  usePageviewTracking({ title: "Teacher Resources" });
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
          leftHref="/resources/press"
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

const RESOURCES_ORDER = [
  "64b0fafafa5dd9eee4154871", // Inventive Vents
  "6204347c6ff6ec49f63d2af1", // Peckham THI
  "647056ff569eedfd9109e408", // Sublime Structures - Crystal Palace Park | Session 01
  "6470585f569eedfd9109e409", // Sublime Structures - Crystal Palace Park | Session 02
  "64705972569eedfd9109e40a", // Sublime Structures - Crystal Palace Park | Session 03
  "64705d9f27d673fc0d843ae0", // Sublime Structures - Crystal Palace Park | Session 04
  "6454a859535faad5d175cec3", // Our Street
];

function sortTeachingResources(resources: TeachingResource[]) {
  return resources.sort((a, b) => {
    if (!a._id || !b._id) return 0;

    return RESOURCES_ORDER.indexOf(a._id) - RESOURCES_ORDER.indexOf(b._id);
  });
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/teaching-resources`
  );

  const { teachingResources } = await res.json();

  return {
    props: {
      teachingResources: sortTeachingResources(teachingResources),
    },
  };
}

TeacherResourcesPage.Layout = ResourcesLayout;

export default TeacherResourcesPage;
