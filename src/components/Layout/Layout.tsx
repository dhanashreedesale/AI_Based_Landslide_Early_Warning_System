import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Bell, 
  Database, 
  FileText,
  ShieldAlert,
  Layers,    
  Camera
} from 'lucide-react';
import { LanguageSelector } from '../Shared/LanguageSelector';
import { useTranslation } from '../../i18n';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/risk-map', icon: Map, label: t('nav.riskMap') },
    { path: '/heatmap', icon: Layers, label: 'Heatmap' },
    { path: '/alerts', icon: Bell, label: t('nav.alerts') },
    { path: '/field-reports', icon: Camera, label: 'Field Reports' },
    { path: '/data-sources', icon: Database, label: t('nav.dataSources') },
    { path: '/reports', icon: FileText, label: t('nav.reports') },
  ];

  return (
    <div className="min-h-screen bg-light-100 text-gray-900">
      <header className="bg-white border-b border-light-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex items-center justify-between h-12 gap-2">
            
            {/* Logo - Compact */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-gradient-to-r from-red-600 to-amber-500 p-1.5 rounded-lg shadow-md text-white">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 bg-clip-text text-transparent">
                  {t('common.systemTitle')}
                </h1>
                <p className="text-[10px] font-medium text-gray-500">
                  {t('common.focusRegionsSubtitle')}
                </p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-xs font-bold text-gray-900">NER LWS</h1>
              </div>
            </div>

            {/* Navigation - Compact */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all text-xs whitespace-nowrap ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side - Compact with Language Selector */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>{t('common.telemetryOnline')}</span>
              </div>
              
              {/* Language Selector - Compact */}
              <div className="scale-75 origin-right">
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden border-t border-gray-100 px-1 py-1 flex items-center gap-0.5 overflow-x-auto bg-gray-50/70 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0 px-1.5 py-1 rounded-md text-[9px] font-medium whitespace-nowrap ${
                  isActive ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;