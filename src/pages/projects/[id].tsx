import Head from "next/head";
import Link from "next/link";
import parse from "html-react-parser";
import { Navbar } from "@/components/Navbar";
import { Project } from "@/types/global";
import { LeftArrowIcon } from "@/components/icons/LeftArrow";

import { Footer } from "@/components/Footer";

interface ProjectPageProps {
  project: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => (
  <div>
    <Head>
      <title>{project.title} | Our Hut</title>
      <meta name="description" content="Get in touch" />
    </Head>

    <div className="bg-white flex flex-col">
      <Navbar
        config={{
          burgerColor: "bg-primary",
          textColor: "fill-black",
          logoColor: "fill-primary",
        }}
      />

      <div className="px-60 mt-8">
        <h1 className="text-6xl text-black font-semibold">{project.title}</h1>
        <div className="text-xl text-black font-semibold mt-4">
          {parse(project.intro)}
        </div>
      </div>

      <div className="w-full h-[600px] bg-gray-200 mt-8" />

      <div className="w-full flex mt-12">
        <div className="w-1/4 flex justify-end">
          <Link href="/projects">
            <a className="flex text-black text-xl font-medium">
              <LeftArrowIcon className="fill-black h-5 h-5a mr-2 mt-1" /> Back
              to all
              <br /> Projects
            </a>
          </Link>
        </div>

        <div className="ml-5 w-3/4 flex flex-col">
          <div id="project-description" className="w-[820px]">
            {parse(project.description)}
          </div>
          <div className="flex mt-8 mb-16 mr-8">
            {project.links.teacherResources ? (
              <Link href={`/resources/#${project.links.teacherResources._id}`}>
                <a className={`btn btn-transparent-outlined mr-8 text-l`}>
                  Teacher Resources
                </a>
              </Link>
            ) : null}

            {project.links.press ? (
              <Link href={`/resources#${project.links.press._id}`}>
                <a className={`btn btn-transparent-outlined mr-8 text-l`}>
                  Press & Publications
                </a>
              </Link>
            ) : null}

            {project.links.research ? (
              <Link href={`/resources#${project.links.research._id}`}>
                <a className={`btn btn-transparent-outlined mr-8 text-l`}>
                  Research
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>
);

export async function getStaticPaths() {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/projects`);
  const { projects } = (await res.json()) as { projects: Project[] };

  const paths = projects.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/projects?id=${params.id}`
  );
  const { project } = (await res.json()) as { project: Project };

  return { props: { project } };
}

export default ProjectPage;
