import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { Event, News } from "@/types/global";
import { Media } from "@/components/Media";
import { UpArrowIcon } from "@/components/icons/UpArrow";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { Navbar } from "@/components/Navbar";
import { Carousel } from "@/components/FutureEventsCarousel";
import { PastEventCard } from "@/components/PastEventCard";
import { Footer } from "@/components/Footer";
import { GuardianNews } from "@/components/GuardianNews";
import { INSTAGRAM_LINK, TWITTER_LINK } from "@/utils/constants";
import parse from "html-react-parser";
import { useState } from "react";

interface NewsPageProps {
  events: {
    pastEvents: Event[];
    upcomingEvents: Event[];
  };
  news: News[];
  newsHeadline: string | null;
}

const NewsPage: NextPage<NewsPageProps> = ({
  events: { pastEvents, upcomingEvents },
  newsHeadline,
}) => {
  const [viewAll, setViewAll] = useState(false);
  const shownPastEvent = viewAll ? pastEvents : pastEvents.slice(0, 4);

  const onToggleViewAll = () => {
    setViewAll(!viewAll);
  };

  return (
    <div>
      <Head>
        <title>News | Our Hut</title>
        <meta name="description" content="Checkout our latest News" />
      </Head>

      <div className="bg-primary pb-8">
        <Navbar
          config={{
            burgerColor: "bg-white",
            textColor: "fill-white",
            logoColor: "fill-white",
          }}
        />

        <div className="px-8 md:pt-6 md:pl-48 md:pr-16 md:pb-8">
          {/* <div className="pt-6 pl-48 pr-16 pb-8"> */}
          <p className="text-3xl md:text-6xl text-white font-semibold md:ml-[-4px]">
            News
          </p>

          {newsHeadline ? (
            <p className="mt-4 text-white font-medium md:w-1/2">
              {parse(newsHeadline)}
            </p>
          ) : null}

          <div className="flex flex-wrap mt-8 gap-4">
            <NextLink href="/">
              <a className="btn btn-primary">Link to Article</a>
            </NextLink>

            <NextLink href="/">
              <a className="btn btn-primary">Link to Article</a>
            </NextLink>
          </div>

          <Media greaterThanOrEqual="md">
            <div className="mt-8 flex justify-end">
              <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="h-6 w-6 fill-white mr-4" />
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-6 w-6 fill-white" />
              </a>
            </div>
          </Media>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col py-8 md:py-24">
          <h1 className="text-3xl md:text-6xl text-black font-bold ml-8 md:ml-48 mb-8 md:mb-12">
            Future Events
          </h1>
          <Carousel events={upcomingEvents} />
        </div>

        <div className="flex flex-col px-8 md:px-48 py-8 md:py-24 pb-8 md:pb-32 bg-light-gray">
          <h1 className="text-3xl md:text-6xl text-black font-bold mb-8 md:mb-16">
            Past Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {shownPastEvent.map((event) => (
              <PastEventCard key={event._id} event={event} />
            ))}
          </div>
          <div>
            <span
              className="flex mt-4 justify-end items-center"
              role="button"
              onClick={onToggleViewAll}
            >
              <p className="font-semibold text-xl items-center mr-2">
                See {viewAll ? "less" : "more"}
              </p>
              <UpArrowIcon
                className={`h-6 w-6 cursor-pointer transition-all duration-500 fill-black ${
                  !viewAll ? "rotate-180" : ""
                }`}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-8 md:py-24 px-8 md:px-48">
        <h1 className="text-3xl md:text-6xl text-black font-bold mb-8">
          Recent Press
        </h1>
        <GuardianNews />
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/events-and-news`
  );

  const {
    events = { pastEvents: [], upcomingEvents: [] },
    news = [],
    newsHeadline,
  } = await res.json();

  return {
    props: { events, news, newsHeadline: newsHeadline?.headline || null },
  };
}

export default NewsPage;
