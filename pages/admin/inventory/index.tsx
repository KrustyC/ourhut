import { AdminLayout } from "layouts/AdminLayout";
import { NextPageWithLayout } from "@/types/app";

const AdminInventory: NextPageWithLayout = () => {
  return (
    <div className="p-4">
      <h2 className="text-gray-600 font-bold">Resources</h2>
      <p className="text-gray-600">
        In this section you can manage your whole inventory.
      </p>
    </div>
  );
};

AdminInventory.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminInventory;
