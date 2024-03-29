import { useEffect } from "react";
import { GetStaticPaths } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { EventForm } from "@/components/admin/Forms/EventForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { Event } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

interface EditProps {
  slug: string;
}

const Edit: React.FC<EditProps> = ({ slug }) => {
  const { user } = useAuth();

  const { data, loading, error } = useNetlifyGetFunction<{ event: Event }>({
    fetchUrlPath: `/admin-events?slug=${slug}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ event: Event; status: "publish" | "draft" }>({
    user,
  });

  const onEditEvent = async (
    updatedEvent: Event,
    status: "publish" | "draft"
  ) => {
    const res = await onUpdate(`/admin-events?slug=${slug}`, {
      event: updatedEvent,
      status,
    });

    if (res !== undefined) {
      toast.success("Event successfully updated!");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching event");
    }

    if (updateError) {
      toast.error("Error updating event");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit Event</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-10/12 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <EventForm
              pending={pending}
              event={data?.event}
              onSaveEvent={onEditEvent}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminEventsEdit: NextPageWithLayout<undefined> = () => {
  const router = useRouter();

  const { slug } = router.query as { slug?: string };

  if (!slug) {
    return null;
  }

  return <Edit slug={slug} />;
};

AdminEventsEdit.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default AdminEventsEdit;
