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

<Menu {editor} />

<div class="text-gray-700 bg-gray-200">
  <div bind:this={element} />
</div>
