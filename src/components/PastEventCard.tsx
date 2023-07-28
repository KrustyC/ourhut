import Image from "next/image";
import { Event } from "@/types/global";
import { Media } from "@/components/Media";

interface PartEventCardProps {
  event: Event;
}

export const PastEventCard: React.FC<PartEventCardProps> = ({ event }) => (
  <div className="w-full">
    <div className="w-full h-32 md:h-72 relative">
      <div className="relative w-full h-full md:h-full">
        <Image
          layout="fill"
          objectFit="cover"
          className="absolute"
          src={event.image}
          alt={event.title}
        />
      </div>

      <div className="hidden md:flex opacity-0 hover:opacity-100 duration-500 bg-black/80 p-4 absolute inset-0 z-1000 justify-start items-end text-white font-bold">
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
  </div>
);
