<script lang="ts">
  export let label: string = "";
  export let name: string = "";
  export let placeholder: string = "";
  export let width: string = "w-full";

  export let value = "";

  export let onBlur = (e: any) => {};
</script>

<div class="flex flex-col">
  <label
    class="uppercase block text-gray-700 text-sm font-bold mb-2"
    for={name}
  >
    {label}
  </label>
  <input
    id={name}
    bind:value
    on:blur={onBlur}
    {name}
    type="url"
    {placeholder}
    class={`${width} shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
  />
</div>
