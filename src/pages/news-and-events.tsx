import { useState } from "react";
import parse from "html-react-parser";
import NextLink from "next/link";
import Head from "next/head";
import type { NextPage } from "next";
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
import { usePageviewTracking } from "@/hooks/usePageviewTracking";

interface NewsPageProps {
  events: {
    pastEvents: Event[];
    upcomingEvents: Event[];
  };
  news: News[];
  newsHeadline: string | null;
}

// const ARTICLE_LINK = "https://www.theguardian.com/artanddesign/2021/jun/29/inventive-vents-london-flues-grilles-our-hut";

const NEW_ARTICLE_LINK =
  "https://www.futureoflondon.org.uk/2023/08/30/heritage-led-regeneration-of-woolwich";

const NewsPage: NextPage<NewsPageProps> = ({
  events: { pastEvents, upcomingEvents },
  newsHeadline,
}) => {
  usePageviewTracking({ title: "News & Events" });
  const [viewAll, setViewAll] = useState(false);
  const shownPastEvent = viewAll ? pastEvents : pastEvents.slice(0, 4);

  const onToggleViewAll = () => {
    setViewAll(!viewAll);
  };

  return (
    <div>
      <Head>
        <title>News | Our Hut</title>
        <meta
          name="description"
          content="Checkout our latest News and newest and past events."
        />
      </Head>

      <div className="bg-primary pb-14 md:pb-8">
        <Navbar
          config={{
            burgerColor: "bg-white",
            textColor: "fill-white",
            logoColor: "fill-white",
          }}
        />

        <div className="px-8 md:pt-6 md:pl-24 md:pr-8 xl:pl-48 lg:pr-16">
          <h1 className="text-3xl md:text-6xl text-white font-semibold md:ml-[-4px]">
            News
          </h1>

          {newsHeadline ? (
            <p className="mt-2 md:mt-4 text-white font-medium md:w-2/3 lg:w-1/2">
              {parse(newsHeadline)}
            </p>
          ) : null}

          <div className="flex flex-col md:flex-row flex-wrap mt-8 gap-x-6 gap-y-4">
            <NextLink href={NEW_ARTICLE_LINK}>
              <a
                className="btn btn-primary grow md:w-80 md:grow-0"
                target="_blank"
              >
                Link to Article
              </a>
            </NextLink>
          </div>

          <Media greaterThanOrEqual="md">
            <div className="mt-14 flex justify-end">
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
        <div className="flex flex-col py-14 md:py-24">
          <h1 className="text-3xl font-bold md:text-6xl text-black mb-2 md:mb-4 ml-8 md:ml-24 xl:ml-48">
            Future Events
          </h1>
          {upcomingEvents.length > 0 ? (
            <div className="md:mt-12">
              <Carousel events={upcomingEvents} />
            </div>
          ) : (
            <div className="flex flex-col gap-4 md:gap-8 px-8 md:px-24 xl:px-48">
              <p className="text-lg lg:text-xl font-bold text-black lg:w-2/3">
                There is no event planned at the moment, but you can subscribe
                to our newsletter through our contacts page to stay up to date
                with all the latest events.
              </p>

              <NextLink href="/contacts">
                <a className="btn btn-transparent-outlined w-full md:w-fit font-medium text-regular">
                  Go to Contacts
                </a>
              </NextLink>
            </div>
          )}
        </div>

        <div className="flex flex-col px-8 md:px-24 xl:px-48 py-14 md:py-24 pb-8 md:pb-32 bg-light-gray">
          <h1 className="text-3xl md:text-6xl text-black font-bold mb-4 md:mb-16">
            Past Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
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

      <div className="flex flex-col py-14 md:py-24 px-8 md:px-24 xl:px-48">
        <h2 className="text-3xl md:text-6xl text-black font-bold mb-8">
          Press
        </h2>
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
