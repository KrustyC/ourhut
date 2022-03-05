import { useEffect } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { ResearchCard } from "@/components/admin/Cards/ResearchCard";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { toast } from "react-toastify";
import { Research } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

const AdminResearches: NextPageWithLayout<undefined> = () => {
  const {
    items: researches,
    loading,
    error,
    itemToRemoveIndex: researchToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveResearch,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ researches: Research[] }, Research>({
    fetchPath: "/admin-researches",
    parseResponse: (response) => response.researches,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching researches");
    }
  }, [error]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {researches.map((research, index) => (
              <ResearchCard
                key={research._id}
                research={research}
                onWantToRemoveResearch={() => onWantToRemoveResearch(index)}
              />
            ))}
          </div>
        )}
      </div>

      {researchToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="Research"
          itemToDelete={researches[researchToRemoveIndex]}
          questionItem={researches[researchToRemoveIndex].title}
          deletePath={`/admin-researches?id=${researches[researchToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminResearchesLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="Researches"
      subtitle="Here you can manage your researches."
      itemName="Research"
      createItemPath="/admin/researches/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminResearches.Layout = AdminResearchesLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminResearches;
