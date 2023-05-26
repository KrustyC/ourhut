import { format, parse } from "date-fns";
import { Event } from "@/types/global";
import { CalendarIcon } from "../../icons/Calendar";
import { LinkIcon } from "../../icons/Link";

function formatDate(day: string): string {
  return format(parse(day, "dd/MM/yyyy", new Date()), "dd MMM yyyy");
}

interface EventCardProps {
  event: Event;
  onWantToRemoveEvent: VoidFunction;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onWantToRemoveEvent,
}) => {
  const bgColor = event.isPublished ? "bg-green-500" : "bg-yellow-300";
  const fontColor = event.isPublished ? "text-white" : "text-black";
  const copy = event.isPublished ? "published" : "draft";

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-bold text-gray-900">{event.title}</span>

          <div className="flex items-start">
            <div className="icon-wrapper mt-1">
              <CalendarIcon height="h-4" width="w-4" />
            </div>
            <span className="ml-1 text-sm text-gray-600">
              {formatDate(event.date.day)} /
              {event.date.startTime ? (
                <>
                  <b>from</b>
                  {event.date.startTime.time} {event.date.startTime.period}
                  {event.date.endTime ? (
                    <>
                      <b>to</b>
                      {event.date.endTime.time} {event.date.endTime.period}
                    </>
                  ) : null}
                </>
              ) : null}
            </span>
          </div>

          <div className="flex items-start">
            <div className="icon-wrapper">
              <LinkIcon height="h-4" width="w-4" />
            </div>
            <span className="ml-1 text-sm text-gray-600">
              <a
                className="text-admin-link"
                href={event.eventbriteLink}
                target="_blank"
                rel="noreferrer"
              >
                View on EventBrite
              </a>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4 w-full justify-self-end">
          <div>
            <span
              className={`${bgColor} ${fontColor} inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none rounded-full uppercase`}
            >
              {copy}
            </span>
          </div>

          <div>
            <a
              href={`/admin/events/${event.slug}`}
              className="btn-admin btn-primary btn-sm text-base uppercase mr-2"
            >
              Edit
            </a>

            <button
              className="btn-admin btn-danger btn-sm text-base uppercase"
              onClick={onWantToRemoveEvent}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
