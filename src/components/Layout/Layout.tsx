import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Bell, 
  Database, 
  FileText,
  ShieldAlert
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
    { path: '/alerts', icon: Bell, label: t('nav.alerts') },
    { path: '/data-sources', icon: Database, label: t('nav.dataSources') },
    { path: '/reports', icon: FileText, label: t('nav.reports') },
  ];

  return (
    <div className="min-h-screen bg-light-100 text-gray-900">
      <header className="bg-white border-b border-light-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-600 to-amber-500 p-2 rounded-lg shadow-md text-white flex-shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 bg-clip-text text-transparent truncate">
                  {t('common.systemTitle')}
                </h1>
                <p className="text-[11px] font-medium text-gray-500 truncate">
                  {t('common.focusRegionsSubtitle')}
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all relative ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-bold' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-light-100 font-medium'
                    }`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm whitespace-nowrap">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>{t('common.telemetryOnline')}</span>
              </div>

              {/* Language Selector Dropdown */}
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden border-t border-gray-100 px-2 py-1.5 flex items-center justify-around bg-gray-50/70 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${
                  isActive ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5">
        {children}
      </main>
    </div>
  );
};

export default Layout;