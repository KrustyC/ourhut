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

      <div className="bg-primary">
        <Navbar
          config={{
            burgerColor: "bg-white",
            textColor: "fill-white",
            logoColor: "fill-white",
          }}
        />

        <div className="px-8 md:pt-6 md:pl-24 md:pr-8 md:pb-8 xl:pl-48 lg:pr-16 lg:pb-8">
          <p className="text-2xl md:text-6xl text-white font-bold md:ml-[-4px]">
            Educational Approach
          </p>

          <div className="flex flex-col md:flex-row pt-2 pb-10 md:py-8">
            <p className="text-white font-medium w-full md:w-1/2 md:pr-40">
              Laoreet viverra venenatis interdum nunc a. Pulvinar metus sagittis
              lorem odio non lorem odio non pharetra massa nullam id. Interdum
              vel, elementum ultrices id. Ornare tempus lorem odio non non enim
              nunc est, facilisis.
            </p>

            <p className="text-white font-medium w-full mt-4 md:mt-0 md:w-1/2 md:pr-40">
              Laoreet viverra venenatis interdum nunc a. Pulvinar metus sagittis
              lorem odio non lorem odio non pharetra massa nullam id. Interdum
              vel, elementum ultrices id. Ornare tempus lorem odio non non enim
              nunc est, facilisis.
            </p>
          </div>
        </div>
      </div>

      <div
        id="educational-approach-parallax"
        className="h-[300px] md:h-[500px] w-screen"
      />

      <div className="flex flex-col bg-light-gray">
        <div className="flex flex-col px-8 md:px-16 pt-10 pb-12 md:pt-20 lg:px-60 md:pb-8">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-6xl text-black font-bold mb-4 md:mb-8">
              Schools we have worked with
            </h1>
            <h3 className="font-bold text-xl text-black mb-2 md:mb-6">
              Primary Schools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 md:gap-y-2 gap-x-16 font-cabin">
              {primarySchools.map((school, i) => (
                <div
                  key={i}
                  className="flex flex-wrap font-semibold font-cabin"
                >
                  <span className="text-black mr-2 font-cabin">
                    {school.name},
                  </span>
                  <span className="text-gray-500 font-cabin">
                    {school.geographicalArea}, {school.postcode}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <h3 className="font-bold text-xl text-black mb-2 md:mb-6">
              Secondary Schools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 md:gap-y-2 gap-x-16">
              {secondarySchools.map((school, i) => (
                <div key={i} className="flex flex-wrap font-semibold gap-2">
                  <span className="text-black font-cabin">{school.name},</span>
                  <span className="text-gray-500 font-cabin">
                    {school.geographicalArea}, {school.postcode}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/schools`);
  const { primarySchools = [], secondarySchools = [] } = await res.json();

  return { props: { primarySchools, secondarySchools } };
}

export default EducationalApproachPage;
