import { useEffect } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { NewsCard } from "@/components/admin/Cards/NewsCard";
import { Editor } from "@/components/admin/Editor";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { useAdminNewsHeadline } from "@/hooks/useAdminNewsHeadline";
import { toast } from "react-toastify";
import { News } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

const AdminNews: NextPageWithLayout<undefined> = () => {
  const {
    newsHeadline,
    newsHeadlineLoading,
    newsHeadlineError,
    onChangeHeadline,
    saveHeadlineHandler: {
      onSave,
      success: saveSuccess,
      pending: pendingSave,
      error: saveError,
    },
  } = useAdminNewsHeadline();

  const {
    items: news,
    loading,
    error,
    itemToRemoveIndex: newsToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveNews,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ news: News[] }, News>({
    fetchPath: "/admin-news",
    parseResponse: (response) => response.news,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching news");
    }

    if (newsHeadlineError) {
      toast.error("Error fetching headline");
    }

    if (saveError) {
      toast.error("Error updating headline headline");
    }

    if (saveSuccess) {
      toast.success("Headline successfully updated");
    }
  }, [error, newsHeadlineError, saveError, saveSuccess]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading || newsHeadlineLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full flex flex-col">
            <div className="w-full flex flex-col mb-8">
              <h2 className="text-3xl text-black font-bold mb-2">
                Your headline
              </h2>
              <div className="bg-white w-1/2 h-40">
                <Editor value={newsHeadline} onChange={onChangeHeadline} />
              </div>
              <button
                className="btn-admin btn-primary mt-4 w-60 font-bold"
                type="button"
                onClick={onSave}
                disabled={pendingSave}
              >
                {pendingSave ? <LoadingSpinner /> : "Update Headline"}
              </button>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {news.map((news, index) => (
                <NewsCard
                  key={news._id}
                  news={news}
                  onWantToRemoveNews={() => onWantToRemoveNews(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {newsToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="news"
          itemToDelete={news[newsToRemoveIndex]}
          questionItem={news[newsToRemoveIndex].title}
          deletePath={`/admin-news?id=${news[newsToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminNewsLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="News"
      subtitle="Here you can manage your news."
      itemName="News"
      createItemPath="/admin/news/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminNews.Layout = AdminNewsLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminNews;
