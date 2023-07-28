import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { RightArrowIcon } from "@/components/icons/RightArrow";
import { Navbar } from "@/components/Navbar";
import { Media } from "@/components/Media";
import { HomePageProjectsSlider } from "@/components/HomePageProjectsSlider";
import { PROJECTS } from "@/utils/constants";
import { usePageviewTracking } from "@/hooks/usePageviewTracking";

const Home: NextPage = () => {
  usePageviewTracking({ title: "Home" });

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
          <HomePageProjectsSlider projects={PROJECTS} />
        </div>

        <Media greaterThanOrEqual="md">
          <div className="absolute top-0 right-0 h-screen flex justify-center items-center w-96 z-1">
            <div className="mr-[-320px] flex text-sm text-white transform rotate-90 top-1/2">
              <Link href="/resources">
                <a className="group flex items-center text-white mr-8">
                  <RightArrowIcon className="group-hover:animate-slide fill-primary h-5 mr-2" />{" "}
                  Teacher &nbsp; Resources
                </a>
              </Link>

              <Link href="/contacts">
                <a className="group flex items-center text-white">
                  <RightArrowIcon className="group-hover:animate-slide fill-primary h-5 mr-2" />{" "}
                  Subscribe
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
