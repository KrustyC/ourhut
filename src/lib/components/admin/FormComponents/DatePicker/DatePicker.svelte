<script>
  import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
  import { format } from "date-fns";
  import { parseDate } from "./helpers";

  export let selectedDate = undefined;
  let selected = parseDate(selectedDate);

  function onDateSelected(e) {
    selected = e.detail;
    selectedDate = format(e.detail.date, "dd/MM/yyy");
  }
</script>

<div>
  <DatePicker {selected} range={false} on:date-selected={onDateSelected} />
</div>
