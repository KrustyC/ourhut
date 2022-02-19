import Link from "next/link";
import { RightArrowIcon } from "@/components/icons/RightArrow";
import { NewsletterSubscriber } from "@/components/NewsletterSubscriber";

export const DesktopContacts = () => (
  <div className="flex items-center grow w-11/12 lg:w-10/12 xl:w-9/12 mx-auto">
    <div className="flex bg-gray-100 px-8 lg:px-16 py-12 h-[700px] w-full">
      <div className="w-7/12 lg:w-8/12 flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <p className="font-bold text-xl leading-7">
            Our Hut
            <br />
            Registered Charity
            <br />
            1138408
            <br />
          </p>

          <p className="font-medium text-2xl leading-8 mt-8">
            Lucy Lavers
            <br />
            Suzanna Prizeman
            <br />
            Judy Ovens
            <br />
          </p>

          <div className="flex flex-col font-medium text-sm text-black mt-8">
            <a className="text-black" href="mailto:ourhutteam@ourhut.co.uk">
              ourhutteam@ourhut.co.uk
            </a>

            <span className="mt-2">0044 (0)7745123458</span>
          </div>
        </div>

        <div>
          <span className="text-sm">© Our Hut 2022. All rights reserved</span>
        </div>
      </div>

      <div className=" flex flex-col justify-between w-5/12 lg:w-4/12 border-l-4 border-black border-rounded pl-8 lg:pl-12 xl:pl-16">
        <div className="flex flex-col  w-full">
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
            className="flex items-center text-black font-semibold mt-4 text-lg"
          >
            <RightArrowIcon className="fill-black h-4 h-4 mr-2" /> Download
            Volunteer Form
          </a>
          <a
            href=""
            target="_blank"
            className="flex items-center text-black font-semibold mt-4 text-lg w-full"
          >
            <RightArrowIcon className="fill-black h-4 h-4 mr-2" /> Cookie Policy
          </a>
          <Link href="/privacy-policy">
            <a
              target="_blank"
              className="flex items-center text-black font-semibold mt-4 text-lg"
            >
              <RightArrowIcon className="fill-black h-4 h-4 mr-2" /> Privacy
              Policy
            </a>
          </Link>
        </div>

        <NewsletterSubscriber />
      </div>
    </div>
  </div>
);
