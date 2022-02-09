import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { SchoolForm } from "@/components/admin/Forms/SchoolForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { School } from "@/types/global";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/app";

const AdminSchoolsCreate: NextPageWithLayout<undefined> =  () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ school: School }>({ user });

  const onCreateSchool = async (school: School) => {
    const res = await onCreate(`/admin-schools`, { school });

    if (res !== undefined) {
      toast.success("School successfully created!");
      setTimeout(() => {
        router.push("/admin/schools");
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
        <h2 className="text-gray-600 font-bold">Create School</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          <SchoolForm pending={pending} onSaveSchool={onCreateSchool} />
        </Panel>
      </div>
    </div>
  );
};

AdminSchoolsCreate.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminSchoolsCreate;
