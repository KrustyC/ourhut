import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { PublicationForm } from "@/components/admin/Forms/PublicationForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { Publication } from "@/types/global";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/app";

const AdminPublicationCreate: NextPageWithLayout<undefined> = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ publication: Publication }>({ user });

  const onCreatePublication = async (publication: Publication) => {
    const res = await onCreate(`/admin-publications`, {
      publication,
    });

    if (res !== undefined) {
      toast.success("Publication successfully created!");

      setTimeout(() => {
        router.push("/admin/publications");
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
        <h2 className="text-gray-600 font-bold">Create Publication</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-11/12">
          <PublicationForm
            pending={pending}
            onSavePublication={onCreatePublication}
          />
        </Panel>
      </div>
    </div>
  );
};

AdminPublicationCreate.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminPublicationCreate;
