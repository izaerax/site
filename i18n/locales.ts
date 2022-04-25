import it from './it'
import en from './en'

export default {
  locales: ['en', 'it'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: en,
        it: it,
      }
    }
}