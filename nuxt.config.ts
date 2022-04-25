import { defineNuxtConfig } from 'nuxt3'
import locales from './i18n/locales'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        '@pinia/nuxt',
        //['@nuxtjs/i18n', locales]
    ],
    css: ["~/assets/css/main.scss"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/css/_variables";',
                },
            },
        },
    },
})
