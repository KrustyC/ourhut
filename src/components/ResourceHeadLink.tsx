import Link from "next/link";
import { RightArrowIcon } from "@/components/icons/RightArrow";
import { LeftArrowIcon } from "@/components/icons/LeftArrow";

interface ResourceHeadLinkProps {
  label: string;
  leftHref: string;
  rightHref: string;
}

export const ResourceHeadLink: React.FC<ResourceHeadLinkProps> = ({
  label,
  leftHref,
  rightHref,
}) => {
  return (
    <div className="w-full bg-black mt-8 h-16 flex justify-between items-center">
      <Link href={leftHref}>
        <a>
          <LeftArrowIcon className="fill-white h-8 ml-4" />
        </a>
      </Link>

      <span className="font-semibold text-white text-lg">{label}</span>

      <Link href={rightHref}>
        <a>
          <RightArrowIcon className="fill-white h-8 mr-4" />
        </a>
      </Link>
    </div>
  );
};
