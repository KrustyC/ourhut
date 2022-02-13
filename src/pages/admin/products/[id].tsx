import { useEffect } from "react";
import { GetStaticPaths } from "next";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { ProductForm } from "@/components/admin/Forms/ProductForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { Product, FormProduct } from "@/types/global";
import { NextPageWithLayout } from "@/types/app";

interface EditProps {
  id: string;
}

const Edit: React.FC<EditProps> = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useNetlifyGetFunction<{ product: Product }>({
    fetchUrlPath: `/admin-products?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ product: Product }>({ user });

  const onEditProduct = async (updatedProduct: FormProduct) => {
    const res = await onUpdate(`/admin-products?id=${id}`, {
      product: {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price || "0"),
      },
    });

    if (res !== undefined) {
      toast.success("Product successfully updated!");
      setTimeout(() => {
        router.push("/admin/products");
      }, 800);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching product");
    }

    if (updateError) {
      toast.error("Error updating product");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit Product</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full md:w-10/12">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductForm
              pending={pending}
              product={data?.product}
              onSaveProduct={onEditProduct}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminProductsEdit: NextPageWithLayout<undefined> = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

AdminProductsEdit.Layout = AdminLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default AdminProductsEdit;
