import dictionaryBy from './languages/by.json';
import dictionaryEn from './languages/en.json';
import dictionaryRu from './languages/ru.json';
import dictionaryUk from './languages/uk.json';

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
  uk: {
    translation: {
      ...dictionaryUk
    }
  },
  ru: {
    translation: {
      ...dictionaryRu
    }
  }
};
