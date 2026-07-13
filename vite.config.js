// import { defineConfig } from "vite";
// import { resolve } from "path";

// export default defineConfig({
//   build: {
//     outDir: "dist",
//     emptyOutDir: true,
//     rollupOptions: {
//       input: {
//         background: resolve(__dirname, "src/background/background.js"),
//       },
//       output: {
//         entryFileNames: "[name].js",
//       },
//     },
//   },
// });


import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";

import manifest from "./src/manifest";

export default defineConfig({
  plugins: [
    crx({
      manifest,
    }),
  ],
});