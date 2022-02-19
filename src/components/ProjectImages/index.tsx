import Image from "next/image";
import { Media } from "@/components/Media";

interface ProjectImagesProps {
  images: string[];
}

export const ProjectImages: React.FC<ProjectImagesProps> = ({ images }) => {
  return (
    <>
      <Media lessThan="md">
        <div className="w-full h-[340px] md:h-[600px] bg-gray-200 mt-8 relative">
          <Image layout="fill" alt="vent" src={images[0]} />
        </div>
      </Media>

      <Media greaterThanOrEqual="md">
        <div className="w-full h-[340px] md:h-[600px] bg-gray-200 mt-8 relative" />
      </Media>
    </>
  );
};
