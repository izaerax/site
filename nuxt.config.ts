import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Olti Dajce",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "favicon.png" }],
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    //['@nuxtjs/i18n', locales]
  ],
  components: {
    dirs: ["~/components/", "~/components/UI/", "~/components/command/render/"],
  },
  css: ["~/assets/css/main.scss"],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  typescript: {
    shim: false,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/css/_variables";',
        },
      },
    },
  },
});
