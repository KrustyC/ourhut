import { useState } from "react";
import NextLink from "next/link";
import { Transition } from "@tailwindui/react";

type Link = {
  path: string;
  label: string;
};

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: VoidFunction;
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <>
      <div id="burger-menu" onClick={onClick}>
        <div className={isOpen ? "open" : ""} />
        <div className={isOpen ? "open" : ""} />
        <div className={isOpen ? "open" : ""} />
      </div>
    </>
  );
};
