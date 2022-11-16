import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import replace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const prod = mode === "production";
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [
      replace({
        __BASE_URL__: () => (prod ? "<@- base_url @>" : env.BASE_URL),
        __WS_URL__: () => (prod ? "<@- ws_url @>" : env.WS_URL),
      }),
      svelte(),
    ],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
        },
      },
    },
  });
};
