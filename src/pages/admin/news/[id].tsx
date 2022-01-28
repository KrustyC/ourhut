import { useEffect } from "react";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "src/contexts/AuthContext";
import { AdminLayout } from "src/layouts/AdminLayout";
import { LoadingSpinner } from "src/components/admin/LoadingSpinner";
import { NewsForm } from "src/components/admin/Forms/NewsForm";
import { useNetlifyGetFunction } from "src/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "src/hooks/useNetlifyPutFunction";
import { Panel } from "src/components/admin/Panel";
import { News } from "src/types/global";
import { NextPageWithLayout } from "src/types/app";

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

const AdminNewsEdit: NextPageWithLayout = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

AdminNewsEdit.Layout = AdminLayout;

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

export default AdminNewsEdit;
