<script lang="ts">
  export let trustee = {};
  export let onWantToRemoveTrustee = () => {};
</script>

<div class="bg-white shadow rounded-lg p-4 ">
  <div class="flex flex-col">
    <span class="text-xl font-bold text-gray-900">
      {trustee.name}
    </span>

    <div class="flex items-end justify-end mt-2 w-100">
      <div>
        <a
          href={`/admin/trustees/${trustee._id}`}
          class="btn-admin btn-primary btn-sm text-base uppercase mr-2"
        >
          Edit
        </a>

        <button
          class="btn-admin btn-danger btn-sm text-base uppercase"
          on:click={onWantToRemoveTrustee}
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
