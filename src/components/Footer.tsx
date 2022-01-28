import { RightArrowIcon } from "src/components/icons/RightArrow";
import { InstagramIcon } from "src/components/icons/Instagram";
import { TwitterIcon } from "src/components/icons/Twitter";

export const Footer: React.FC = () => {
  return (
    <div className="w-screen h-24 flex bg-transparent text-gray-400 justify-between items-center px-16">
      <div className="flex items-center">© Our Hut 2022</div>

      <div className="flex text-sm">
        <span className="flex items-center mr-4">
          <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Cookie
          Policy
        </span>
        <span className="flex items-center mr-4">
          <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Contact Us
        </span>
        <span className="flex items-center mr-4">
          <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Volunteer
          Form
        </span>
        <span className="flex items-center mr-4">
          <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Teacher
          Resources
        </span>
      </div>

      <div className="flex items-center">
        <TwitterIcon className="h-6 w-6 fill-gray-400 mr-4" />
        <InstagramIcon className="h-6 w-6 fill-gray-400" />
      </div>
    </div>
  );
};
