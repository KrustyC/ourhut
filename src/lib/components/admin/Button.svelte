<script>
  export let disabled = false;
  export let onClick = () => {};;
</script>

<button
  disabled={disabled}
  class="h-12 w-28 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
  on:click={onClick}
>
  Cancel
</button>
