<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import BubbleMenu from "@tiptap/extension-bubble-menu";
  import Menu from "./BubbleMenu.svelte";

  export let content = "";

  let bubbleMenu;
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
  class="h-60 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
>
  <div class="bubble-menu" {bubbleMenu}>
    {#if editor}
      <div class="flex relative items-center bg-gray-800 rounded-lg py-4 h-8">
        <button
          class={`text-white h-8 w-8 border-r-2 rounded-l-lg border-white px-2 hover:bg-gray-600 ${
            editor.isActive("bold") ? "text-emerald-500" : ""
          }`}
          on:click={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          class={`text-white w-8 italic h-8 border-r-2 border-white px-2 hover:bg-gray-600 ${
            editor.isActive("italic") ? "text-emerald-500" : ""
          }`}
          on:click={() => editor.chain().focus().toggleItalic().run()}
        >
          i
        </button>
        <button
          class={`text-white w-8 h-8 px-2 rounded-r-lg hover:bg-gray-600 ${
            editor.isActive("strike") ? "text-emerald-500" : ""
          }`}
          on:click={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </button>
      </div>
    {/if}
  </div>

  <div bind:this={element} class="h-full" />
</div>

<style>
  :global(.ProseMirror) {
    height: 100%;
    outline: none !important;
  }
</style>
