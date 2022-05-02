import { defineNuxtConfig } from 'nuxt3'
import locales from './i18n/locales'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    modules: [
        '@vueuse/nuxt',
        '@pinia/nuxt',
        //['@nuxtjs/i18n', locales]
    ],
    components: {
    dirs: [
        '~/components',
        '~/components/UI',
        '~/components/command/render'
    ]
    },
    css: ["~/assets/css/main.scss"],
    server: {
        host: '0.0.0.0',
        port: 3000,
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
})
