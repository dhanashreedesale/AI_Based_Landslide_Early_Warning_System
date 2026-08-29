import { LanguageInfo } from './types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  // National Languages
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇮🇳',
    category: 'national',
    regionTarget: 'Universal / All 12 States & UTs',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    category: 'national',
    regionTarget: 'Uttarakhand, HP, J&K, Ladakh, Pan-India',
  },

  // Focus 12 Himalayan & Northeast Regional Languages
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    flag: '🌿',
    category: 'regional',
    regionTarget: 'Assam, Arunachal Pradesh',
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🌸',
    category: 'regional',
    regionTarget: 'Tripura, Assam (Barak Valley)',
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    flag: '🏔️',
    category: 'regional',
    regionTarget: 'Sikkim, Uttarakhand/HP Hills',
  },
  {
    code: 'mni',
    name: 'Manipuri (Meitei)',
    nativeName: 'মৈতৈলোন্',
    flag: '🌺',
    category: 'regional',
    regionTarget: 'Manipur',
  },
  {
    code: 'lus',
    name: 'Mizo',
    nativeName: 'Mizo ṭawng',
    flag: '🌄',
    category: 'regional',
    regionTarget: 'Mizoram',
  },
  {
    code: 'kha',
    name: 'Khasi',
    nativeName: 'Ka Ktien Khasi',
    flag: '🌧️',
    category: 'regional',
    regionTarget: 'Meghalaya',
  },
  {
    code: 'doi',
    name: 'Dogri',
    nativeName: 'डोगरी',
    flag: '⛰️',
    category: 'regional',
    regionTarget: 'Jammu & Kashmir, Himachal Pradesh',
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '✨',
    category: 'regional',
    regionTarget: 'Jammu & Kashmir, Ladakh',
    direction: 'rtl',
  },
];
