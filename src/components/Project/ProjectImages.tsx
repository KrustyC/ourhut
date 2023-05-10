import Image from "next/image";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
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
        <div className="mt-8">
          <ScrollMenu wrapperClassName="relative scroll-menu-wrapper">
            {images.map((image, i) => (
              <div key={i} className="relative w-[800px] h-[500px] mr-10">
                <Image src={image} layout="fill" objectFit="cover" />
              </div>
            ))}
          </ScrollMenu>
        </div>
      </Media>
    </>
  );
};
