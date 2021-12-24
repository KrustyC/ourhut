<script>
  import TextInput from "./TextInput.svelte";

  export let name = "time";
  export let time = undefined;
  export let period = "AM";

  function onChangePeriod(e) {
    period = e.target.value;
  }

  const periods = ["AM", "PM"];
</script>

<div>
  <input
    id={name}
    {name}
    bind:value={time}
    type="text"
    placeholder="HH:mm"
    class="w-24 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  />

  <select
    class="form-select shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    value={period}
    on:change={onChangePeriod}
  >
    {#each periods as periodOption}
      <option value={periodOption}>
        {periodOption}
      </option>
    {/each}
  </select>
</div>
