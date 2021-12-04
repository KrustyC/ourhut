/** @type {import('@sveltejs/kit').Config} */
import adapter from "@sveltejs/adapter-netlify";
import { imagetools } from "vite-imagetools";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";

const config = {
  extensions: [".svelte", ".md", ".svelte.md"],
  preprocess: [
    mdsvex({ extensions: [".svelte.md", ".md", ".svx"] }),
    preprocess({
      scss: {
        prependData: "@import 'src/lib/styles/variables.scss';",
      },
    }),
  ],
  kit: {
    adapter: adapter(),
    files: {
      hooks: "src/hooks",
    },
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    vite: {
      define: {
        "process.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString()),
      },
      plugins: [imagetools({ force: true })],
    },
  },
};

export default config;
