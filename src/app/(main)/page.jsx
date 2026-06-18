import { Suspense } from 'react';
import MainPage from '@/components/MainPage/MainPage';
import LoggedInToast from '@/components/MainPage/LoggedInToast';

const Home = () => {
  return (
    <>
      <Suspense fallback={null}>
        <LoggedInToast />
      </Suspense>
      <MainPage />
    </>
  );
};

export default Home;
