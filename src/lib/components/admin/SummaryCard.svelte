<script>
  export let title = "34 News";
  export let link = {
    path: "/",
    copy: "",
  };
</script>

<div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <span class="text-2xl sm:text-3xl leading-none font-bold text-gray-900"
        >{title}</span
      >
      <br />
      <a href={link.path} class="text-base font-normal text-admin-link">
        {link.copy}
      </a>
    </div>
  </div>
</div>
