<script>
  export let event = {};
</script>

<div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"
        >{event.title}</span
      >
      <br />
      <a
        href={`/admin/events/${event.slug}`}
        class="text-base font-normal text-admin-link"
      >
        Edit
      </a>
    </div>
  </div>
</div>
