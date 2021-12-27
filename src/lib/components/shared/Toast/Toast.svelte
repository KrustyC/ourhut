<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { notifications, NotificationType } from "$lib/stores/notifications";
  import ToastIcon from "./ToastIcon.svelte";

  export let backgrounds = {
    [NotificationType.DANGER]: "bg-red-600",
    [NotificationType.SUCCESS]: "bg-green-500",
    [NotificationType.WARNING]: "bg-yellow-400",
    [NotificationType.INFO]: "bg-blue-600",
    [NotificationType.DEFAULT]: "bg-blue-600",
  };

  export let borders = {
    [NotificationType.DANGER]: "border-red-400",
    [NotificationType.SUCCESS]: "border-green-400",
    [NotificationType.WARNING]: "border-yellow-400",
    [NotificationType.INFO]: "border-blue-500",
    [NotificationType.DEFAULT]: "border-blue-500",
  };
</script>

<div class="notifications">
  {#each $notifications as notification (notification.id)}
    <div
      animate:flip
      transition:fly={{ x: 30 }}
      class={`toast ${
        backgrounds[notification.type]
      } shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}
      id="static-example"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-mdb-autohide="false"
    >
      <div
        class={`${
          backgrounds[notification.type]
        } flex justify-between items-center py-2 px-3 bg-clip-padding border-b ${
          borders[notification.type]
        } rounded-t-lg`}
      >
        <p class="font-bold text-white flex items-center">
          <ToastIcon type={notification.type} />
          {notification.message.title}
        </p>
        <div class="flex items-center">
          <button
            type="button"
            class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
            data-mdb-dismiss="toast"
            aria-label="Close"
          />
        </div>
      </div>
      <div
        class={`p-3 ${
          backgrounds[notification.type]
        } rounded-b-lg break-words text-white`}
      >
        {notification.message.text}
      </div>
    </div>
  {/each}
</div>

<style>
  .notifications {
    position: fixed;
    top: 15%;
    right: 2%;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;
  }

  .toast {
    flex: 0 0 auto;
    margin-bottom: 10px;
  }

  .content {
    padding: 10px;
    display: block;
    color: white;
    font-weight: 500;
  }
</style>
