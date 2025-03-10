// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: "https://govarchive.us/",

  env: {
    schema: {
      NODE_ENV: envField.enum({
        context: "server",
        access: "public",
        default: "development",
        optional: true,
        values: ["production", "development"],
      }),
    },
  },

  experimental: {
    contentIntellisense: true,
    svg: true,
  },

  integrations: [icon()],
});