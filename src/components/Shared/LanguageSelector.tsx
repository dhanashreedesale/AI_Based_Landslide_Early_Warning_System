import { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useTranslation, LanguageCode } from '../../i18n';

export const LanguageSelector = () => {
  const { currentLanguage, currentLanguageInfo, setLanguage, languages, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nationalLangs = languages.filter((l) => l.category === 'national');
  const regionalLangs = languages.filter((l) => l.category === 'regional');

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border shadow-xs ${
          isOpen
            ? 'bg-blue-50 text-blue-700 border-blue-300 ring-2 ring-blue-200'
            : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
        }`}
        title={t('languageSelector.selectLanguage')}
      >
        <span className="text-base leading-none">{currentLanguageInfo.flag}</span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-gray-900">{currentLanguageInfo.nativeName}</span>
          <span className="text-[10px] text-gray-400 font-medium uppercase hidden sm:inline">
            ({currentLanguageInfo.code})
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-[2500] w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
              <Languages className="w-4 h-4 text-blue-600" />
              <span>{t('languageSelector.selectLanguage')}</span>
            </div>
            <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> 12 Focus Regions
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto custom-scrollbar p-1.5 space-y-2">
            {/* National Languages Section */}
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
                {t('languageSelector.nationalLanguages')}
              </div>
              <div className="space-y-0.5">
                {nationalLangs.map((lang) => {
                  const isSelected = currentLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-900 font-bold'
                          : 'text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">{lang.flag}</span>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-900 font-semibold">{lang.nativeName}</span>
                            <span className="text-[10px] text-gray-400">({lang.name})</span>
                          </div>
                          <p className="text-[10px] text-gray-500 truncate">{lang.regionTarget}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Himalayan & NE Regional Languages */}
            <div className="border-t border-gray-100 pt-1.5">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                <span>{t('languageSelector.regionalLanguages')}</span>
                <span className="text-[10px] text-blue-600 font-semibold lowercase">8 languages</span>
              </div>
              <div className="space-y-0.5">
                {regionalLangs.map((lang) => {
                  const isSelected = currentLanguage === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-900 font-bold'
                          : 'text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">{lang.flag}</span>
                        <div className="truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-900 font-semibold">{lang.nativeName}</span>
                            <span className="text-[10px] text-gray-400">({lang.name})</span>
                          </div>
                          <p className="text-[10px] text-blue-600 font-medium truncate">{lang.regionTarget}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
