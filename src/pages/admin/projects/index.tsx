import { AdminLayout } from "@/layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { NextPageWithLayout } from "@/types/app";

const AdminProjects: NextPageWithLayout<undefined> =  () => {
  return (
    <div className="p-4">
      {/* <h2 className="text-gray-600 font-bold">Projects</h2>
      <p className="text-gray-600">In this section you can manage your projects.</p> */}
    </div>
  );
};

const AdminProjectsLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="Projects"
      subtitle="Here you can manage your projects."
      itemName="Projects"
      createItemPath="/admin/projects/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminProjects.Layout = AdminProjectsLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminProjects;
