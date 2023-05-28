import Link from "next/link";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import { Project as IProject } from "@/types/global";
import { LeftArrowIcon } from "@/components/icons/LeftArrow";
import { ProjectImages } from "./ProjectImages";

interface ProjectPageProps {
  project: IProject;
}

const parsingOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (
      domNode instanceof Element &&
      domNode.name === "a" &&
      domNode.attribs?.href?.endsWith(".mp3")
    ) {
      return (
        <audio className="w-full" controls>
          <source src={domNode.attribs?.href} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    }
  },
};

export const Project: React.FC<ProjectPageProps> = ({ project }) => (
  <div className="lg:mt-8">
    <div>
      <h1 className="text-3xl md:text-6xl text-black font-semibold ml-8 md:ml-24 xl:ml-60">
        {project.title}
      </h1>
      <div className="text-xl text-black md:font-semibold mt-2 px-8 md:px-24 xl:px-60 lg:w-10/12 xl:w-9/12 break-words">
        {parse(project.intro)}
      </div>
    </div>

    <ProjectImages images={project.images} />

    <div className="w-full flex mt-12">
      <div className="hidden md:flex md:w-1/5 lg:w-1/4 justify-end">
        <Link href="/projects">
          <a className="group flex text-black text-xl font-bold">
            <LeftArrowIcon className="group-hover:animate-slide fill-black h-5 h-5a mr-2 mt-1" />{" "}
            Back to all
            <br /> Projects
          </a>
        </Link>
      </div>

      <div className="mx-8 w-full md:w-4/5 lg:w-3/4 flex flex-col mb-8">
        <div
          id="project-description"
          className="font-medium w-full md:w-11/12 lg:w-[820px]"
        >
          {parse(project.description, parsingOptions)}
        </div>

        {(!!project.links.teacherResources ||
          !!project.links.press ||
          !!project.links.research) && (
          <div className="flex mb-16">
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
        )}
      </div>
    </div>
  </div>
);
