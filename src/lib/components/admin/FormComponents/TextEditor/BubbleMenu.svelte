<script>
  export let editor;
</script>

{#if editor}
  <div class="bubble-menu">
    <button
      class={editor.isActive("bold") ? "is-active" : ""}
      onClick={() => editor.chain().focus().toggleBold().run()}
    >
      boldss
    </button>
    <button
      class={editor.isActive("italic") ? "is-active" : ""}
      onClick={() => editor.chain().focus().toggleItalic().run()}
    >
      italic
    </button>
    <button
      class={editor.isActive("strike") ? "is-active" : ""}
      onClick={() => editor.chain().focus().toggleStrike().run()}
    >
      strike
    </button>
  </div>
{/if}
