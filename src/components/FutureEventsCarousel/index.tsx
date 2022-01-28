import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Event } from "src/types/global";
import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArrow";
import { FutureEventCard } from "./FutureEventCard";

interface FutureEventsCarouselProps {
  events: Event[];
}

export const Carousel: React.FC<FutureEventsCarouselProps> = ({ events }) => {
  return (
    <ScrollMenu
      wrapperClassName="relative"
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
    >
      {events.map(({ slug, ...rest }, i) => (
        <FutureEventCard
          key={slug}
          isFirst={i === 0}
          itemId={slug!}
          event={{ slug, ...rest }}
        />
      ))}
    </ScrollMenu>
  );
};
