import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types/global";
import { Media } from "@/components/Media";

interface PartEventCardProps {
  event: Event;
}

// @TODO Ask Bea, should this be link?

export const PastEventCard: React.FC<PartEventCardProps> = ({ event }) => (
  <Link href={event.eventbriteLink} passHref>
    <a className="cursor-pointer w-full">
      <div className="cursor-pointer w-full h-32 md:h-72 relative">
        <div className="relative w-full h-full md:h-full">
          <Image
            layout="fill"
            objectFit="cover"
            className="absolute object-cover "
            src={event.image}
            alt={event.title}
          />
        </div>
        <div className="hidden md:display-block opacity-0 hover:opacity-100 duration-500 bg-gray-300 p-4 absolute inset-0 z-10 flex justify-start items-end text-white font-bold">
          <div className="flex flex-col">
            <span className="text-14px">{event.title}</span>
            <span className="text-14px">
              {event.date.day.replace(/\//g, "-")}
            </span>
          </div>
        </div>
      </div>
      <Media lessThan="md">
        <h3 className="text-l mt-2 text-black font-bold">{event.title}</h3>
      </Media>
    </a>
  </Link>
);
