import { useState } from "react";
import NextLink from "next/link";
import { Transition } from "@headlessui/react";
import { OurHutLogoIcon } from "@/components/icons/OurHutLogo";
import { OurHutLogoTextIcon } from "@/components/icons/OurHutLogoText";
import { InstagramIcon } from "@/components/icons/Instagram";
import { Media } from "@/components/Media";
import { TwitterIcon } from "@/components/icons/Twitter";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";
import { BurgerMenu } from "./BurgerMenu";

const LINKS = [
  { path: "/projects", label: "Projects" },
  { path: "/news-and-events", label: "News and Events" },
  { path: "/resources", label: "Resources" },
  { path: "/shop", label: "Shop" },
  { path: "/about-us", label: "About Us" },
  { path: "/educational-approach", label: "Schools" },
  { path: "/contacts", label: "Contact Us" },
];

interface NavbarProps {
  config: {
    burgerColor?: string;
    logoColor?: string;
    textColor?: string;
    absolute?: boolean;
  };
  includeSocialLinks?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  config: {
    burgerColor = "bg-primary",
    logoColor = "fill-primary",
    textColor = "fill-black",
    absolute = false,
  },
  includeSocialLinks = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen((isCurrentlyOpen) => !isCurrentlyOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`${
          absolute ? "absolute" : ""
        } w-screen h-24 flex bg-transparent justify-between items-center px-6 md:px-16 z-50`}
      >
        <div className="flex items-center z-50">
          <NextLink href="/">
            <a className="flex items-center z-50">
              <OurHutLogoIcon
                className={`h-3 mt-1 md:h-4 md:w-4 ${logoColor}`}
              />
              <OurHutLogoTextIcon
                className={`h-6 w-24 ml-5 md:h-8 md:w-32 ${textColor}`}
              />
            </a>
          </NextLink>
        </div>

        <div className="flex items-center z-50">
          {includeSocialLinks ? (
            <Media lessThan="md">
              <div className="flex">
                <a
                  href={TWITTER_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterIcon className="h-6 w-6 fill-white mr-4" />
                </a>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="h-6 w-6 fill-white mr-4" />
                </a>
              </div>
            </Media>
          ) : null}

          <BurgerMenu color={burgerColor} isOpen={isOpen} onClick={onToggle} />
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50">
          <div className="w-screen h-24 flex justify-between items-center px-6 md:px-16">
            <NextLink href="/">
              <a className="flex items-center z-50 inline-block">
                <OurHutLogoIcon className="h-3 h-3 mt-1 md:h-4 md:w-4 fill-primary" />
                <OurHutLogoTextIcon className="h-6 w-24 ml-5 md:h-8 md:w-32 fill-white" />
              </a>
            </NextLink>
            <BurgerMenu color="bg-primary" isOpen onClick={onToggle} />
          </div>

          <div className="flex flex-col mx-8 md:mx-20 md:mt-4">
            <div className="flex flex-col items-start gap-4 lg:gap-6 2xl:gap-8">
              {LINKS.map(({ path, label }) => {
                return (
                  <NextLink href={path} key={path}>
                    <a
                      className="w-auto text-white font-bold tracking-wide text-2xl lg:text-4xl 2xl:text-6xl hover:text-primary"
                      onClick={onClose}
                    >
                      {label}
                    </a>
                  </NextLink>
                );
              })}
            </div>

            <div className="flex items-center mt-4 md:mt-8 z-50 gap-4 lg:gap-8">
              <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="hover:animate-wiggle h-6 w-6 lg:h-12 lg:w-12 fill-white" />
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="hover:animate-wiggle h-6 w-6 lg:h-12 lg:w-12 fill-white" />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
