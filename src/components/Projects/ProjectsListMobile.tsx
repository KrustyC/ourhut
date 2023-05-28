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
    <div className="flex flex-col gap-y-8 mt-10">
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

              <div className="flex flex-col justify-end w-full absolute bottom-0 left-0 text-white p-6 z-10 bg-black/70">
                <h3 className="mb-2 font-bold text-xl leading-6">
                  {project.title}
                </h3>
                <div className="text-sm line-clamp-3">
                  {parse(project.intro)}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};
