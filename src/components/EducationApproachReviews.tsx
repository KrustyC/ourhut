import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

const reviews = [
  {
    id: 1,
    text: "Simply wonderful - as a teacher I have really enjoyed every second of the project. Every child has been fully engaged. I would very happily work with Our Hut again.",
    reviewBy: "Neil Moorcroft, Herbert Morrison Primary School",
  },
  {
    id: 2,
    text: "The children from both year 3 and year 4 thoroughly enjoyed taking part in all aspects over the past few weeks and especially took great delight in the model making exercise. Thank you for all of your hard work and I look forward to the children exhibiting their work in the next few weeks.",
    reviewBy: "Daniel Bonfield, Notredame Primary School",
  },
  {
    id: 3,
    text: "We are really thrilled with the work that has been produced and we will proudly display it around the school. Hopefully we'll get a chance to mention the project [to Ofsted] over the next couple of days.",
    reviewBy: "Laura Ings, Plumcroft Primary School",
  },
];

export const EducationApproachReviews = () => {
  const [currentKey, setCurrentKey] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setCurrentKey(currentKey === reviews.length - 1 ? 0 : currentKey + 1);
      setTimeout(() => {
        setShow(true);
      }, 550);
    }, 7000);

    return () => clearInterval(interval);
  });

  return (
    <div className="bg-white w-screen px-8 lg:px-44 h-[500px] lg:h-[400px] flex items-center justify-center">
      {reviews.map((review, index) => (
        <Transition
          key={review.id}
          show={show && index === currentKey}
          enter="transition-opacity duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="flex flex-col gap-3 lg:gap-6 items-center justify-center"
        >
          <p className="font-light text-xl lg:text-3xl italic lg:text-center">
            “{review.text}”
          </p>
          <span className="font-semibold text-lg lg:text-xl">
            {review.reviewBy}
          </span>
        </Transition>
      ))}
    </div>
  );
};
