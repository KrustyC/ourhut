<script lang="ts">
  import MarkerIcon from "$lib/components/icons/MarkerIcon.svelte";

  export let school = {};
  export let onWantToRemoveSchool = () => {};
</script>

<div class="bg-white shadow rounded-lg p-4 ">
  <div class="flex flex-col">
    <span class="text-xl font-bold text-gray-900">
      {school.name}
    </span>

    <div class="flex mb-2">
      <div class="flex items-end mr-4">
        <div class="icon-wrapper">
          <MarkerIcon height="h-4" width="w-4" />
        </div>
        <span class="ml-1 text-sm text-gray-600">
          {school.postcode}
        </span>
      </div>
    </div>

    <div class="flex items-end justify-end mt-2 w-100">
      <div>
        <a
          href={`/admin/schools/${school._id}`}
          class="btn-admin btn-primary btn-sm text-base uppercase mr-2"
        >
          Edit
        </a>

        <button
          class="btn-admin btn-danger btn-sm text-base uppercase"
          on:click={onWantToRemoveSchool}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .marker-wrapper {
    margin-bottom: 3px;
  }
</style>
