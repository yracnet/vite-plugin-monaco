import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

//https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      external: [
        "monaco-editor",
        "monaco-editor/esm/metadata.js",
        "vite",
        "path",
        "fs",
        "url",
      ],
    },
    lib: {
      entry: resolve("src/main.ts"),
      formats: ["es"],
      fileName: () => "[format]/[name].js",
    },
  },
  plugins: [
    dts({
      outDir: "dist/ts",
      insertTypesEntry: true,
      include: [],
    }),
  ],
});
