import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import viteLogger from "vite-log-handler";
import babelMacros from "vite-plugin-babel-macros";

export default defineConfig(() => {
  return {
    build: {
      outDir: "dist",
    },
    // plugins: [react()],
    plugins: [
      babelMacros(),
      {
        name: "treat-js-files-as-jsx",
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;
          return transformWithEsbuild(code, id, {
            loader: "js",
            jsx: "automatic",
          });
        },
      },
      react(),
      viteLogger(),
      viteTsconfigPaths(),
    ],
   
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          ".js": "jsx",
        },
      },
    },
  };
});
