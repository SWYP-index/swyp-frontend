'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/login/useUser';

export default function OAuth2SuccessPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const accessToken = params.get('accessToken');

    if (!accessToken) {
      console.error('No access token found in URL');
      router.replace('/login');
      return;
    }

    localStorage.setItem('accessToken', accessToken);
  }, [router]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log('유저 정보:', user);
        router.replace('/');
      } else {
        console.error('유저 정보 가져오기 실패');
        router.replace('/login');
      }
    }
  }, [loading, user, router]);

  return <div>{loading ? '로그인 중입니다...' : null}</div>;
}
