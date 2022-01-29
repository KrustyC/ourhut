import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { Event, News } from "@/types/global";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { Navbar } from "@/components/Navbar";
import { Carousel } from "@/components/FutureEventsCarousel";
import { PastEventCard } from "@/components/PastEventCard";
import { Footer } from "@/components/Footer";
import { GuardianNews } from "@/components/GuardianNews";

interface NewsPageProps {
  events: {
    pastEvents: Event[];
    upcomingEvents: Event[];
  };
  news: News[];
}

const NewsPage: NextPage<NewsPageProps> = ({
  events: { pastEvents, upcomingEvents },
}) => {
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
            textColor: "text-white",
            logoColor: "bg-white",
          }}
        />

        <div className="pl-32 pr-16">
          <p className="text-6xl text-white font-semibold ml-[-4px]">News</p>
          <p className="mt-4 text-white font-medium w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            officiis nobis itaque quaerat suscipit odio, dolor sunt distinctio
            reprehenderit eum iste assumenda repellat aspernatur explicabo
            voluptate, nisi facere magni aperiam.
          </p>
          <div className="mt-8">
            <NextLink href="/">
              <a className="btn btn-primary">Link to Article</a>
            </NextLink>

            <NextLink href="/">
              <a className="btn btn-primary ml-8">Link to Article</a>
            </NextLink>
          </div>
          <div className="mt-8 flex justify-end">
            <TwitterIcon className="h-6 w-6 fill-white mr-4" />
            <InstagramIcon className="h-6 w-6 fill-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col py-16">
          <h1 className="text-black font-semibold ml-32 mb-12">
            Future Events
          </h1>
          <Carousel events={upcomingEvents} />
        </div>

        <div className="flex flex-col px-32 py-16 bg-light-gray">
          <h1 className="text-black font-semibold mb-8">Past Events</h1>
          <div className="grid grid-cols-4 gap-16">
            {pastEvents.map((event) => (
              <PastEventCard key={event._id} event={event} />
            ))}
          </div>
        </div>

        <div className="flex flex-col py-16 px-32">
          <h1 className="text-black font-semibold mb-8">Recent Press</h1>
          <GuardianNews />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/events-and-news`
  );
  const { events = { pastEvents: [], upcomingEvents: [] }, news = [] } =
    await res.json();

  return { props: { events, news } };
}

export default NewsPage;
