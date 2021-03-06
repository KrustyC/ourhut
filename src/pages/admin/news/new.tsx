import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { NewsForm } from "@/components/admin/Forms/NewsForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { News } from "@/types/global";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/app";

const AdminNewsCreate: NextPageWithLayout<undefined> = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ news: News }>({ user });

  const onCreateNews = async (news: News) => {
    const res = await onCreate(`/admin-news`, { news });

    if (res !== undefined) {
      toast.success("News successfully created!");

      setTimeout(() => {
        router.push("/admin/news");
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
        <h2 className="text-gray-600 font-bold">Create News</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          <NewsForm pending={pending} onSaveNews={onCreateNews} />
        </Panel>
      </div>
    </div>
  );
};

AdminNewsCreate.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

// http://www.ourhut.co.uk/sublime-structures-lesson-plans/

export default AdminNewsCreate;
