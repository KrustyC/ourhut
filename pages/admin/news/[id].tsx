import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { NewsForm } from "@/components/admin/Forms/NewsForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { News } from "@/types/global";

interface EditProps {
  id: string;
}

const Edit: React.FC<EditProps> = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useNetlifyGetFunction<{ news: News }>({
    fetchUrlPath: `/admin-news?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ news: News }>({ user });

  const onEditNews = async (updatedNews: News) => {
    const res = await onUpdate(`/admin-news?id=${id}`, {
      news: updatedNews,
    });

    if (res !== undefined) {
      toast.success("News successfully updated");

      setTimeout(() => {
        router.push("/admin/news");
      }, 800);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching news");
    }

    if (updateError) {
      toast.error("Error updating news");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit News</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <NewsForm
              pending={pending}
              news={data?.news}
              onSaveNews={onEditNews}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminNewsEdit: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

(AdminNewsEdit as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminNewsEdit;
