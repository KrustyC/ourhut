import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { NewsletterSubscriber } from "@/components/NewsletterSubscriber";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";
import { Footer } from "./Footer";

export const MobileContacts = () => (
  <div>
    <div className="h-auto flex flex-col px-8">
      <div className="pb-8">
        <p className="font-semibold text-2xl leading-8">
          Our Hut
          <br />
          Registered Charity
          <br />
          1138408
        </p>
        <p className="font-medium text-xl leading-7 mt-4">
          Lucy Lavers
          <br />
          Suzanna Prizeman
          <br />
          Judy Ovens
        </p>

        <div className="flex flex-col font-medium text-sm text-black mt-14">
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

      <div className="py-6 border-t-2 border-primary">
        <NewsletterSubscriber />
      </div>
    </div>
    <Footer />
  </div>
);
