import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Event } from "@/types/global";
import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArrow";
import { FutureEventCard } from "./FutureEventCard";

interface FutureEventsCarouselProps {
  events: Event[];
}

export const Carousel: React.FC<FutureEventsCarouselProps> = ({ events }) => {
  return (
    <ScrollMenu
      wrapperClassName="relative scroll-menu-wrapper"
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
    >
      {events.map(({ slug, ...rest }, i) => (
        <FutureEventCard
          key={slug}
          isFirst={i === 0}
          isLast={i === events.length - 1}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          itemId={slug!}
          event={{ slug, ...rest }}
        />
      ))}
    </ScrollMenu>
  );
};
