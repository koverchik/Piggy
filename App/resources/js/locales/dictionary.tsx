import dictionaryBy from './languages/by.json';
import dictionaryEn from './languages/en.json';
import dictionaryRu from './languages/ru.json';
import dictionaryUa from './languages/ua.json';

export const resources = {
  en: {
    translation: {
      ...dictionaryEn
    }
  },
  by: {
    translation: {
      ...dictionaryBy
    }
  },
  ua: {
    translation: {
      ...dictionaryUa
    }
  },
  ru: {
    translation: {
      ...dictionaryRu
    }
  }
};
