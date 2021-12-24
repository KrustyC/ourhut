<script>
  import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
  import { format } from "date-fns";

  export let selectedDate = undefined;
  let selected = selectedDate;

  function onDateSelected(e) {
    selected = selected = e.detail;
  }

  $: selectedDate = selected ? format(selected.date, "dd/MM/yyy") : undefined;
</script>

<div>
  <DatePicker {selected} range={false} on:date-selected={onDateSelected} />
</div>
