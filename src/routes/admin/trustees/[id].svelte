<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { notifications } from "$lib/stores/notifications";
  import Panel from "$lib/components/admin/Panel.svelte";
  import TrusteeForm from "$lib/components/admin/Forms/TrusteeForm/TrusteeForm.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import { updateTrustee } from "$lib/components/admin/Forms/TrusteeForm/helpers";

  let trusteeData = null;
  let loading = false; // track the initial load
  let pending = false; // track the trustee update
  const id = $page.params.id;
  let error = false;

  let trustee = writable();

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson(`/admin-trustees?id=${id}`, { token });

    trustee.set(res.trustee);
    loading = false;
  });

  trustee.subscribe((data) => {
    trusteeData = data;
  });

  async function onSaveTrustee() {
    pending = true;
    try {
      await updateTrustee({ id, trusteeData, status, token });
      notifications.success(
        {
          title: "Trustee Updated",
          text: "Your trustee has been sucessfully updated!",
        },
        3000
      );

      setTimeout(() => {
        goto("/admin/trustees");
      }, 500);
    } catch (err) {
      error = true;
      notifications.danger(
        {
          title: "An error occurred",
          text: "Your trustee could not be updated, please try again later or contact the web admin.",
        },
        5000
      );
    }

    pending = false;
    trustee = null;
  }
</script>

<div class="p-4">
  <div class="flex flex-col sm:w-full xl:w-8/12">
    <div class="flex justify-between items-center w-100">
      <h2 class="text-gray-600 font-bold">Update Trustee</h2>
      <a href="/admin/trustees" class="text-black">Go Back</a>
    </div>

    <div class="mt-4 w-100">
      {#if loading}
        <LoadingSpinner />
      {:else if trusteeData}
        <Panel class="w-100">
          <TrusteeForm {pending} {trustee} {onSaveTrustee} />
        </Panel>
      {/if}
    </div>
  </div>
</div>
