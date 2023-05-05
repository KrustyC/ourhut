import Head from "next/head";
import Link from "next/link";
import parse from "html-react-parser";
import { Navbar } from "@/components/Navbar";
import { Media } from "@/components/Media";
import { Project, Product } from "@/types/global";
import { LeftArrowIcon } from "@/components/icons/LeftArrow";
import { ShopProductCard } from "@/components/ShopProductCard";
import { ProjectImages } from "@/components/ProjectImages";

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

    <div className="w-screen bg-white flex flex-col">
      <Navbar
        config={{
          burgerColor: "bg-primary",
          textColor: "fill-black",
          logoColor: "fill-primary",
        }}
      />

      <div className="lg:mt-8">
        <h1 className="text-3xl md:text-6xl text-black font-semibold ml-8 md:ml-24 xl:ml-60">
          {project.title}
        </h1>
        <div className="text-xl text-black font-semibold mt-4 px-8 md:px-24 xl:px-60 lg:w-10/12 xl:w-9/12">
          {parse(project.intro)}
        </div>
      </div>

      <ProjectImages images={project.images} />

      <div className="w-full flex mt-12">
        <div className="hidden md:flex md:w-1/5 lg:w-1/4 justify-end">
          <Link href="/projects">
            <a className="group flex text-black text-xl font-medium">
              <LeftArrowIcon className="group-hover:animate-slide fill-black h-5 h-5a mr-2 mt-1" />{" "}
              Back to all
              <br /> Projects
            </a>
          </Link>
        </div>

        <div className="mx-8 w-full md:w-4/5 lg:w-3/4 flex flex-col">
          <div
            id="project-description"
            className="font-medium md:w-11/12 lg:w-[820px]"
          >
            {parse(project.description)}
          </div>
          <div className="flex mt-8 mb-16">
            {project.links.teacherResources ? (
              <Link href={`/resources/#${project.links.teacherResources._id}`}>
                <a
                  className={`btn btn-transparent-outlined text-l w-full md:w-60 md:mr-8`}
                >
                  Teacher Resources
                </a>
              </Link>
            ) : null}

            {project.links.press ? (
              <Link href={`/resources/press#${project.links.press._id}`}>
                <a className="btn btn-transparent-outlined text-l w-full md:w-60 md:mr-8">
                  Press & Publications
                </a>
              </Link>
            ) : null}

            {project.links.research ? (
              <Link href={`/resources/research#${project.links.research._id}`}>
                <a className="btn btn-transparent-outlined text-l w-full md:w-60 md:mr-8">
                  Research
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {project.links.shop ? (
        <div className="bg-gray-100 min-h-[800px] pt-8 md:pt-16">
          <Media greaterThanOrEqual="md">
            <h1 className="md:mx-60 md:text-6xl text-black font-semibold">
              Our Hut Shop
            </h1>
          </Media>

          <ShopProductCard
            product={project.links.shop as Product}
            hasPriorityImage={false}
            includeLinkToShop
            bgColor="bg-gray-100"
          />

          <Footer />
        </div>
      ) : (
        <Footer />
      )}
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
