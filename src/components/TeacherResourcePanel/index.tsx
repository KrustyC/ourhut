import { useState } from "react";
import Image from "next/image";
import { TeachingResource } from "@/types/global";
import { Media } from "@/components/Media";
import { UpArrowIcon } from "@/components/icons/UpArrow";
import { ResourcesListDesktop } from "./ResourcesListDesktop";
import { ResourcesListMobile } from "./ResourcesListMobile";

interface TeacherResourcePanelProps {
  teachingResource: TeachingResource;
  isInitialOpen: boolean;
}

export const TeacherResourcePanel: React.FC<TeacherResourcePanelProps> = ({
  teachingResource,
  isInitialOpen,
}) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);

  const onToggle = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div
      id={teachingResource._id}
      key={teachingResource._id}
      className="flex flex-col w-full px-6 md:px-12 py-8 md:py-12 mt-8"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-4xl text-black font-bold">
          {teachingResource.title}
        </h3>
        <span>
          <a className="text-black" href={`#${teachingResource._id}`}>
            <UpArrowIcon
              className={`h-8 w-8 cursor-pointer transition-all duration-500 fill-black ${
                !isOpen ? "rotate-180" : ""
              }`}
              onClick={onToggle}
            />
          </a>
        </span>
      </div>

      {isOpen ? (
        <>
          <div className="relative h-32 md:h-60 w-full mt-8 mb-8">
            <Image
              src={teachingResource.image}
              alt={teachingResource.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Media lessThan="md">
            <ResourcesListMobile materials={teachingResource.materials} />
          </Media>

          <Media greaterThanOrEqual="md">
            <ResourcesListDesktop materials={teachingResource.materials} />
          </Media>
        </>
      ) : null}
    </div>
  );
};
