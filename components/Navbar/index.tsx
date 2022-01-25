import { useState } from "react";
import NextLink from "next/link";
import { Transition } from "@tailwindui/react";
import { BurgerMenu } from "./BurgerMenu";

const LINKS = [
  { path: "/projects", label: "Projects" },
  { path: "/news", label: "News and Events" },
  { path: "/resources", label: "Resources" },
  { path: "/shop", label: "Shop" },
  { path: "/about-us", label: "About Us" },
  { path: "/schools", label: "Schools" },
  { path: "/contact-us", label: "Contact us" },
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
      <div className="w-screen h-24 flex bg-transparent justify-between items-center px-16">
        <div className="flex items-center">
          <div className={`h-3 w-3 mr-1 rounded-full ${logoColor}`} />
          <span className={`text-xl font-bold ${textColor}`}>Our Hut</span>
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
        <div className="absolute top-0 left-0 w-screen h-screen bg-black">
          <div className="w-screen h-24 flex justify-between items-center px-16">
            <div className="flex items-center">
              <div className="h-3 w-3 mr-1 rounded-full bg-primary" />
              <span className="text-xl font-bold text-white">Our Hut</span>
            </div>
            <BurgerMenu color="bg-primary" isOpen onClick={onToggle} />
          </div>

          <div className="flex flex-col ml-20 ">
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
        </div>
      </Transition>
    </>
  );
};
