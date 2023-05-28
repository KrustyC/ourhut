import { useState } from "react";
import Image from "next/image";
import { Research } from "@/types/global";
import { Media } from "@/components/Media";
import { UpArrowIcon } from "@/components/icons/UpArrow";
import { ResourcesListDesktop } from "./ResourcesListDesktop";
import { ResourcesListMobile } from "./ResourcesListMobile";

interface ResearchPanelProps {
  research: Research;
  isInitialOpen: boolean;
}

export const ResearchPanel: React.FC<ResearchPanelProps> = ({
  research,
  isInitialOpen,
}) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);

  const onToggle = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div
      id={research._id}
      key={research._id}
      className="flex flex-col w-full px-6 md:px-12 py-8 md:py-12 mt-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl md:text-4xl text-black font-bold">
          {research.title}
        </h3>

        <span>
          <a className="text-black" href={`#${research._id}`}>
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
              src={research.image}
              alt={research.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Media lessThan="md">
            <ResourcesListMobile materials={research.materials} />
          </Media>

          <Media greaterThanOrEqual="md">
            <ResourcesListDesktop materials={research.materials} />
          </Media>
        </>
      ) : null}
    </div>
  );
};
