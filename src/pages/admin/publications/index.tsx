import { useEffect } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { PublicationCard } from "@/components/admin/Cards/PublicationCard";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { toast } from "react-toastify";
import { Publication } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

const AdminPublications: NextPageWithLayout<undefined> = () => {
  const {
    items: publications,
    loading,
    error,
    itemToRemoveIndex: publicationToRemoveIndex,
    onWantToRemoveItem: onWantToRemovePublication,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ publications: Publication[] }, Publication>({
    fetchPath: "/admin-publications",
    parseResponse: (response) => response.publications,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching publications");
    }
  }, [error]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {publications.map((publication, index) => (
              <PublicationCard
                key={publication._id}
                publication={publication}
                onWantToRemovePublication={() =>
                  onWantToRemovePublication(index)
                }
              />
            ))}
          </div>
        )}
      </div>

      {publicationToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="Teaching Resource"
          itemToDelete={publications[publicationToRemoveIndex]}
          questionItem={publications[publicationToRemoveIndex].title}
          deletePath={`/admin-publications?id=${publications[publicationToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminPublicationsLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="Publications"
      subtitle="Here you can manage your publications."
      itemName="Publication"
      createItemPath="/admin/publications/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminPublications.Layout = AdminPublicationsLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminPublications;
