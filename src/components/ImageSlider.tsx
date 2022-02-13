import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Transition } from "@tailwindui/react";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeft";
import { ChevronRightIcon } from "@/components/icons/ChevronRight";

type SliderImage = {
  name: string;
  description: string;
  src: string;
  blurSrc: string;
};

interface ImageSliderProps {
  images: SliderImage[];
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(currentIndex === length - 1 ? 0 : currentIndex + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, length]);

  const nextSlide = () => {
    setCurrent(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrent(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  const name = images[currentIndex].name;
  const description = images[currentIndex].description;

  // @TODO See if I can use Transition form Taiwlind

  return (
    <section className="relative h-screen flex justify-center items-center">
      <div className="h-screen bg-black w-screen relative bottom-0 left-0 w-screen">
        {images.map((slide, index) => {
          return (
            <Transition
              show={currentIndex === index}
              key={index}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Image
                src={slide.src}
                alt={slide.description}
                placeholder="blur"
                blurDataURL={slide.blurSrc}
                layout="fill"
                objectFit="cover"
              />
            </Transition>
          );
        })}
      </div>

      <div className="h-24 px-16 absolute bottom-0 left-0 w-screen flex justify-between items-end pb-8 z-40">
        <span className="text-sm text-white z-0">© Our Hut 2022</span>

        <div className="flex flex-col justify-end items-center z-50">
          <div className="text-white w-full flex justify-center items-center mb-2 z-40">
            <span className="font-semibold">{name}</span>
            <span className="font-bold mx-2">-</span>
            <span className="font-normal mr-2">{description}</span>
          </div>

          <div className="flex justify-center items-center">
            <ChevronLeftIcon
              className="h-5 w-5 fill-white cursor-pointer mr-2 z-40"
              onClick={prevSlide}
            />
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full z-50 mr-2 ${
                  i === currentIndex ? "bg-primary" : "bg-white"
                }`}
              />
            ))}
            <ChevronRightIcon
              className="h-5 w-5 fill-white cursor-pointer mr-1 z-50"
              onClick={nextSlide}
            />
          </div>
        </div>

        <div className="flex items-center z-50">
          <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="hover:animate-wiggle h-6 w-6 fill-white mr-4" />
          </a>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="hover:animate-wiggle h-6 w-6 fill-white" />
          </a>
        </div>
      </div>
    </section>
  );
};
