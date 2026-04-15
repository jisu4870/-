import React, { useState } from 'react';
import { useAppStore, TourPackage } from '../../store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Products() {
  const { tours, addTour, updateTour, deleteTour, theme } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<TourPackage>>({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    duration: '',
    location: ''
  });

  const handleOpenDialog = (tour?: TourPackage) => {
    if (tour) {
      setEditingId(tour.id);
      setFormData(tour);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
        duration: '',
        location: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTour(editingId, formData);
      toast.success('상품이 수정되었습니다.');
    } else {
      addTour({
        ...formData,
        id: Date.now().toString(),
      } as TourPackage);
      toast.success('새 상품이 등록되었습니다.');
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      deleteTour(id);
      toast.success('상품이 삭제되었습니다.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">여행 상품 관리</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} style={{ backgroundColor: theme.primaryColor }}>
              <Plus className="w-4 h-4 mr-2" />
              새 상품 등록
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white">
            <DialogHeader>
              <DialogTitle>{editingId ? '상품 수정' : '새 상품 등록'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">상품명</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">지역</Label>
                  <Input 
                    id="location" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">기간 (예: 3박 4일)</Label>
                  <Input 
                    id="duration" 
                    value={formData.duration} 
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">가격 (원)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="imageUrl">이미지 URL</Label>
                  <Input 
                    id="imageUrl" 
                    value={formData.imageUrl} 
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">상세 설명</Label>
                  <Textarea 
                    id="description" 
                    rows={4}
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
                <Button type="submit" style={{ backgroundColor: theme.primaryColor }}>저장</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px]">이미지</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>지역/기간</TableHead>
              <TableHead className="text-right">가격</TableHead>
              <TableHead className="text-right">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell>
                  <img src={tour.imageUrl} alt={tour.title} className="w-16 h-12 object-cover rounded" />
                </TableCell>
                <TableCell className="font-medium">{tour.title}</TableCell>
                <TableCell>
                  <div className="text-sm text-slate-500">{tour.location}</div>
                  <div className="text-xs text-slate-400">{tour.duration}</div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {tour.price.toLocaleString()}원
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(tour)}>
                    <Pencil className="w-4 h-4 text-slate-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(tour.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {tours.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                  등록된 상품이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
