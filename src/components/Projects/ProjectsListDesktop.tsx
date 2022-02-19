import Link from "next/link";
import { Project } from "@/types/global";

interface ProjectsListDesktopProps {
  projects: Project[];
}

export const ProjectsListDesktop: React.FC<ProjectsListDesktopProps> = ({
  projects,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      {projects.map((project) => (
        <Link key={project._id} href={`/projects/${project._id}`} passHref>
          <a className="cursor-pointer h-80 w-full h-72 bg-red-100 relative">
            <img
              className="absolute object-cover w-full h-full bg-black"
              src={project.images[0]}
            />
          </a>
        </Link>
      ))}
    </div>
  );
};
