import Header from '@/components/commons/Header/Header';
import LoggedInToast from '@/components/commons/Toast/LoggedInToast';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <LoggedInToast />
      {children}
    </>
  );
};

export default MainLayout;
