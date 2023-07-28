import { useEffect } from "react";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { SchoolForm } from "@/components/admin/Forms/SchoolForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { School } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

interface EditProps {
  id: string;
}

const Edit: React.FC<EditProps> = ({ id }) => {
  const { user } = useAuth();

  const { data, loading, error } = useNetlifyGetFunction<{ school: School }>({
    fetchUrlPath: `/admin-schools?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ school: School }>({ user });

  const onEditSchool = async (updatedSchool: School) => {
    const res = await onUpdate(`/admin-schools?id=${id}`, {
      school: updatedSchool,
    });

    if (res !== undefined) {
      toast.success("School successfully updated");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching school");
    }

    if (updateError) {
      toast.error("Error updating school");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit School</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full md:w-9/12">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SchoolForm
              pending={pending}
              school={data?.school}
              onSaveSchool={onEditSchool}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminSchoolsEdit: NextPageWithLayout<undefined> = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

AdminSchoolsEdit.Layout = AdminLayout;

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

export default AdminSchoolsEdit;
