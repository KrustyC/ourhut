<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import { user } from "$lib/stores/user";
  import { notifications } from "$lib/stores/notifications";
  import Panel from "$lib/components/admin/Panel.svelte";
  import TrusteeForm from "$lib/components/admin/Forms/TrusteeForm/TrusteeForm.svelte";
  import { createTrustee } from "$lib/components/admin/Forms/TrusteeForm/helpers";

  let trusteeData = null;
  let pending = false;
  let error = false;

  export let trustee = writable({
    name: "",
    description: "",
  });

  trustee.subscribe((data) => {
    trusteeData = data;
  });

  $: token = $user !== null ? $user.access_token : null;

  async function onCreateTrustee() {
    pending = true;
    try {
      await createTrustee({ trusteeData, status, token });

      notifications.success(
        {
          title: "Trustee Succesfully Created",
          text: "Your trustee has been sucessfully added",
        },
        3000
      );

      pending = false;
      setTimeout(() => {
        goto("/admin/trustees");
      }, 500);
    } catch (err) {
      pending = false;
      notifications.danger(
        {
          title: "An error occurred",
          text: "Your trustee could not be created, please try again later or contact the web admin.",
        },
        5000
      );
    }
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Create Trustee</h2>
  </div>

  <div class="flex justify-between w-100 mt-4">
    <Panel class="mr-4 sm:w-full xl:w-8/12 ">
      <TrusteeForm {pending} {trustee} onSaveTrustee={onCreateTrustee} />
    </Panel>
  </div>
</div>
