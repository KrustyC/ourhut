import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TeachingResource } from "@/types/global";
import { UpArrowIcon } from "@/components/icons/UpArrow";
import { TeacherResourcePanel } from "@/components/TeacherResourcePanel";
import { NextPageWithLayout } from "@/types/app";
import { ResourcesLayout } from "@/layouts/ResourcesLayout";

interface TeacherResourcesPageProps {
  teachingResources: TeachingResource[];
}

const TeacherResourcesPage: NextPageWithLayout<TeacherResourcesPageProps> = ({
  teachingResources,
}) => {
  const onScrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <>
      <Head>
        <title>Resources | Our Hut</title>
        <meta
          name="description"
          content="A comprehensive list of all our resources"
        />
      </Head>

      <div id="teacher-resources-list" className="flex flex-col">
        {teachingResources.map((teachingResource, i) => (
          <TeacherResourcePanel
            key={teachingResource._id}
            teachingResource={teachingResource}
          />
        ))}
      </div>
    </>
  );

  // return (
  //   <div>
  //     <Head>
  //       <title>Resources | Our Hut</title>
  //       <meta
  //         name="description"
  //         content="A comprehensive list of all our resources"
  //       />
  //     </Head>

  //     <div className="bg-white pb-8">
  //       <Navbar
  //         config={{
  //           burgerColor: "bg-primary",
  //           textColor: "text-black",
  //           logoColor: "bg-primary",
  //         }}
  //       />

  //       <div className="px-32">
  //         <h1 className="text-6xl text-black font-bold my-8">Resources</h1>

  //         <div id="teacher-resources-list" className="flex flex-col">
  //           {teachingResources.map((teachingResource, i) => (
  //             <TeacherResourcePanel
  //               key={teachingResource._id}
  //               teachingResource={teachingResource}
  //             />
  //           ))}
  //         </div>

  //         <div className="w-full flex justify-end">
  //           <span
  //             role="button"
  //             className="text-xl flex items-center"
  //             onClick={onScrollToTop}
  //           >
  //             Back to top{" "}
  //             <UpArrowIcon className="ml-2 h-6 w-6 cursor-pointer" />
  //           </span>
  //         </div>
  //       </div>
  //     </div>

  //     <Footer />
  //   </div>
  // );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/teaching-resources`
  );

  const { teachingResources } = await res.json();

  return {
    props: {
      teachingResources: [
        ...teachingResources,
        ...teachingResources,
        ...teachingResources,
        ...teachingResources,
      ],
    },
  };
}

TeacherResourcesPage.Layout = ResourcesLayout;

export default TeacherResourcesPage;
