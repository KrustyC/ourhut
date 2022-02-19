import Link from "next/link";
import { RightArrowIcon } from "@/components/icons/RightArrow";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";

export const MobileContacts = () => (
  <div className="h-auto flex flex-col px-8">
    <div className="pb-8 border-b-2 border-primary">
      <p className="font-bold text-xl leading-7">
        Our Hut
        <br />
        Registered Charity
        <br />
        1138408
      </p>
    </div>
    <div className="py-6 border-b-2 border-primary">
      <p className="font-medium text-2xl leading-8 mb-16">
        Lucy Lavers
        <br />
        Suzanna Prizeman
        <br />
        Judy Ovens
      </p>

      <div className="flex flex-col font-medium text-sm text-black mt-8">
        <div className="flex mb-2">
          <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="h-6 w-6 fill-black mr-2" />
          </a>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="h-6 w-6 fill-black" />
          </a>
        </div>

        <a className="text-black" href="mailto:ourhutteam@ourhut.co.uk">
          ourhutteam@ourhut.co.uk
        </a>

        <span className="mt-2">0044 (0)7745123458</span>
      </div>
    </div>

    <div className="flex flex-col py-6">
      <a
        href="https://www.etsy.com/uk/shop/OurHutShop"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-black font-semibold text-lg"
      >
        <RightArrowIcon className="fill-black h-4 h-4 mr-2" /> Etsy Shop
      </a>
      <a
        href=""
        target="_blank"
        className="flex items-center text-black font-semibold mt-2 text-lg"
      >
        <RightArrowIcon className="fill-black h-4 h-4 mr-2" /> Download
        Volunteer Form
      </a>
      <a
        href=""
        target="_blank"
        className="flex items-center text-black font-semibold mt-2 text-lg"
      >
        <RightArrowIcon className="fill-black h-4 h-4 mr-2" /> Cookie Policy
      </a>
      <Link href="/privacy-policy">
        <a
          target="_blank"
          className="flex items-center text-black font-semibold mt-2 text-lg"
        >
          <RightArrowIcon className="fill-black h-4 h-4 mr-2" /> Privacy Policy
        </a>
      </Link>
    </div>

    <div className="pb-8">
      <span className="py-2 text-xs text-gray-300">
        © Our Hut 2022. All rights reserved
      </span>
    </div>
  </div>
);
