'use client';

import useSSE from '@/hooks/useSSE';

/**
 * SSE 연결을 마운트하는 클라이언트 컴포넌트
 *
 * (private)/layout.jsx는 서버 컴포넌트여야 하므로
 * useSSE를 직접 호출할 수 없어 이 컴포넌트로 분리
 */
const SSEProvider = ({ children }) => {
  useSSE();
  return children;
};

export default SSEProvider;
