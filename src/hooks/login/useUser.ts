import { authInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type User = {
  name: string;
  email: string;
};

const fetchUser = async (): Promise<User> => {
  const res = await authInstance.get('/api/users/me');
  return res.data;
};

export function useUser() {
  const {
    data: user,
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: 1,
    retryDelay: 1000,
  });

  if (isError) {
    console.error('유저 정보를 불러오지 못했습니다', error);
  }

  return { user, loading };
}

export default useUser;
