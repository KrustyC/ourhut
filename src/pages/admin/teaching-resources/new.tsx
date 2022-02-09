import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { TeachingResourceForm } from "@/components/admin/Forms/TeachingResourceForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { TeachingResource } from "@/types/global";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/app";

const AdminTeachingResourceCreate: NextPageWithLayout<undefined> =  () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ teachingResource: TeachingResource }>({ user });

  const onCreateTeachingResource = async (
    teachingResource: TeachingResource
  ) => {
    const res = await onCreate(`/admin-teaching-resources`, {
      teachingResource,
    });

    if (res !== undefined) {
      toast.success("Teacher Resource successfully created!");

      setTimeout(() => {
        router.push("/admin/teaching-resources");
      }, 800);
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Create Teacher Resource</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          <TeachingResourceForm
            pending={pending}
            onSaveTeachingResource={onCreateTeachingResource}
          />
        </Panel>
      </div>
    </div>
  );
};

AdminTeachingResourceCreate.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminTeachingResourceCreate;
