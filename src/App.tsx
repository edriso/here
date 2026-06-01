import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/app-layout';
import { TodayScreen } from '@/features/today/today-screen';
import { MomentsScreen } from '@/features/moments/moments-screen';
import { GuideScreen } from '@/features/guide/guide-screen';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<TodayScreen />} />
          <Route path="moments" element={<MomentsScreen />} />
          <Route path="guide" element={<GuideScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
