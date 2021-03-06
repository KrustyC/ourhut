import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ProductForm } from "@/components/admin/Forms/ProductForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { Product, FormProduct } from "@/types/global";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@/types/app";

const AdminProductsCreate: NextPageWithLayout<undefined> = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ product: Product }>({ user });

  const onCreateProduct = async (product: FormProduct) => {
    const res = await onCreate(`/admin-products`, {
      product: {
        ...product,
        price: parseFloat(product.price),
      },
    });

    if (res !== undefined) {
      toast.success("Product successfully added!");
      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Create Product</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full md:w-10/12">
          <ProductForm pending={pending} onSaveProduct={onCreateProduct} />
        </Panel>
      </div>
    </div>
  );
};

AdminProductsCreate.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminProductsCreate;
