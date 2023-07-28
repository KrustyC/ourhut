import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Project as IProject, Product } from "@/types/global";
import { ShopProductCard } from "@/components/ShopProductCard";

import { Footer } from "@/components/Footer";
import { Project } from "@/components/Project";
import { usePageviewTracking } from "@/hooks/usePageviewTracking";

interface ProjectPageProps {
  project: IProject;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const title = `${project.title} | Our Hut`;
  const description = project.intro.replace(/(<([^>]+)>)/gi, "");
  const image = project.thumbnailImage;

  usePageviewTracking({ title: `Project ${project.title}` });

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>

      <div className="w-full bg-white flex flex-col">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "fill-black",
            logoColor: "fill-primary",
          }}
        />

        <Project project={project} />

        {project.links.shop ? (
          <div className="bg-gray-100 min-h-[800px] pt-8 md:pt-16">
            <h1 className="mx-8 md:mx-16 xl:mx-auto xl:w-[1070px] text-3xl md:text-6xl text-black font-semibold">
              Our Hut Shop
            </h1>

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
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/projects`);
  const { projects } = (await res.json()) as { projects: IProject[] };

  const paths = projects.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/projects?id=${params.id}`
  );
  const { project } = (await res.json()) as { project: IProject };

  return { props: { project } };
}

export default ProjectPage;
