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
  import SchoolForm from "$lib/components/admin/Forms/SchoolForm/SchoolForm.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import { updateSchool } from "$lib/components/admin/Forms/SchoolForm/helpers";

  let schoolData = null;
  let loading = false; // track the initial load
  let pending = false; // track the school update
  const id = $page.params.id;
  let error = false;

  let school = writable();

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson(`/admin-schools?id=${id}`, { token });

    school.set(res.school);
    loading = false;
  });

  school.subscribe((data) => {
    schoolData = data;
  });

  async function onSaveSchool() {
    pending = true;
    try {
      await updateSchool({ id, schoolData, status, token });
      notifications.success(
        {
          title: "School Updated",
          text: "Your school has been sucessfully updated!",
        },
        3000
      );

      setTimeout(() => {
        goto("/admin/schools");
      }, 500);
    } catch (err) {
      error = true;
      notifications.danger(
        {
          title: "An error occurred",
          text: "Your school could not be updated, please try again later or contact the web admin.",
        },
        5000
      );
    }

    pending = false;
    school = null;
  }
</script>

<div class="p-4">
  <div class="flex flex-col sm:w-full xl:w-8/12">
    <div class="flex justify-between items-center w-100">
      <h2 class="text-gray-600 font-bold">Update School</h2>
      <a href="/admin/schools" class="text-black">Go Back</a>
    </div>

    <div class="mt-4 w-100">
      {#if loading}
        <LoadingSpinner />
      {:else if schoolData}
        <Panel class="w-100">
          <SchoolForm {pending} {school} {onSaveSchool} />
        </Panel>
      {/if}
    </div>
  </div>
</div>
