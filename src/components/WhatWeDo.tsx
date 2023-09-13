import Image from "next/image";
import Link from "next/link";
import { Media } from "./Media";

const Content: React.FC = () => (
  <div className="flex items-center justify-start px-8 lg:px-16 2xl:px-32 bg-black h-full">
    <div className="flex flex-col w-[620px]">
      <h1 className="text-3xl md:text-6xl text-white font-semibold ml-[-4px]">
        What we do
      </h1>
      <div className="text-white font-regular md:font-regular text-xl mt-4">
        <p>
          Our Hut{"'"}s aim is to equip future generations to get involved in
          shaping positive sustainable environments. We inspire and educate
          young people and local communities through programmes of interactive
          workshops about the built environment.
        </p>
      </div>

      <Link href="/educational-approach">
        <a className="btn btn-transparent-outlined-white font-bold w-full md:w-60 text-black mt-8">
          Educational Approach
        </a>
      </Link>
    </div>
  </div>
);

export const WhatWeDo: React.FC = () => (
  <>
    <Media lessThan="md">
      <div className="bg-black py-14 w-full">
        <Content />
      </div>
    </Media>

    <Media greaterThanOrEqual="md">
      <div className="flex h-[700px]">
        <div className="relative h-full w-1/2">
          <Image
            layout="fill"
            objectFit="cover"
            alt="Kids attending a workshop"
            src="/images/architecture.jpg"
          />

          <div className="bg-primary md:opacity-60 w-full h-full absolute" />
        </div>

        <div className="h-full w-1/2 flex flex-col justify-center bg-black">
          <Content />
        </div>
      </div>
    </Media>
  </>
);
