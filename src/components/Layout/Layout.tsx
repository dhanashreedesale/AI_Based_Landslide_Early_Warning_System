import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Bell, 
  Database, 
  FileText,
  Settings,
  ShieldAlert
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/risk-map', icon: Map, label: 'Live Risk Map' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/data-sources', icon: Database, label: 'Data Sources' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ];

  return (
    <div className="min-h-screen bg-light-100 text-gray-900">
      <header className="bg-white border-b border-light-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-600 to-amber-500 p-2 rounded-lg shadow-md text-white">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 bg-clip-text text-transparent">
                  National Landslide Early Warning
                </h1>
                <p className="text-[11px] font-medium text-gray-500">Focus Regions: 12 Himalayan & NE States/UTs</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-bold' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-light-100 font-medium'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="hidden sm:inline">Telemetry Online</span>
              </div>
              <button className="p-2 hover:bg-light-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5">
        {children}
      </main>
    </div>
  );
};

export default Layout;