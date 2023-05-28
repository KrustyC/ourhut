import { useState } from "react";
import Image from "next/image";
import { Publication } from "@/types/global";
import { Media } from "@/components/Media";
import { UpArrowIcon } from "@/components/icons/UpArrow";
import { ResourcesListDesktop } from "./ResourcesListDesktop";
import { ResourcesListMobile } from "./ResourcesListMobile";

interface PublicationPanelProps {
  publication: Publication;
  isInitialOpen: boolean;
}

export const PublicationPanel: React.FC<PublicationPanelProps> = ({
  publication,
  isInitialOpen,
}) => {
  const [isOpen, setIsOpen] = useState(isInitialOpen);

  const onToggle = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div
      id={publication._id}
      key={publication._id}
      className="flex flex-col w-full px-6 md:px-12 py-8 md:py-12 mt-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl md:text-4xl text-black font-bold">
          {publication.title}
        </h3>

        <span>
          <a className="text-black" href={`#${publication._id}`}>
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
              src={publication.image}
              alt={publication.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <Media lessThan="md">
            <ResourcesListMobile materials={publication.materials} />
          </Media>

          <Media greaterThanOrEqual="md">
            <ResourcesListDesktop materials={publication.materials} />
          </Media>
        </>
      ) : null}
    </div>
  );
};
