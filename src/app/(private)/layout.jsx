import { PrivateGuard } from '@/components/commons/AuthGuard/AuthGuard';

const PrivateLayout = ({ children }) => {
  return <PrivateGuard>{children}</PrivateGuard>;
};

export default PrivateLayout;
