import { Event } from "@/types/global";
import Link from "next/link";
import Image from "next/image";
import "../../styles/CustomHorizonatlScroll.module.css";

interface FutureEventCardProps {
  itemId?: string;
  event: Event;
  isFirst: boolean;
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
        <p className="my-2">
          Lorem ipsu dolor sit amet consectetur adipisicing elit. Consequatur
          officiis dolor quaerat suscipit odio, dolor sunt distinctio
          reprehenderit eum iste assumenda repellat aspernatur explicabo
          voluptate, nisi facere magni aperiam.
          {/* {parse} */}
        </p>
        <Link href={event.eventbriteLink}>
          <a
            className="block uppercase text-left text-black underline"
            target="_blank"
          >
            View on Eventbrite
          </a>
        </Link>
      </div>
    </div>
  );
};
