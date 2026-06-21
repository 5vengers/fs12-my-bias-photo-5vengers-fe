import Header from '@/components/commons/Header/Header';
import LoggedInToast from '@/components/commons/Toast/LoggedInToast';
import SSEProvider from '@/components/commons/Notification/SSEProvider';

const MainLayout = ({ children }) => {
  return (
    <SSEProvider>
      <Header />
      <LoggedInToast />
      {children}
    </SSEProvider>
  );
};

export default MainLayout;
