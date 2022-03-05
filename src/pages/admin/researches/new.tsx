import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ResearchForm } from "@/components/admin/Forms/ResearchForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { Research } from "@/types/global";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/app";

const AdminResearchCreate: NextPageWithLayout<undefined> = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ research: Research }>({ user });

  const onCreateResearch = async (research: Research) => {
    const res = await onCreate(`/admin-researches`, {
      research,
    });

    if (res !== undefined) {
      toast.success("Research successfully created!");

      setTimeout(() => {
        router.push("/admin/researches");
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
        <h2 className="text-gray-600 font-bold">Create Research</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-11/12">
          <ResearchForm pending={pending} onSaveResearch={onCreateResearch} />
        </Panel>
      </div>
    </div>
  );
};

AdminResearchCreate.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminResearchCreate;
