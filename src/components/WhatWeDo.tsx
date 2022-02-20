import Image from "next/image";
import Link from "next/link";
import { Media } from "./Media";

const Content: React.FC = () => (
  <div className="flex flex-col px-8 justify-center xl:pr-32">
    <h1 className="text-3xl md:text-6xl text-white font-semibold ml-[-4px]">
      What we do
    </h1>
    <div className="text-white font-medium md:font-semibold text-xl mt-4">
      <p>
        Our Hut{"'"}s aim is to equip future generations to get involved in
        shaping positive sustainable environments. We inspire and educate young
        people and local communities through programmes of interactive workshops
        about the built environment.
      </p>

      <p className="mt-8">
        Our Hut{"'"}s aim is to equip future generations to get involved in
        shaping positive sustainable environments. We inspire and educate young
        people and local communities through programmes of interactive workshops
        about the built environment.
      </p>
    </div>

    <Link href="/projects">
      <a className="btn btn-transparent-outlined-white font-bold w-full md:w-60 text-black mt-8">
        Educational Approach
      </a>
    </Link>
  </div>
);

export const WhatWeDo: React.FC = () => (
  <>
    <Media lessThan="md">
      <div className="bg-primary py-14 w-full">
        <Content />
      </div>
    </Media>

    <Media greaterThanOrEqual="md">
      <div className="flex flex-col items-center px-32 py-16 bg-white relative h-[700px] bg-black">
        <Image
          layout="fill"
          objectFit="cover"
          alt="Kids attending a workshop"
          src="/images/architecture.jpg"
        />

        <div className="bg-primary md:opacity-60 w-screen h-full absolute top-0 left-0" />

        <div className="absolute right-0 top-0 flex flex-col justify-center md:w-8/12 lg:w-6/12 h-full">
          <Content />
        </div>
      </div>
    </Media>
  </>
);
