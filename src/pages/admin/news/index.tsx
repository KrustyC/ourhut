import { useEffect } from "react";
import { AdminLayout } from "src/layouts/AdminLayout";
import { IndexLayout } from "src/layouts/AdminIndexLayout";
import { DeleteItemModal } from "src/components/admin/DeleteItemModal";
import { NewsCard } from "src/components/admin/Cards/NewsCard";
import { LoadingSpinner } from "src/components/admin/LoadingSpinner";
import { useAdminIndexList } from "src/hooks/useAdminIndexList";
import { toast } from "react-toastify";
import { News } from "src/types/global";
import { NextPageWithLayout } from "src/types/app";

const AdminNews: NextPageWithLayout = () => {
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
  }, [error]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {news.map((news, index) => (
              <NewsCard
                key={news._id}
                news={news}
                onWantToRemoveNews={() => onWantToRemoveNews(index)}
              />
            ))}
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
