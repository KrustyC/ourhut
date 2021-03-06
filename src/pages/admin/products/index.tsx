import { useEffect } from "react";
import { toast } from "react-toastify";
import { AdminLayout } from "@/layouts/AdminLayout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { IndexLayout } from "@/layouts/AdminIndexLayout";
import { ProductCard } from "@/components/admin/Cards/ProductCard";
import { Product } from "@/types/global";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";
import { NextPageWithLayout } from "@/types/app";

const AdminProducts: NextPageWithLayout<undefined> = () => {
  const {
    items: products,
    loading,
    error,
    itemToRemoveIndex: productToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveProduct,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ products: Product[] }, Product>({
    fetchPath: "/admin-products",
    parseResponse: (response) => response.products,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching products");
    }
  }, [error]);

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                onWantToRemoveProduct={() => onWantToRemoveProduct(index)}
              />
            ))}
          </div>
        )}
      </div>

      {productToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="product"
          itemToDelete={products[productToRemoveIndex]}
          questionItem={products[productToRemoveIndex].name}
          deletePath={`/admin-products?id=${products[productToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

const AdminProductsLayout: React.FC = ({ children }) => (
  <AdminLayout>
    <IndexLayout
      title="Products"
      subtitle="Here you can manage your products."
      itemName="Product"
      createItemPath="/admin/products/new"
    >
      {children}
    </IndexLayout>
  </AdminLayout>
);

AdminProducts.Layout = AdminProductsLayout;

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default AdminProducts;
