'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useInitAuth } from '../hooks/useAuth';
import SurpriseModal from '@/components/SurpriseModal/SurpriseModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 탭 이동 후 다시 돌아와도자동 재요청 안 함 -> 필요한 API 호출 줄임
      retry: 1,
    },
  },
});

// ─────────────────────────────────────────────
// AuthInitializer: 앱 마운트 시 인증 상태 복원
// QueryClientProvider 내부에서 렌더링되어야 useQuery 사용 가능
// ─────────────────────────────────────────────
const AuthInitializer = ({ children }) => {
  useInitAuth(); // 상태 복원 실행만
  return children;
};

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        {children}
        <SurpriseModal />
      </AuthInitializer>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default Providers;
