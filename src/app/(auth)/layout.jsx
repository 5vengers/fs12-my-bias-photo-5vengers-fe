import { GuestGuard } from '@/components/commons/AuthGuard/AuthGuard';

const AuthLayout = ({ children }) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default AuthLayout;
