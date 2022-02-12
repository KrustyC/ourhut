import { AdminLayout } from "@/layouts/AdminLayout";
import { NextPageWithLayout } from "@/types/app";

const AdminFiles: NextPageWithLayout<undefined> = () => {
  return (
    <div className="p-4">
      <h2 className="text-gray-600 font-bold">Files</h2>
      <p className="text-gray-600">In this section you can manage your news.</p>
    </div>
  );
};

AdminFiles.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminFiles;
