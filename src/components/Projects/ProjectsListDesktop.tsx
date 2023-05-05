import Link from "next/link";
import { Project } from "@/types/global";

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
          <a className="cursor-pointer h-[430px] w-full bg-red-100 relative">
            {project.thumbnailImage ? (
              <img
                className="absolute object-cover w-full h-full bg-black"
                src={project.thumbnailImage}
              />
            ) : (
              <div className="h-full w-full bg-gray-600" />
            )}
          </a>
        </Link>
      ))}
    </div>
  );
};
