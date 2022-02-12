import type { NextPage } from "next";
import Head from "next/head";
import { Product } from "@/types/global";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ProjectsPageProps {
  projects: Product[];
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projects }) => {
  console.log(projects);

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

        <div className="px-32">
          <h1 className="text-6xl text-black font-bold my-8">
            Our Hut Projects
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  //   const res = await fetch(`${process.env.baseUrl}/.netlify/functions/projects`);

  //   const { projects } = await res.json();

  return {
    props: { projects: [] },
  };
}

export default ProjectsPage;
