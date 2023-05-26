import { useEffect } from "react";
import { toast } from "react-toastify";
import { parse } from "date-fns";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { EventCard } from "@/components/admin/Cards/EventCard";
import { Event } from "@/types/global";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { NextPageWithLayout } from "@/types/app";

const AdminEvents: NextPageWithLayout<undefined> = () => {
  const {
    items: events,
    loading,
    error,
    itemToRemoveIndex: eventToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveEvent,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ events: Event[] }, Event>({
    fetchPath: "/admin-events",
    parseResponse: (response) => response.events,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching events");
    }
  }, [error]);

  const sortedEvents = events.sort((a, b) => {
    const aDate = parse(a.date.day, "dd/MM/yyyy", new Date());
    const bDate = parse(b.date.day, "dd/MM/yyyy", new Date());

    return bDate.getTime() - aDate.getTime();
  });

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-col">
        <span className="bg-lime-400/70 px-4 py-4 font-bold rounded-xl border text-lime-900 border-lime-700 my-3">
          Most recent events are shown first
        </span>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedEvents.map((event, index) => (
              <EventCard
                key={event._id}
                event={event}
                onWantToRemoveEvent={() => onWantToRemoveEvent(index)}
              />
            ))}
          </div>
        )}
      </div>

      {eventToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="event"
          itemToDelete={events[eventToRemoveIndex]}
          questionItem={events[eventToRemoveIndex].title}
          deletePath={`/admin-events?slug=${events[eventToRemoveIndex].slug}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminEventsLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="Events"
      subtitle="Here you can manage your events."
      itemName="Event"
      createItemPath="/admin/events/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminEvents.Layout = AdminEventsLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminEvents;
