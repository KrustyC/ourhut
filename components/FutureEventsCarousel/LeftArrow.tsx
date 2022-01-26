import { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      disabled={isFirstItemVisible}
      className="absolute p-2 rounded-full bg-white top-1/2 left-8 bg-primary disabled:bg-gray-50 z-50"
      onClick={() => scrollPrev()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 fill-black ${
          isFirstItemVisible ? "opacity-50" : ""
        }`}
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};
