import { PublicGuard } from '@/components/commons/AuthGuard/AuthGuard';

const PublicLayout = ({ children }) => {
  return <PublicGuard>{children}</PublicGuard>;
};

export default PublicLayout;
