import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/global";
import parse from "html-react-parser";

interface ProjectsListMobileProps {
  projects: Project[];
}

export const ProjectsListMobile: React.FC<ProjectsListMobileProps> = ({
  projects,
}) => {
  return (
    <div className="flex flex-col gap-y-8">
      {projects.map((project) => (
        <div key={project._id} className="h-[500px] relative">
          <Link href={`/projects/${project._id}`}>
            <a>
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

              <div className="flex flex-col justify-end w-full h-2/5 absolute bottom-0 left-0 text-white p-6 bg-transparent z-10">
                <div className="text-medium mb-4 font-bold">
                  {project.title}
                </div>
                <div className="text-sm line-clamp-4">
                  {parse(project.intro)}
                </div>
              </div>

              <div className="bg-black opacity-70 w-full h-2/5 absolute bottom-0 left-0 text-white p-6 z-1" />
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};
