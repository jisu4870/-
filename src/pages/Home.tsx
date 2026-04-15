import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { tours, theme } = useAppStore();

  useEffect(() => {
    document.title = '원섬투어 - 프리미엄 국내 여행';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '원섬투어와 함께하는 특별한 프리미엄 국내 여행. 제주도, 울릉도 등 최고의 여행 상품을 만나보세요.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = '원섬투어와 함께하는 특별한 프리미엄 국내 여행. 제주도, 울릉도 등 최고의 여행 상품을 만나보세요.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold tracking-tight" style={{ color: theme.primaryColor }}>
                원섬투어
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">여행 상품</Link>
              <Link to="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">매거진</Link>
              <Link to="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">고객센터</Link>
              <Link to="/admin">
                <Button variant="outline" className="rounded-full px-6">관리자</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={theme.heroImageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
            {theme.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-12 font-light drop-shadow-md">
            {theme.heroSubtitle}
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-full p-2 shadow-2xl flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center px-6 py-3 w-full md:w-auto border-b md:border-b-0 md:border-r border-slate-100">
              <MapPin className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="어디로 떠나고 싶으신가요?" 
                className="w-full focus:outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
              />
            </div>
            <div className="flex-1 flex items-center px-6 py-3 w-full md:w-auto">
              <Calendar className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="여행 날짜" 
                className="w-full focus:outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
              />
            </div>
            <Button size="lg" className="w-full md:w-auto rounded-full px-8 py-6 text-base" style={{ backgroundColor: theme.primaryColor }}>
              <Search className="w-5 h-5 mr-2" />
              검색
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">추천 프리미엄 패키지</h2>
              <p className="text-slate-500 text-lg">원섬투어가 엄선한 최고의 여행을 만나보세요</p>
            </div>
            <Link to="#" className="hidden md:flex items-center text-sm font-medium hover:underline" style={{ color: theme.primaryColor }}>
              전체보기 <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-2xl bg-white">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm">
                      {tour.location}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm">
                      {tour.duration}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-slate-500 mb-6 line-clamp-2 text-sm leading-relaxed">
                    {tour.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div className="text-sm text-slate-500">1인 기준</div>
                    <div className="text-xl font-bold text-slate-900">
                      {tour.price.toLocaleString()}원
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-6">원섬투어</h3>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                프리미엄 국내 여행의 새로운 기준. 당신의 특별한 순간을 더욱 완벽하게 만들어 드립니다.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">고객 지원</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
                <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white transition-colors">예약 확인/취소</a></li>
                <li><a href="#" className="hover:text-white transition-colors">여행 약관</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">문의하기</h4>
              <ul className="space-y-4">
                <li className="text-slate-400">대표번호: 1588-0000</li>
                <li className="text-slate-400">이메일: help@wonsumtour.com</li>
                <li className="text-slate-400">운영시간: 평일 09:00 - 18:00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-16 pt-8 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 Wonsum Tour. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
