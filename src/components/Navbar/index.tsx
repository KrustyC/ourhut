import { useState } from "react";
import NextLink from "next/link";
import { Transition } from "@tailwindui/react";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";
import { BurgerMenu } from "./BurgerMenu";

const LINKS = [
  { path: "/projects", label: "Projects" },
  { path: "/news", label: "News and Events" },
  { path: "/resources", label: "Resources" },
  { path: "/shop", label: "Shop" },
  { path: "/about-us", label: "About Us" },
  { path: "/schools", label: "Schools" },
  { path: "/contacts", label: "Contact us" },
];

interface NavbarProps {
  config: {
    burgerColor?: string;
    logoColor?: string;
    textColor?: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  config: {
    burgerColor = "bg-primary",
    logoColor = "bg-primary",
    textColor = "text-black",
  },
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
      <div className="w-screen h-24 flex bg-transparent justify-between items-center px-16 z-50">
        <div className="flex items-center  z-50">
          <NextLink href="/">
            <a className="flex items-center z-50">
              <div className={`h-3 w-3 mr-1 rounded-full ${logoColor}`} />
              <span className={`text-3xl font-semibold ${textColor}`}>
                Our Hut
              </span>
            </a>
          </NextLink>
        </div>

        <BurgerMenu color={burgerColor} isOpen={isOpen} onClick={onToggle} />
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
          <div className="w-screen h-24 flex justify-between items-center px-16">
            <NextLink href="/">
              <a className="flex items-center z-50">
                <div className="h-3 w-3 mr-1 rounded-full bg-primary" />
                <span className="text-3xl font-semibold text-white">
                  Our Hut
                </span>
              </a>
            </NextLink>
            <BurgerMenu color="bg-primary" isOpen onClick={onToggle} />
          </div>

          <div className="flex flex-col ml-20 mt-4">
            <div className="flex flex-col">
              {LINKS.map(({ path, label }) => {
                return (
                  <NextLink href={path} key={path}>
                    <a
                      className="w-auto text-white font-bold text-6xl mb-8 hover:text-primary"
                      onClick={onClose}
                    >
                      {label}
                    </a>
                  </NextLink>
                );
              })}
            </div>

            <div className="flex mt-8">
              <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="h-10 w-10 fill-white mr-4" />
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-10 w-10 fill-white" />
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};
