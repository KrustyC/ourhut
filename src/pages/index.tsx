import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { RightArrowIcon } from "@/components/icons/RightArrow";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { Navbar } from "@/components/Navbar";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";

const PROJECTS = [
  {
    name: "Inventive Vents",
    description: "Vent tour",
    src: "/images/inventive-vents.jpg",
  },
  {
    name: "Sublime structures",
    description: "Crystal Palace model",
    src: "/images/cp-sublime-structures.jpg",
  },
  {
    name: "Brixton THI",
    description: "Artwork",
    src: "/images/brixton-thi.jpg",
  },
  {
    name: "Peckham THI ?",
    description: "Workshop",
    src: "/images/peckham-thi.jpg",
  },
  {
    name: "All Aboard",
    description: "Stockwell bus garage",
    src: "/images/stockwell.jpg",
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

      <div className="relative h-screen">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "text-white",
            logoColor: "bg-primary",
          }}
        />
        <div className="w-screen h-screen bg-black absolute top-0 left-0">
          Work in progress...
        </div>

        <div className="absolute right-0 mr-[-80px] flex text-sm text-white transform rotate-90 top-1/2">
          <span className="flex items-center mr-8">
            <RightArrowIcon className="fill-primary h-5 h-5 mr-2" /> Volunteer
            Form
          </span>

          <Link href="/teaching-resources">
            <a className="flex items-center text-white">
              <RightArrowIcon className="fill-primary h-5 h-5 mr-2" /> Teacher
              Resources
            </a>
          </Link>
        </div>

        <div className="w-screen h-24 absolute bottom-0 left-0 flex justify-between items-center px-16">
          <span className="text-sm text-white">
            © Our Hut 2022. All rights reserved
          </span>
          <div className="flex items-center">
            <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
              <TwitterIcon className="h-6 w-6 fill-white mr-4" />
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-6 w-6 fill-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
