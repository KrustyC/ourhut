/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";
import { ChevronLeftIcon } from "@/components/icons/ChevronLeft";
import { ChevronRightIcon } from "@/components/icons/ChevronRight";
import { Media } from "@/components/Media";
import { useThrottle } from "rooks";
import Link from "next/link";

type SliderProject = {
  name: string;
  description: string;
  src: string;
  blurSrc: string;
  href: string;
};

interface HomePageProjectsSliderProps {
  projects: SliderProject[];
}

export const HomePageProjectsSlider: React.FC<HomePageProjectsSliderProps> = ({
  projects,
}) => {
  const [currentIndex, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [setCurrentThrottled] = useThrottle(setCurrent, 500);
  const sliderRef = useRef<Slider | null>(null);

  const length = projects.length;

  useEffect(() => {
    sliderRef.current?.slickGoTo(currentIndex);

    const interval = setInterval(() => {
      const nextIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
      setCurrent(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, length]);

  const nextSlide = () => {
    const nextIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
    setCurrentThrottled(nextIndex);
  };

  const prevSlide = () => {
    const nextIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
    setCurrentThrottled(nextIndex);
  };

  const onTouchStart = (e: any) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart - touchEnd > 40) {
      nextSlide();
    }

    if (touchStart - touchEnd < -40) {
      prevSlide();
    }
  };

  if (!Array.isArray(projects) || projects.length <= 0) {
    return null;
  }

  const name = projects[currentIndex].name;
  const description = projects[currentIndex].description;
  const href = projects[currentIndex].href;

  return (
    <section className="relative h-screen flex justify-center items-center">
      <Slider
        className="h-screen w-screen absolute bottom-0 left-0"
        dots={false}
        arrows={false}
        infinite={true}
        fade={true}
        speed={800}
        slidesToShow={1}
        slidesToScroll={1}
        ref={sliderRef}
      >
        {projects.map((slide, index) => (
          <div key={index} className="h-screen w-screen relative">
            {/*
             * I am not sure why, but without this dot (which is not really visible in the screen)
             * prevent react-slick from creating a weird gap at the bottom of the screen
             **/}
            <span aria-hidden="true">.</span>
            <Image
              src={slide.src}
              alt={slide.description}
              placeholder="blur"
              blurDataURL={slide.blurSrc}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </Slider>

      <div
        id="slider-shadow"
        className="w-screen h-screen bg-transparent absolute top-0 left-0 z-1"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      <div className="h-24 md:px-16 absolute bottom-0 left-0 w-screen flex justify-between items-end pb-8 z-40">
        <Media lessThan="md">
          <span className="absolute bottom-2 left-2 text-[10px] text-white z-0">
            © Our Hut 2023
          </span>
        </Media>
        <Media greaterThanOrEqual="md">
          <span className="text-sm text-white z-0">© Our Hut 2023</span>
        </Media>

        <div className="flex flex-col justify-end w-full md:w-[600px] items-center z-50">
          <Link href={href}>
            <a className="text-white w-full flex flex-wrap justify-center items-center mb-2 z-40">
              <span className="font-semibold text-white">{name}</span>
              <span className="font-bold mx-2">-</span>
              <span className="font-normal mr-2">{description}</span>
            </a>
          </Link>

          <div className="flex justify-center items-center pb-24 md:pb-0">
            <ChevronLeftIcon
              className="h-5 w-5 fill-white cursor-pointer mr-2 z-40"
              onClick={prevSlide}
            />
            {projects.map((_, i) => (
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

        <Media greaterThanOrEqual="md">
          <div className="flex items-center z-50">
            <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
              <TwitterIcon className="hover:animate-wiggle h-6 w-6 fill-white mr-4" />
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="hover:animate-wiggle h-6 w-6 fill-white" />
            </a>
          </div>
        </Media>
      </div>
    </section>
  );
};
