import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/global";
import parse from "html-react-parser";

interface ProjectsListDesktopProps {
  projects: Project[];
}

export const ProjectsListDesktop: React.FC<ProjectsListDesktopProps> = ({
  projects,
}) => {
  return (
    <div className="project-grid mt-4">
      {projects.map((project) => (
        <Link key={project._id} href={`/projects/${project._id}`} passHref>
          <a className="cursor-pointer w-full h-[430px] w-full bg-red-100 relative group">
            {project.thumbnailImage ? (
              <Image
                layout="fill"
                objectFit="cover"
                alt={project.title}
                src={project.thumbnailImage}
              />
            ) : (
              <div className="h-full w-full bg-gray-600" />
            )}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 p-8">
              <div className="flex flex-col justify-end h-full text-white">
                <h3 className="bold text-3xl">{project.title}</h3>
                <span className="bold text-3xl leading-3 my-1">-</span>
                <span className="italic text-lg mb-4">{project.year}</span>
                <p className="line-clamp-4 italic">{parse(project.intro)}</p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
