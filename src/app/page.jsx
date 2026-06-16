import { Suspense } from 'react';
import LoggedInToast from '@/components/MainPage/LoggedInToast';

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <LoggedInToast />
      </Suspense>
      메인 화면
    </div>
  );
}
