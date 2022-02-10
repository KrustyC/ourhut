import type { NextPage } from "next";
import Head from "next/head";
import { School } from "@/types/global";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface EducationalApproachPageProps {
  primarySchools: School[];
  secondarySchools: School[];
}

// @TODO Need to understand if necessary primary/secondary split

const EducationalApproachPage: NextPage<EducationalApproachPageProps> = ({
  primarySchools,
  secondarySchools,
}) => {
  return (
    <div>
      <Head>
        <title>Educational Approach | Our Hut</title>
        <meta
          name="description"
          content="Our approach to teaching architecture to young students"
        />
      </Head>

      <div className="bg-primary pb-16">
        <Navbar
          config={{
            burgerColor: "bg-white",
            textColor: "fill-white",
            logoColor: "fill-white",
          }}
        />

        <div className="pl-32 pr-16">
          <p className="text-6xl text-white font-bold ml-[-4px]">
            Educational Approach
          </p>
          <div className="flex mt-8">
            <p className="text-white font-medium w-1/2 pr-40">
              Laoreet viverra venenatis interdum nunc a. Pulvinar metus sagittis
              lorem odio non lorem odio non pharetra massa nullam id. Interdum
              vel, elementum ultrices id. Ornare tempus lorem odio non non enim
              nunc est, facilisis.
            </p>

            <p className="text-white font-medium w-1/2 pr-40">
              Laoreet viverra venenatis interdum nunc a. Pulvinar metus sagittis
              lorem odio non lorem odio non pharetra massa nullam id. Interdum
              vel, elementum ultrices id. Ornare tempus lorem odio non non enim
              nunc est, facilisis.
            </p>
          </div>
        </div>
      </div>

      <div id="educational-approach-parallax" className="h-[500px] w-screen" />

      <div className="flex flex-col px-32 py-16 bg-light-gray">
        <h1 className="text-black font-bold mb-8">
          Schools we have worked with
        </h1>
        <div className="flex flex-col mt-16 px-16">
          <div className="flex flex-col">
            <h3 className="font-bold text-black mb-8">Primary Schools</h3>
            <div className="grid grid-cols-2 gap-16">
              {primarySchools.map((school, i) => (
                <div key={i} className="flex font-semibold">
                  <span className="text-black mr-2">{school.name},</span>
                  <span className="text-gray-500 ">{school.geographicalArea}, {school.postcode}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-16">
            <h3 className="font-bold text-black mb-8">Secondary Schools</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-2">
              {secondarySchools.map((school, i) => (
                <div key={i} className="flex font-semibold">
                  <span className="text-black mr-2">{school.name},</span>
                  <span className="text-gray-500 ">{school.geographicalArea}, {school.postcode}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/schools`);
  const { primarySchools = [], secondarySchools = [] } = await res.json();

  return { props: { primarySchools, secondarySchools } };
}

export default EducationalApproachPage;
