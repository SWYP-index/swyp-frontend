import { getBooksSearch } from '@/apis/auth/authApi';
import { useQuery } from '@tanstack/react-query';
export const useTitleSearch = (keyword: string, startIndex: number) => {
  return useQuery({
    queryKey: ['bookSearch', keyword, startIndex],
    queryFn: () => getBooksSearch(keyword, startIndex),
    enabled: !!keyword,
  });
};
