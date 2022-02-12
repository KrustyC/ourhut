import { useEffect } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { SchoolCard } from "@/components/admin/Cards/SchoolCard";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { toast } from "react-toastify";
import { School } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

const AdminSchools: NextPageWithLayout<undefined> = () => {
  const {
    items: schools,
    loading,
    error,
    itemToRemoveIndex: schoolToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveSchool,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ schools: School[] }, School>({
    fetchPath: "/admin-schools",
    parseResponse: (response) => response.schools,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching schools");
    }
  }, [error]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {schools.map((school, index) => (
              <SchoolCard
                key={school._id}
                school={school}
                onWantToRemoveSchool={() => onWantToRemoveSchool(index)}
              />
            ))}
          </div>
        )}
      </div>

      {schoolToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="school"
          itemToDelete={schools[schoolToRemoveIndex]}
          questionItem={schools[schoolToRemoveIndex].name}
          deletePath={`/admin-schools?id=${schools[schoolToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminSchoolsLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="Schools"
      subtitle="Here you can manage your schools."
      itemName="School"
      createItemPath="/admin/schools/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminSchools.Layout = AdminSchoolsLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminSchools;
