<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import BubbleMenu from "@tiptap/extension-bubble-menu";
  import Menu from "./BubbleMenu.svelte";

  export let content = "";

  let element;
  let editor;

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [
        StarterKit,
        BubbleMenu.configure({
          element: document.querySelector(".bubble-menu"),
        }),
      ],
      content,
      onTransaction: () => {
        editor = editor;
      },
    });

    editor.on("update", ({ editor }) => {
      content = editor.getJSON();
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div
  class="h-80 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
>
  <div bind:this={element} class="h-full" />
</div>

<style>
  :global(.ProseMirror) {
    height: 100%;
    outline: none !important;
  }
</style>
