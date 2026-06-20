import { PrivateGuard } from '@/components/commons/AuthGuard/AuthGuard';
import SSEProvider from '@/components/commons/Notification/SSEProvider';

const PrivateLayout = ({ children }) => {
  return (
    <PrivateGuard>
      <SSEProvider>{children}</SSEProvider>
    </PrivateGuard>
  );
};

export default PrivateLayout;
