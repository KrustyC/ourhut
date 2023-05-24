import { Event } from "@/types/global";
import Link from "next/link";
import Image from "next/image";
import { parse, format } from "date-fns";
import "../../styles/CustomHorizonatlScroll.module.css";

interface FutureEventCardProps {
  itemId?: string;
  event: Event;
  isFirst: boolean;
}

function formatDate(date: string) {
  return format(parse(date, "dd/MM/yyyy", new Date()), "dd-MM-yyyy");
}

export const FutureEventCard: React.FC<FutureEventCardProps> = ({
  event,
  isFirst,
}) => {
  return (
    <div
      className={`w-[400px] md:w-[800px] h-auto mr-5 text-dark ${
        isFirst ? "ml-8 md:ml-24 xl:ml-32" : ""
      }`}
    >
      <div className="w-full h-[400px] md:h-[400px] relative">
        <Image
          src={event.image}
          layout="fill"
          objectFit="cover"
          alt={event.title}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-black text-2xl">{event.title}</h3>

        <div className="flex gap-2 mt-1 text-black/60">
          <span>
            {event.date.endDay ? "From" : "On"} {formatDate(event.date.day)}
          </span>
          {event.date.endDay && <span>to {formatDate(event.date.endDay)}</span>}
        </div>

        <p className="my-2">
          Lorem ipsu dolor sit amet consectetur adipisicing elit. Consequatur
          officiis dolor quaerat suscipit odio, dolor sunt distinctio
          reprehenderit eum iste assumenda repellat aspernatur explicabo
          voluptate, nisi facere magni aperiam.
          {/* {parse} */}
        </p>
        <Link href={event.eventbriteLink}>
          <a
            className="block text-left text-black underline font-bold"
            target="_blank"
          >
            View on Eventbrite
          </a>
        </Link>
      </div>
    </div>
  );
};
