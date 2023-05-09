import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { Trustee } from "@/types/global";
import parse from "html-react-parser";
import Image from "next/image";
import { Media } from "@/components/Media";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface AboutUsPageProps {
  trustees: Trustee[];
  partnerLogos: string[];
}

const AboutUsPage: NextPage<AboutUsPageProps> = ({
  trustees,
  partnerLogos,
}) => {
  return (
    <div>
      <Head>
        <title>AboutUs | Our Hut</title>
        <meta name="description" content="Checkout our latest AboutUs" />
      </Head>

      <div className="flex flex-col">
        <div className="relative md:h-[707px]">
          <Navbar
            config={{
              burgerColor: "bg-primary",
              textColor: "fill-black",
              logoColor: "fill-primary",
            }}
          />

          <div className="w-full pb-14 flex flex-col md:flex-row md:absolute md:top-0 z-0">
            <div className="flex md:w-7/12 lg:w-1/2 bg-white px-8 lg:px-16 2xl:px-32 md:pt-40">
              <div className="flex flex-col w-[620px]">
                <h1 className="text-3xl md:text-6xl text-black">About Us</h1>
                <p className="text-black mt-4 text-xl">
                  <p className="font-semibold">
                    Our Hut is an architectural education charity based in
                    Stockwell working in schools and local communities to
                    deliver courses of architecture workshops.
                  </p>
                  <p className="mt-4 font-semibold">
                    Our Hut was founded in 2004 by Lucy Lavers, Judy Ovens and
                    Suzanna Prizeman, who bring together a combination of
                    experience in architecture, design and education.
                  </p>
                </p>

                <div className="flex mt-8">
                  <NextLink href="/projects">
                    <a className="btn btn-transparent-outlined font-bold w-40 text-black">
                      Projects
                    </a>
                  </NextLink>

                  <NextLink href="/contacts">
                    <a className="btn btn-transparent-outlined font-bold w-40 text-black ml-4 md:ml-8">
                      Contact Us
                    </a>
                  </NextLink>
                </div>
              </div>
            </div>

            <Media
              className="flex flex-col h-[707px] mt-8 md:mt-0 md:w-5/12 lg:w-6/12 relative"
              greaterThanOrEqual="md"
            >
              <Image
                priority
                className="w-full h-full"
                layout="fill"
                objectFit="cover"
                alt="Photo of Lucy, Suzanna and Judy"
                src="/images/about-us.jpg"
              />
            </Media>
          </div>
        </div>

        <Media lessThan="md">
          <div className="h-[300px] relative">
            <Image
              priority
              className="w-full h-full"
              layout="fill"
              objectFit="cover"
              alt="Photo of Lucy, Suzanna and Judy"
              src="/images/about-us.jpg"
            />
          </div>
        </Media>

        <WhatWeDo />

        <div className="flex flex-col py-12 md:py-20 bg-gray-100 px-8 lg:px-40 xl:px-64">
          <h1 className="text-3xl md:text-6xl text-black font-bold">
            Trustees
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-32 gap-y-8 md:gap-y-16 mt-6 md:mt-16">
            {trustees.map((trustee) => (
              <div key={trustee._id} className="flex flex-col items-start">
                <h3 className="text-black font-bold text-xl md:text-3xl">
                  {trustee.name}
                </h3>
                <div className="mt-2 md:mt-4 text-md">
                  {parse(trustee.description)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mb-8 p-4 px-8 lg:px-40 xl:px-64 md:pb-10 md:pt-20 bg-white">
          <Media greaterThanOrEqual="md">
            <h1 className="text-6xl text-black font-bold">
              Partners + Funders
            </h1>
          </Media>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 mt-4 md:mt-16">
            {partnerLogos.map((logoUrl, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={logoUrl}
                alt="logo"
                width="100%"
                height="160px"
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

async function fetchTrustees(): Promise<{ trustees: Trustee[] }> {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/trustees`);
  return res.json();
}

async function fetchPartners(): Promise<{ partnerLogos: string[] }> {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/partners`);
  return res.json();
}

export async function getStaticProps() {
  const { trustees = [] } = await fetchTrustees();
  const { partnerLogos = [] } = await fetchPartners();

  return { props: { trustees, partnerLogos } };
}

export default AboutUsPage;
