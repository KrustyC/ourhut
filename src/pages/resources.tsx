import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { parse, format } from "date-fns";
import { TeachingResource } from "@/types/global";
import { UpArrowIcon } from "@/components/icons/UpArrow";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ResourcesPageProps {
  teachingResources: TeachingResource[];
}

function formatDate(date: string) {
  return format(parse(date, "dd/MM/yyyy", new Date()), "dd-MM-yyyy");
}

const ResourcesPage: NextPage<ResourcesPageProps> = ({ teachingResources }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <div>
      <Head>
        <title>Resources | Our Hut</title>
        <meta
          name="description"
          content="A comprehensive list of all our resources"
        />
      </Head>

      <div className="bg-white pb-8">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "text-black",
            logoColor: "bg-primary",
          }}
        />

        <div className="px-32">
          <h1 className="text-6xl text-black font-bold my-8">Resources</h1>

          <div className="flex flex-col">
            {teachingResources.map((teachingResource, i) => (
              <div
                key={teachingResource._id}
                className="flex flex-col w-full bg-primary px-12 py-12 mb-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-4xl text-black font-bold">
                    {teachingResource.title}
                  </h3>
                  <span>
                    <UpArrowIcon
                      className={`h-10 w-10 cursor-pointer transition-all duration-500 fill-black ${
                        !isOpen ? "rotate-180" : ""
                      }`}
                      onClick={onToggle}
                    />
                  </span>
                </div>
                <div className="relative h-60 w-full mb-8">
                  <Image
                    src={teachingResource.image}
                    alt={teachingResource.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                {isOpen ? (
                  <table className="w-full">
                    <thead>
                      <tr className="w-1/2 text-left text-sm border-b-2 border-black">
                        <th className="w-1/2 pb-1 px-2">Name of material</th>
                        <th className="w-1/6 pb-1 px-2">Date Published</th>
                        <th className="w-1/4 pb-1 px-2">Host</th>
                        <th className="w-1/12 pb-1 px-2">Link</th>
                      </tr>
                    </thead>

                    <tbody>
                      {teachingResource.materials.map((material, i) => (
                        <tr
                          key={i}
                          className="w-1/2 py-20 border-b-2 border-black"
                        >
                          <td className="py-4 truncate text-ellipsis font-semibold px-2">
                            {material.name}
                          </td>
                          <td className="py-4 px-2">
                            {formatDate(material.date)}
                          </td>
                          <td className="py-4 truncate text-ellipsis px-2">
                            {material.host}
                          </td>
                          <td className="py-4 px-2">1961</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/teaching-resources`
  );

  const { teachingResources } = await res.json();

  return {
    props: { teachingResources },
  };
}

export default ResourcesPage;
