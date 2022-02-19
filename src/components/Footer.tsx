import Link from "next/link";
import { Media } from "@/components/Media";
import { OurHutLogoIcon } from "@/components/icons/OurHutLogo";
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

interface FooterProps {
  logoColor?: string;
}

export const Footer: React.FC<FooterProps> = ({
  logoColor = "fill-primary",
}) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <div className="w-full h-24 flex bg-transparent text-gray-400 justify-between items-center px-16">
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
      </Media>

      <Media lessThan="md">
        <div className="flex flex-col">
          <div className="px-8 flex justify-between py-4">
            <div>
              <OurHutLogoIcon className={`h-8 w-8 ${logoColor}`} />
            </div>

            <div className="flex flex-col align-right">
              <div className="text-right">
                <div className="flex items-center justify-end">
                  <a
                    href={TWITTER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="hover:animate-wiggle h-6 w-6 fill-gray-400 mr-4" />
                  </a>
                  <a
                    href={INSTAGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="hover:animate-wiggle h-6 w-6 fill-gray-400" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col mt-2 items-end text-sm">
                {LINKS.map(({ href, label }, i) => (
                  <Link key={i} href={href}>
                    <a className="mt-2 text-gray-400">{label}</a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="px-8 text-xs text-gray-400 border-t-2 border-gray-200 py-4">
            © Our Hut 2022{" "}
          </div>
        </div>
      </Media>
    </>
  );
};
