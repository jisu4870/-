import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, Settings, LogOut, Globe } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

export default function AdminLayout() {
  const location = useLocation();
  const { theme } = useAppStore();

  const navigation = [
    { name: '대시보드', href: '/admin', icon: LayoutDashboard },
    { name: '상품 관리', href: '/admin/products', icon: Package },
    // { name: '게시글 관리', href: '/admin/posts', icon: FileText },
    { name: '디자인 설정', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <span className="text-xl font-bold" style={{ color: theme.primaryColor }}>원섬투어 관리자</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-slate-50 text-slate-900' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
                style={isActive ? { color: theme.primaryColor, backgroundColor: `${theme.primaryColor}10` } : {}}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? '' : 'text-slate-400'}`} style={isActive ? { color: theme.primaryColor } : {}} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            to="/"
            className="flex items-center px-4 py-3 text-sm font-medium text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Globe className="mr-3 h-5 w-5 text-slate-400" />
            웹사이트 보기
          </Link>
          <button
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-500" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-slate-800">
            {navigation.find(n => n.href === location.pathname)?.name || '관리자 패널'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
              AD
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
