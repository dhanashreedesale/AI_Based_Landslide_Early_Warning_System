import { create } from 'zustand';
import { LanguageCode, TranslationSchema } from './types';
import { SUPPORTED_LANGUAGES } from './languages';
import { en } from './locales/en';
import { hi } from './locales/hi';
import { as } from './locales/as';
import { bn } from './locales/bn';
import { ne } from './locales/ne';
import { mni } from './locales/mni';
import { lus } from './locales/lus';
import { kha } from './locales/kha';
import { doi } from './locales/doi';
import { ur } from './locales/ur';

const LOCALES: Record<LanguageCode, TranslationSchema> = {
  en,
  hi,
  as,
  bn,
  ne,
  mni,
  lus,
  kha,
  doi,
  ur,
};

const REGION_KEY_MAP: Record<string, keyof TranslationSchema['regions']> = {
  'Uttarakhand': 'uttarakhand',
  'Himachal Pradesh': 'himachalPradesh',
  'Jammu & Kashmir': 'jammuKashmir',
  'Ladakh': 'ladakh',
  'Sikkim': 'sikkim',
  'Arunachal Pradesh': 'arunachalPradesh',
  'Assam': 'assam',
  'Meghalaya': 'meghalaya',
  'Nagaland': 'nagaland',
  'Manipur': 'manipur',
  'Mizoram': 'mizoram',
  'Tripura': 'tripura',
};

const GROUP_KEY_MAP: Record<string, keyof TranslationSchema['regionGroups']> = {
  'Western & Central Himalayas': 'westernCentralHimalayas',
  'Eastern Himalayas & Northeast': 'easternHimalayasNortheast',
};

interface I18nState {
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const getInitialLanguage = (): LanguageCode => {
  try {
    const saved = localStorage.getItem('app_language');
    if (saved && saved in LOCALES) {
      return saved as LanguageCode;
    }
  } catch {
    // Ignore storage error
  }
  return 'en';
};

export const useI18nStore = create<I18nState>((set) => ({
  currentLanguage: getInitialLanguage(),
  setLanguage: (lang) => {
    try {
      localStorage.setItem('app_language', lang);
    } catch {
      // Ignore storage error
    }
    const isRtl = lang === 'ur';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    set({ currentLanguage: lang });
  },
}));

export const useTranslation = () => {
  const currentLanguage = useI18nStore((state) => state.currentLanguage);
  const setLanguage = useI18nStore((state) => state.setLanguage);

  const currentLocale = LOCALES[currentLanguage] || LOCALES.en;
  const fallbackLocale = LOCALES.en;
  const currentLanguageInfo =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const t = (path: string, params?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let value: any = currentLocale;
    let fallbackValue: any = fallbackLocale;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        value = undefined;
      }

      if (fallbackValue && typeof fallbackValue === 'object' && key in fallbackValue) {
        fallbackValue = fallbackValue[key];
      } else {
        fallbackValue = undefined;
      }
    }

    let result = typeof value === 'string' ? value : typeof fallbackValue === 'string' ? fallbackValue : path;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
      });
    }

    return result;
  };

  const tRegion = (regionName: string): string => {
    const key = REGION_KEY_MAP[regionName];
    if (key && currentLocale.regions[key]) {
      return currentLocale.regions[key];
    }
    return regionName;
  };

  const tGroup = (groupName: string): string => {
    const key = GROUP_KEY_MAP[groupName];
    if (key && currentLocale.regionGroups[key]) {
      return currentLocale.regionGroups[key];
    }
    return groupName;
  };

  const tHazardLevel = (level: 'severe' | 'high' | 'medium' | 'low' | string): string => {
    const validLevel = level as keyof TranslationSchema['hazardLevels'];
    if (currentLocale.hazardLevels[validLevel]) {
      return currentLocale.hazardLevels[validLevel];
    }
    return level;
  };

  return {
    t,
    tRegion,
    tGroup,
    tHazardLevel,
    currentLanguage,
    currentLanguageInfo,
    setLanguage,
    languages: SUPPORTED_LANGUAGES,
    isRTL: currentLanguage === 'ur',
  };
};

export * from './types';
export * from './languages';
