<script lang="ts">
  export let error: string = "";
</script>

<div
  class="text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
  role="alert"
>
  <strong class="font-bold">The following error needs to be fixed before submitting:</strong>
  <br />
  <span class="block">- {error}</span>
</div>
