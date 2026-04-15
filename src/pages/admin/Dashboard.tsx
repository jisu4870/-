import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, TrendingUp, Eye } from 'lucide-react';

export default function Dashboard() {
  const { tours, posts } = useAppStore();

  const stats = [
    {
      title: '총 여행 상품',
      value: tours.length.toString(),
      icon: Package,
      trend: '+2 이번 달',
    },
    {
      title: '활성 사용자',
      value: '1,240',
      icon: Users,
      trend: '+12% 이번 달',
    },
    {
      title: '총 매출',
      value: '₩45,200,000',
      icon: TrendingUp,
      trend: '+8% 이번 달',
    },
    {
      title: '페이지 뷰',
      value: '12,543',
      icon: Eye,
      trend: '+24% 이번 달',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <p className="text-xs text-emerald-600 mt-1 font-medium">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">최근 등록된 상품</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tours.slice(0, 3).map(tour => (
                <div key={tour.id} className="flex items-center space-x-4">
                  <img src={tour.imageUrl} alt={tour.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{tour.title}</p>
                    <p className="text-xs text-slate-500">{tour.price.toLocaleString()}원 • {tour.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">최근 게시글</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.slice(0, 3).map(post => (
                <div key={post.id} className="flex items-center space-x-4">
                  <img src={post.imageUrl} alt={post.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-slate-500">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
