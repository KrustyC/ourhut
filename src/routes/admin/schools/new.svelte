<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import { user } from "$lib/stores/user";
  import { notifications } from "$lib/stores/notifications";
  import Panel from "$lib/components/admin/Panel.svelte";
  import SchoolForm from "$lib/components/admin/Forms/SchoolForm/SchoolForm.svelte";
  import { createSchool } from "$lib/components/admin/Forms/SchoolForm/helpers";

  let schoolData = null;
  let pending = false;
  let error = false;

  export let school = writable({
    name: "",
    description: "",
  });

  school.subscribe((data) => {
    schoolData = data;
  });

  $: token = $user !== null ? $user.access_token : null;

  async function onCreateSchool() {
    pending = true;
    try {
      await createSchool({ schoolData, status, token });

      notifications.success(
        {
          title: "School Succesfully Created",
          text: "Your school has been sucessfully added",
        },
        3000
      );

      pending = false;
      setTimeout(() => {
        goto("/admin/schools");
      }, 500);
    } catch (err) {
      pending = false;
      notifications.danger(
        {
          title: "An error occurred",
          text: "Your school could not be created, please try again later or contact the web admin.",
        },
        5000
      );
    }
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Create School</h2>
  </div>

  <div class="flex justify-between w-100 mt-4">
    <Panel class="mr-4 sm:w-full xl:w-8/12 ">
      <SchoolForm {pending} {school} onSaveSchool={onCreateSchool} />
    </Panel>
  </div>
</div>
