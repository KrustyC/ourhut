import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { Trustee } from "@/types/global";
import parse from "html-react-parser";
import Image from "next/image";
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

      <div className="bg-white pb-8 relative h-[707px]">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "text-black",
            logoColor: "bg-primary",
          }}
        />

        <div className="w-full flex absolute top-0 z-0">
          <div className="flex flex-col w-6/12 bg-white px-32 pt-32">
            <h1 className="text-6xl text-black font-bold">About Us</h1>
            <p className="text-xl text-black font-medium mt-8">
              <p>
                Our Hut is an architectural education charity based in Stockwell
                working in schools and local communities to deliver courses of
                architecture workshops.
              </p>
              <p className="mt-4">
                Our Hut was founded in 2004 by Lucy Lavers, Judy Ovens and
                Suzanna Prizeman, who bring together a combination of experience
                in architecture, design and education.
              </p>
            </p>
            <div className="flex mt-16">
              <NextLink href="/projects">
                <a className="btn btn-transparent-outlined font-bold w-40 text-black">
                  Projects
                </a>
              </NextLink>

              <NextLink href="/contacts">
                <a className="btn btn-transparent-outlined font-bold w-40 text-black ml-8">
                  Contact Us
                </a>
              </NextLink>
            </div>
          </div>

          <div className="flex flex-col w-6/12 h-[707px] relative">
            <Image
              priority
              className="w-full h-full"
              layout="fill"
              objectFit="cover"
              alt="Photo of Lucy, Suzanna and Judy"
              src="/images/about-us.jpg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-32 py-16 bg-white relative h-[700px] bg-black">
        <div className="w-screen top-0 left-0 right-0 bg-white">
          <Image
            layout="fill"
            objectFit="cover"
            alt="Kids attending a workshop"
            src="/images/architecture.jpg"
          />
        </div>

        <div className="bg-primary opacity-60 w-screen h-[700px] absolute top-0 left-0" />

        <div className="absolute flex flex-col right-0 top-0 w-5/12 h-full justify-center pr-32">
          <h1 className="text-6xl text-white font-semibold ml-[-4px]">
            What we do
          </h1>
          <div className="text-white font-semibold text-xl mt-4">
            <p>
              Our Hut{"'"}s aim is to equip future generations to get involved
              in shaping positive sustainable environments. We inspire and
              educate young people and local communities through programmes of
              interactive workshops about the built environment.
            </p>

            <p className="mt-8">
              We believe that knowledge and understanding of architecture and
              design are vital in developing children{"'"}s sense of
              responsibility in respecting, shaping and improving the built
              environment.
            </p>
          </div>

          <NextLink href="/projects">
            <a className="btn btn-transparent-outlined-white font-bold w-60 text-black mt-8">
              Educational Approach
            </a>
          </NextLink>
        </div>
      </div>

      <div className="flex flex-col px-32 py-16 bg-gray-100">
        <h1 className="text-6xl text-black font-bold ml-[-4px]">Trustees</h1>
        <div className="grid grid-cols-2 gap-x-32 gap-y-16 mt-4 px-32 mt-16">
          {trustees.map((trustee) => (
            <div key={trustee._id} className="flex flex-col items-start">
              <h3 className="text-black font-semibold text-3xl">
                {trustee.name}
              </h3>
              <div className="mt-4">{parse(trustee.description)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col px-32 py-16 bg-white">
        <h1 className="text-6xl text-black font-bold ml-[-4px]">
          Partners + Funders
        </h1>
        <div className="grid grid-cols-5 gap-x-4 gap-y-4 mt-4 px-16 mt-16">
          {partnerLogos.map((logoUrl, index) => (
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
