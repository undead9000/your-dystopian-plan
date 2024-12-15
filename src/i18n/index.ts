import { createI18n } from 'vue-i18n';
import { en_US } from './en_US';
import { uk } from './uk' 

export const i18n = createI18n({
    legacy: false,
    locale: 'en-US',
    messages: {
      'en-US': en_US,
      'uk': uk
    },
  })