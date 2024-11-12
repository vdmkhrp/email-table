import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import { dirname } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import chokidar from "chokidar";
import { exec } from "child_process";

const __dirname = dirname(new URL(import.meta.url).pathname);

const getHtmlInputs = () => {
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith(".html"));
  return files.reduce((inputs, file) => {
    const key = file.replace(/\.html$/, "");
    inputs[key] = resolve(__dirname, file);
    return inputs;
  }, {});
};

export default defineConfig({
  root: __dirname,
  base: "./",
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        ...getHtmlInputs(),
      },
    },
    outDir: "dist",
    assetsDir: "assets",
  },
});
