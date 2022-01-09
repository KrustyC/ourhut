import { fetchJson } from "$lib/utils/fetch-json";

type ProductData = {
  name: string;
  description: Record<string, unknown>;
  image: string;
  price: number;
  etsyLink: string;
};

type CreateProductOptions = {
  productData: ProductData;
  token?: string;
};

export async function createProduct({
  productData,
  token,
}: CreateProductOptions) {
  return fetchJson(`/admin-products`, {
    method: "POST",
    body: {
      product: productData,
    },
    token,
  });
}

type UpdateProductOptions = {
  id: string;
  productData: ProductData;
  token?: string;
};

export async function updateProduct({
  id,
  productData,
  token,
}: UpdateProductOptions) {
  return fetchJson(`/admin-products?id=${id}`, {
    method: "PUT",
    body: {
      product: productData,
    },
    token,
  });
}
