import type { NextPage } from "next";
import Head from "next/head";
import { Project } from "@/types/global";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Media } from "@/components/Media";
import { ProjectsListDesktop } from "@/components/Projects/ProjectsListDesktop";
import { ProjectsListMobile } from "@/components/Projects/ProjectsListMobile";

interface ProjectsPageProps {
  projects: Project[];
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  return (
    <div>
      <Head>
        <title>Projects | Our Hut</title>
        <meta name="description" content="Our Projects" />
      </Head>

      <div className="bg-white pb-8">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "fill-black",
            logoColor: "fill-primary",
          }}
        />

        <div className="flex flex-col px-8 md:pt-6 md:px-24 md:pb-8 xl:px-48">
          <h1 className="text-3xl md:text-6xl text-black font-semibold md:ml-[-4px]">
            Projects
          </h1>

          <div className="mt-4">
            <Media lessThan="md">
              <ProjectsListMobile projects={projects} />
            </Media>

            <Media greaterThanOrEqual="md">
              <ProjectsListDesktop projects={projects} />
            </Media>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/projects`);

  const { projects } = await res.json();

  return {
    props: { projects },
  };
}

export default ProjectsPage;
