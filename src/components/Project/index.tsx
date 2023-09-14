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
    if (!(domNode instanceof Element)) {
      return;
    }

    if (domNode.name === "h2" && domNode.children[0]?.type === "text") {
      return (
        <h2 className="mt-10 mb-1 text-2xl">{domNode.children[0]?.data}</h2>
      );
    }

    if (domNode.name === "a" && domNode.attribs?.href?.endsWith(".mp3")) {
      return (
        <audio className="w-full" controls>
          <source src={domNode.attribs?.href} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      );
    }
  },
};

const A_SPACE_FOR_FLOWERS_ID = "642fc25cfd980252a1fd5965";
const SUBLIME_STRUCTURE_ID = "642fc08efd980252a1fd5960";

interface TitleCopyProps {
  projectId?: string;
  title: string;
}
// This is a bit of an ugly customization, but hoepfully i's easier than handling the title as HTML for the moment
const TitleCopy: React.FC<TitleCopyProps> = ({ projectId, title }) => {
  if (projectId === A_SPACE_FOR_FLOWERS_ID) {
    return (
      <>
        A Space for flowers
        <br />
        The New Covent Garden Flower Market
      </>
    );
  }

  if (projectId === SUBLIME_STRUCTURE_ID) {
    return (
      <>
        Sublime Structures at
        <br />
        Crystal Palace
      </>
    );
  }

  return <>{title}</>;
};

export const Project: React.FC<ProjectPageProps> = ({ project }) => (
  <div className="lg:mt-8">
    <div>
      <h1 className="text-3xl md:text-5xl text-black font-semibold ml-8 md:ml-24 xl:ml-60 max-w-[840px]">
        <TitleCopy projectId={project._id} title={project.title} />
      </h1>
      <div className="text-xl text-black md:font-regular mt-2 px-8 md:px-24 xl:px-60 lg:w-10/12 xl:w-9/12 break-words">
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
          className="w-full md:w-11/12 lg:w-[720px]"
        >
          {parse(project.description, parsingOptions)}

          {/* <section className="w-full aspect-video mt-8 mb-8">
            <iframe
              className="w-full h-full"
              title={`https://youtube.com/embed/PRkhtRTUDdo`}
              src={`https://youtube.com/embed/PRkhtRTUDdo`}
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={false}
            />
          </section> */}
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
