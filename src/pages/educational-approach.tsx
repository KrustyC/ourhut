import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { School } from "@/types/global";
import { Media } from "@/components/Media";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EducationApproachReviews } from "@/components/EducationApproachReviews";

interface EducationalApproachPageProps {
  primarySchools: School[];
  secondarySchools: School[];
}

const EducationalApproachPage: NextPage<EducationalApproachPageProps> = ({
  primarySchools,
  secondarySchools,
}) => {
  const [showMoreText, setShowMoreText] = useState(false);

  const onShowMore = () => setShowMoreText(true);

  return (
    <div>
      <Head>
        <title>Educational Approach | Our Hut</title>
        <meta
          name="description"
          content="Our approach to teaching architecture to young students"
        />
      </Head>

      <div className="relative">
        <Navbar
          config={{
            burgerColor: "bg-white",
            textColor: "fill-white",
            logoColor: "fill-white",
            absolute: true,
          }}
        />

        <div className="w-full flex flex-col md:flex-row">
          <div className="flex w-full md:w-7/12 lg:w-1/2 bg-primary px-8 lg:px-20 2xl:px-32 pt-24 md:pt-32 pb-12 lg:pb-24">
            <div className="flex flex-col w-full lg:w-[620px] gap-4">
              <h1 className="text-3xl md:text-6xl text-white">
                Educational Approach
              </h1>
              <div className="text-white mt-2 text-lg flex flex-col gap-4">
                <p className="font-regular">
                  The Our Hut educational approach has creative learning at its
                  core. Our aim is to build knowledge and curiosity about the
                  built environment; to develop skills, including language as
                  well as design; and to engender a creative mind-set. We use a
                  range of techniques that are designed to engage and increase
                  confidence levels in a subject area that isn{"'"}t taught in
                  schools but that we all experience in our daily lives.
                </p>
                <p className="font-regular">
                  The educational element of all our projects include a trip, to
                  get participants to look up, discuss and engage with the built
                  environment in a variety of ways that link to different areas
                  of the curriculum - history, geography, science and maths.
                  From there we build on developing further observational skills
                  including drawing and contextual and historical knowledge.
                  Finally there will be a creative design response and
                  model-making. The model-making element provides opportunities
                  for group work when all sorts of meta-learning can take place
                  such as listening to others, problem solving, resilience and
                  learning to use resources both human and physical.
                </p>
                {showMoreText ? (
                  <>
                    <p className="font-regular">
                      At the end of our projects we share the work with the
                      wider school community. The completed work is presented as
                      beautifully and meticulously as possible so that the
                      students can show their work with well-earned pride. We
                      often have comments from teachers and parents about how
                      much a student has developed in confidence in areas such
                      as problem solving through doing the project and Our Hut
                      has in the past been able to capture this process in
                      various action research projects funded by Creative
                      Partnerships.
                    </p>
                    <p className="font-regular">
                      The project resources that we make for each project are
                      aimed at getting the best outcomes for our students in the
                      most interesting and inclusive ways. We are always looking
                      to develop new ideas and ways of engaging students as well
                      as being able to draw on a well established toolkit of
                      processes. The physical resources that we use in our
                      workshops are always the best we can source and afford -
                      whether it is high quality drawing paper or exciting
                      electrical components for model making. Above all though
                      it is the team of people, who really make the creative
                      learning process happen. Teachers are involved from the
                      outset to help implement the project for their class; and
                      the Our Hut team and volunteers are skilled and
                      experienced at enabling and getting students motivated
                      which means that the intensive creative learning
                      experience is well supported with a range of positive
                      outcomes for all students.
                    </p>
                  </>
                ) : (
                  <span
                    className="mt-6 uppercase underline text-lg"
                    role="button"
                    onClick={onShowMore}
                  >
                    read more
                  </span>
                )}
              </div>
            </div>
          </div>

          <Media
            greaterThanOrEqual="md"
            className="flex flex-col bg-black mt-8 md:mt-0 md:w-5/12 lg:w-full relative"
          >
            <div className="h-full bg-gray-200">
              <Image
                priority
                className="w-full h-full"
                layout="fill"
                objectFit="cover"
                alt="Photo of Lucy, Suzanna and Judy"
                src="/images/sublime-structures-visit-vertical.png"
              />
            </div>
          </Media>
        </div>
      </div>

      <EducationApproachReviews />

      <div className="h-[300px] md:h-[500px] w-screen relative">
        <Image
          className="w-full h-full"
          layout="fill"
          objectFit="cover"
          alt="Photo of some kids"
          src="/images/educational-approach.jpg"
        />
      </div>

      <div className="bg-primary w-screen flex flex-col px-8 lg:px-44 py-12 lg:py-24">
        <h2 className="text-3xl md:text-6xl text-white mb-5 lg:mb-8">CPD</h2>
        <div className="w-full flex flex-col lg:flex-row gap-y-8 gap-x-16 text-base lg:text-lg font-semibold text-white">
          <p className="flex-1">
            Our Hut is experienced in providing Continued Professional
            Development (CPD) training as one-off sessions or whole INSET days,
            or a series of workshops. The session(s) is designed to support your
            staff{"'"}s creative approach and planning, providing a deeper
            understanding of how architecture and the built environment can be
            linked to all areas of the curriculum: maths, science, literacy,
            history and local area studies as well as design and technology.
          </p>
          <p className="flex-1">
            The focus of our teacher CPD ranges from specific skill development,
            especially around 3D model making, to providing practical tool kits
            of lesson plans and Powerpoints to take away. Depending on who they
            are for CPD sessions are either linked closely to an existing
            project or could take a more general theme such as mapping or how to
            use the built environment as a teaching resource.
          </p>
        </div>
      </div>

      <div className="bg-black w-screen flex flex-col px-8 lg:px-44 py-12 lg:py-24">
        <h2 className="text-2xl md:text-2xl text-white mb-8">
          Feedback following NQT (ECT) training sessions included the following:
        </h2>
        <div className="w-full flex flex-col lg:flex-row gap-y-8 gap-x-16 text-white">
          <p className="text-base lg:text-lg font-regular flex-1">
            <b>Denis O{"'"} Regan</b>, the head teacher at St James the Great
            was pleased that the existence of the online resource meant that
            cross curricular learning about Peckham and visiting the locality
            would be easier to embed in the school curriculum throughout the
            primary phase:
          </p>
          <p className="flex-1 italic text-2xl font-thin">
            “Everyone I spoke to found it useful and had a definite idea as to
            how they would be able to take something from the session into their
            own practice.”
          </p>
        </div>
      </div>

      <div className="h-[300px] md:h-[500px] w-screen relative">
        <Image
          className="w-full h-full"
          layout="fill"
          objectFit="cover"
          alt="Photo of some kids"
          src="/images/vents_exhibition.jpg"
        />
      </div>

      <div className="flex flex-col bg-light-gray">
        <div className="flex flex-col px-8 md:px-16 pt-10 pb-12 md:pt-20 lg:px-44 md:pb-8">
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
