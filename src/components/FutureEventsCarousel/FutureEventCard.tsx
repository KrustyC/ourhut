import { Event } from "@/types/global";
import Link from "next/link";
import Image from "next/image";
import { parse, format } from "date-fns";
import parseHtml from "html-react-parser";
import "../../styles/CustomHorizonatlScroll.module.css";

interface FutureEventCardProps {
  itemId?: string;
  event: Event;
  isFirst: boolean;
  isLast: boolean;
}

function formatDate(date: string) {
  return format(parse(date, "dd/MM/yyyy", new Date()), "dd-MM-yyyy");
}

export const FutureEventCard: React.FC<FutureEventCardProps> = ({
  event,
  isFirst,
  isLast,
}) => {
  return (
    <div
      className={`w-[85vw] md:w-[800px] lg:w-[1200px] h-auto mr-5 text-dark lg:flex ${
        isFirst ? "ml-8 md:ml-24 xl:ml-48" : "ml-8 lg:ml-28"
      } ${isLast && !isFirst ? "mr-14 lg:mr-20" : ""}`}
    >
      <div className="w-full h-[400px] md:h-[400px] lg:w-2/5 lg:h-auto lg:aspect-square  relative">
        <Image
          src={event.image}
          layout="fill"
          objectFit="cover"
          alt={event.title}
        />
      </div>
      <div className="mt-4 lg:mt-0 flex flex-col lg:w-3/5 lg:px-12">
        <h3 className="font-bold text-black text-2xl">{event.title}</h3>

        <div className="flex gap-2 mt-1 text-black/60">
          <span>
            {event.date.endDay ? "From" : "On"} {formatDate(event.date.day)}
          </span>
          {event.date.endDay && <span>to {formatDate(event.date.endDay)}</span>}
        </div>

        <p className="my-2">
          {event.description ? parseHtml(event.description) : null}
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
