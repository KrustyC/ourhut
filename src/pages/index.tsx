import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { RightArrowIcon } from "@/components/icons/RightArrow";
import { Navbar } from "@/components/Navbar";
import { Media } from "@/components/Media";
import { ImageSlider } from "@/components/ImageSlider";

const PROJECTS = [
  {
    name: "Inventive Vents",
    description: "Vent tour",
    src: "/images/inventive-vents.jpg",
    blurSrc: "/images/inventive-vents-blurred.jpg",
  },
  {
    name: "Sublime structures",
    description: "Crystal Palace model",
    src: "/images/cp-sublime-structures.jpg",
    blurSrc: "/images/cp-sublime-structures.jpg",
  },
  {
    name: "Brixton THI",
    description: "Artwork",
    src: "/images/brixton-thi.jpg",
    blurSrc: "/images/brixton-thi.jpg",
  },
  {
    name: "Peckham THI ?",
    description: "Workshop",
    src: "/images/peckham-thi.jpg",
    blurSrc: "/images/peckham-thi.jpg",
  },
  {
    name: "All Aboard",
    description: "Stockwell bus garage",
    src: "/images/stockwell.jpg",
    blurSrc: "/images/stockwell.jpg",
  },
];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Our Hut</title>
        <meta name="description" content="Website for the Charity Our Hut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="relative h-screen"
        style={{
          boxShadow: "inset 0 18px 62px 0 #000",
        }}
      >
        <Navbar
          includeSocialLinks
          config={{
            burgerColor: "bg-primary",
            textColor: "fill-white",
            logoColor: "fill-primary",
          }}
        />

        <div className="w-screen h-screen bg-white absolute top-0 left-0">
          <ImageSlider images={PROJECTS} />
          <div
            id="slider-shadow"
            className="w-screen h-screen bg-transparent absolute top-0 left-0 z-1"
            // style={{
            //   boxShadow: "inset 0px 0px 105px 38px #000000",
            // }}
          />
        </div>

        <Media greaterThanOrEqual="md">
          <div className="absolute top-0 right-0 h-screen flex justify-center items-center w-96 z-1">
            <div className="mr-[-320px] flex text-sm text-white transform rotate-90 top-1/2">
              <span className="group flex items-center mr-8">
                <RightArrowIcon className="group-hover:animate-slide fill-primary h-5 h-5 mr-2" />{" "}
                Volunteer &nbsp; Form
              </span>

              <Link href="/resources">
                <a className="group flex items-center text-white">
                  <RightArrowIcon className="group-hover:animate-slide fill-primary h-5 h-5 mr-2" />{" "}
                  Teacher &nbsp; Resources
                </a>
              </Link>
            </div>
          </div>
        </Media>
      </div>
    </div>
  );
};

export default Home;
