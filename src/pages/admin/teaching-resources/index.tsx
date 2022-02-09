import { useEffect } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { TeachingResourceCard } from "@/components/admin/Cards/TeachingResourceCard";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { toast } from "react-toastify";
import { TeachingResource } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

const AdminTeachingResources: NextPageWithLayout<undefined> =  () => {
  const {
    items: teachingResources,
    loading,
    error,
    itemToRemoveIndex: teachingResourceToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveTeachingResource,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<
    { teachingResources: TeachingResource[] },
    TeachingResource
  >({
    fetchPath: "/admin-teaching-resources",
    parseResponse: (response) => response.teachingResources,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching teachingResources");
    }
  }, [error]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {teachingResources.map((teachingResource, index) => (
              <TeachingResourceCard
                key={teachingResource._id}
                teachingResource={teachingResource}
                onWantToRemoveTeachingResource={() =>
                  onWantToRemoveTeachingResource(index)
                }
              />
            ))}
          </div>
        )}
      </div>

      {teachingResourceToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="Teaching Resource"
          itemToDelete={teachingResources[teachingResourceToRemoveIndex]}
          questionItem={teachingResources[teachingResourceToRemoveIndex].title}
          deletePath={`/admin-teaching-resources?id=${teachingResources[teachingResourceToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminTeachingResourcesLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="Teacher Resources"
      subtitle="Here you can manage your teaching resources."
      itemName="Teacher Resource"
      createItemPath="/admin/teaching-resources/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminTeachingResources.Layout = AdminTeachingResourcesLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminTeachingResources;
