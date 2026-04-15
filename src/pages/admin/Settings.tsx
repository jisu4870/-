import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Settings() {
  const { theme, updateTheme } = useAppStore();
  const [formData, setFormData] = useState(theme);

  // Sync local state if global theme changes
  useEffect(() => {
    setFormData(theme);
  }, [theme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme(formData);
    toast.success('디자인 설정이 저장되었습니다.');
  };

  const presetColors = [
    { name: '스카이 블루 (기본)', value: '#0ea5e9' },
    { name: '오션 블루', value: '#2563eb' },
    { name: '에메랄드', value: '#10b981' },
    { name: '코랄 핑크', value: '#f43f5e' },
    { name: '럭셔리 골드', value: '#d97706' },
    { name: '모던 블랙', value: '#0f172a' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">디자인 설정</h2>
        <p className="text-slate-500">웹사이트의 전체적인 테마와 메인 페이지 콘텐츠를 변경할 수 있습니다.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Theme Colors */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>브랜드 컬러</CardTitle>
              <CardDescription>웹사이트의 주요 포인트 컬러를 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>프리셋 컬러</Label>
                <div className="grid grid-cols-3 gap-3">
                  {presetColors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, primaryColor: color.value })}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                        formData.primaryColor === color.value ? 'border-slate-900 shadow-md' : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full mb-2 shadow-inner" style={{ backgroundColor: color.value }} />
                      <span className="text-xs font-medium text-slate-600">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <Label htmlFor="customColor">사용자 지정 컬러 (HEX)</Label>
                <div className="flex space-x-2">
                  <div 
                    className="w-10 h-10 rounded border border-slate-200 shadow-inner" 
                    style={{ backgroundColor: formData.primaryColor }}
                  />
                  <Input 
                    id="customColor" 
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="flex-1 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Section Content */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>메인 페이지 (Hero)</CardTitle>
              <CardDescription>고객이 처음 마주하는 메인 화면의 문구와 이미지를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">메인 타이틀</Label>
                <Input 
                  id="heroTitle" 
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">서브 타이틀</Label>
                <Input 
                  id="heroSubtitle" 
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroImageUrl">배경 이미지 URL</Label>
                <Input 
                  id="heroImageUrl" 
                  value={formData.heroImageUrl}
                  onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                />
                {formData.heroImageUrl && (
                  <div className="mt-2 relative h-32 rounded-lg overflow-hidden border border-slate-200">
                    <img 
                      src={formData.heroImageUrl} 
                      alt="Hero Preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" size="lg" style={{ backgroundColor: theme.primaryColor }}>
            변경사항 저장
          </Button>
        </div>
      </form>
    </div>
  );
}
