import { Event } from "src/types/global";
import Link from "next/link";

interface PartEventCardProps {
  event: Event;
}

// @TODO Ask Bea, should this be link?

export const PastEventCard: React.FC<PartEventCardProps> = ({ event }) => (
  <Link href={`/events/${event.slug}`} passHref>
    <a className="cursor-pointer w-full h-72 bg-red-100 relative">
      <img className="absolute object-cover w-full h-full" src={event.image} />
      <div className="opacity-0 hover:opacity-100 duration-500 bg-gray-300 p-4 absolute inset-0 z-10 flex justify-start items-end text-white font-bold">
        <div className="flex flex-col">
          <span className="text-14px">{event.title}</span>
          <span className="text-14px">
            {event.date.day.replace(/\//g, "-")}
          </span>
        </div>
      </div>
    </a>
  </Link>
);
