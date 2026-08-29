import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Bell, 
  Database, 
  FileText,
  Settings,
  AlertTriangle,
  Camera,  // ✅ Make sure this is imported
  Layers
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/risk-map', icon: Map, label: 'Risk Map' },
    { path: '/heatmap', icon: Layers, label: 'Heatmap' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/field-reports', icon: Camera, label: 'Field Reports' },  // ✅ This should be here
    { path: '/data-sources', icon: Database, label: 'Data Sources' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-yellow-500 to-red-500 p-1.5 rounded-lg shadow-md">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
                  NER Landslide Warning
                </h1>
                <p className="text-[10px] text-gray-500 leading-tight">Early Warning System v2.0</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-sm ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-600 hidden sm:inline">Online</span>
              </div>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;