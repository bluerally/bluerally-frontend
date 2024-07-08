import requester from '@/utils/requester';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetSportsResponse } from '@/@types/common';

const CommonApi = {
  getSports: () => {
    return requester.get<GetSportsResponse>('/party/sports');
  },
};

const useGetSports = () => {
  const queryKey = ['sports'];

  return useQuery(queryKey, () => CommonApi.getSports(), {
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 스포츠 종류 조회 실패`),
    cacheTime: 1000 * 120 * 10,
    staleTime: 1000 * 120 * 10,
  });
};

export { CommonApi, useGetSports };
