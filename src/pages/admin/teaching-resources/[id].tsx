import { useEffect } from "react";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { TeachingResourceForm } from "@/components/admin/Forms/TeachingResourceForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { TeachingResource } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

interface EditProps {
  id: string;
}

const Edit: React.FC<EditProps> = ({ id }) => {
  const { user } = useAuth();

  const { data, loading, error } = useNetlifyGetFunction<{
    teachingResource: TeachingResource;
  }>({
    fetchUrlPath: `/admin-teaching-resources?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ teachingResource: TeachingResource }>({ user });

  const onEditTeachingResource = async (
    updatedTeachingResource: TeachingResource
  ) => {
    const res = await onUpdate(`/admin-teaching-resources?id=${id}`, {
      teachingResource: updatedTeachingResource,
    });

    if (res !== undefined) {
      toast.success("TeachingResource successfully updated");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching teacher resource");
    }

    if (updateError) {
      toast.error("Error updating teacher resource");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit TeachingResource</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-11/12">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <TeachingResourceForm
              pending={pending}
              teachingResource={data?.teachingResource}
              onSaveTeachingResource={onEditTeachingResource}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminTeachingResourceEdit: NextPageWithLayout<undefined> = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

AdminTeachingResourceEdit.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default AdminTeachingResourceEdit;
