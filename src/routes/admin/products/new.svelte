<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import { user } from "$lib/stores/user";
  import { notifications } from "$lib/stores/notifications";
  import Panel from "$lib/components/admin/Panel.svelte";
  import ProductForm from "$lib/components/admin/Forms/ProductForm/ProductForm.svelte";
  import { createProduct } from "$lib/components/admin/Forms/ProductForm/helpers";

  let productData = null;
  let pending = false;
  let error = false;

  export let product = writable({
    name: "",
    description: "",
    image: "",
    price: null,
    etsyLink: "",
  });

  product.subscribe((data) => {
    productData = data;
  });

  $: token = $user !== null ? $user.access_token : null;

  async function onCreateProduct() {
    pending = true;
    try {
      await createProduct({ productData, token });

      notifications.success(
        {
          title: "Product Succesfully Created",
          text: "Your product has been sucessfully added",
        },
        3000
      );

      pending = false;
      setTimeout(() => {
        goto("/admin/products");
      }, 500);
    } catch (err) {
      pending = false;
      notifications.danger(
        {
          title: "An error occurred",
          text: "Your product could not be created, please try again later or contact the web admin.",
        },
        5000
      );
    }
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Create Product</h2>
  </div>

  <div class="flex justify-between w-100 mt-4">
    <Panel class="mr-4 sm:w-full xl:w-8/12 ">
      <ProductForm {pending} {product} onSaveProduct={onCreateProduct} />
    </Panel>
  </div>
</div>
