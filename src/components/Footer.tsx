import Link from "next/link";
import { RightArrowIcon } from "@/components/icons/RightArrow";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";

const LINKS = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/contacts",
    label: "Contact Us",
  },
  {
    href: "/",
    label: "Volunteer Form",
  },
  {
    href: "/resources",
    label: "Teacher Resources",
  },
];

export const Footer: React.FC = () => {
  return (
    <div className="w-screen h-24 flex bg-transparent text-gray-400 justify-between items-center px-16">
      <div className="flex items-center">© Our Hut 2022</div>

      <div className="flex text-sm">
        {LINKS.map(({ href, label }, i) => (
          <Link key={i} href={href}>
            <a className="group flex items-center mr-8 text-gray-400">
              <RightArrowIcon className="group-hover:animate-slide fill-gray-400 h-4 h-4 mr-2" />{" "}
              {label}
            </a>
          </Link>
        ))}
        {/* <Link href="/privacy-policy">
          <a className="flex items-center mr-8 text-gray-400">
            <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Privacy
            Policy
          </a>
        </Link>
        <Link href="/contacts">
          <a className="flex items-center mr-8 text-gray-400">
            <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Contact Us
          </a>
        </Link>
        <span className="flex items-center mr-8">
          <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Volunteer
          Form
        </span>
        <span className="flex items-center mr-8">
          <RightArrowIcon className="fill-gray-400 h-4 h-4 mr-2" /> Teacher
          Resources
        </span> */}
      </div>

      <div className="flex items-center">
        <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="hover:animate-wiggle h-6 w-6 fill-gray-400 mr-4" />
        </a>
        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="hover:animate-wiggle h-6 w-6 fill-gray-400" />
        </a>
      </div>
    </div>
  );
};
