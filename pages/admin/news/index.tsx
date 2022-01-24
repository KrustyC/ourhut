import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { NewsCard } from "@/components/admin/Cards/NewsCard";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { toast } from "react-toastify";
import { News } from "@/types/global";

const AdminNews: NextPage = () => {
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

(AdminNews as any).Layout = function Layout(page: ReactElement) {
  return (
    <AdminLayout>
      <IndexLayout
        title="News"
        subtitle="Here you can manage your news."
        itemName="News"
        createItemPath="/admin/news/new"
      >
        {page}
      </IndexLayout>
    </AdminLayout>
  );
};

export default AdminNews;
