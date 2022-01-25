import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { Event, News } from "@/types/global";
import { InstagramIcon } from "@/components/icons/Instagram";
import { TwitterIcon } from "@/components/icons/Twitter";
import { PastEventCard } from "@/components/PastEventCard";
import { Navbar } from "@/components/Navbar";

const FAKE_EVENTS: Event[] = [
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
  {
    slug: "the-event",
    title: "Peckham Family Workshop",
    image: "https://image.com",
    description: {},
    eventbriteLink: "",
    date: {
      day: "17/12/2021",
      startTime: {
        time: "08:00",
        period: "AM",
      },
      endTime: {
        time: "12:00",
        period: "AM",
      },
    },
  },
];

interface NewsPageProps {
  events: Event[];
  news: News[];
}

const NewsPage: NextPage<NewsPageProps> = ({ events }) => {
  console.log("EVENTS", events);
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
          <h1 className="text-white font-bold">News</h1>
          <p className="mt-4 text-white font-bold w-1/2">
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
        <div className="flex flex-col py-16 px-32">
          <h1 className="text-black font-bold mb-4">Future Events</h1>
          <div>Carousel</div>
        </div>

        <div className="flex flex-col px-32 py-16 bg-light-gray">
          <h1 className="text-black font-bold mb-8">Past Events</h1>
          <div className="grid grid-cols-4 gap-16">
            {FAKE_EVENTS.map((event) => (
              <PastEventCard key={event._id} event={event} />
            ))}
          </div>
        </div>

        <div className="flex flex-col py-16 px-32">
          <h1 className="text-black font-bold mb-8">Recent Press</h1>
          <div className="flex">
            <div className="w-1/2">
              <img
                src="https://i.guim.co.uk/img/media/00d4d57a15c927716808df0bc21ea28df91970b2/0_177_3329_2121/master/3329.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=d7d20c67135dc64dd6253b005e3092a0"
                className="w-full"
              />
            </div>

            <div className="w-1/2 pl-8">
              <h2 className="text-black font-bold">
                Where there&apos;s a grille: the hidden portals to London&apos;s
                underworld
              </h2>

              <p>Oliver Wainwright - Tue 29 Jun 2021 10.01 BST</p>

              <p className="mt-6 mb-4">
                The Sublime Structures in Crystal Palace Park Project, devised
                and run by Our Hut, aimed to enable local young peopleand
                families to discover and celebrate the extraordinary legacy of
                design and engineering...
              </p>

              <a
                className="uppercase text-black underline underline-offset-1"
                href="https://www.theguardian.com/artanddesign/2021/jun/29/inventive-vents-london-flues-grilles-our-hut"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read full article
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.baseUrl}/.netlify/functions/events-and-news`
  );
  const { events = [], news = [] } = await res.json();

  console.log(("EVENTS", events));
  return { props: { events, news } };
}

export default NewsPage;
