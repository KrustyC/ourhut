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

        <div className="md:px-16 lg:px-32">
          {/* <h1 className="text-6xl text-black font-semibold my-8">Projects</h1> */}
          <h1 className="px-6 md:px-0 text-3xl md:text-6xl text-black font-bold my-2 mb-8 md:my-8">
            Projects
          </h1>
          <div>
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
