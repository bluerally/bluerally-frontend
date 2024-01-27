import requester from '@/utils/requester';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  GetPartyDetailParams,
  GetPartyDetailResponse,
  GetPartyListQuery,
  GetPartyListResponse,
} from '@/@types/party/type';

const PartyApi = {
  getAll: ({ page = 1, ...params }: GetPartyListQuery) => {
    return requester.get<GetPartyListResponse>('/party/list', {
      params: { ...params, page },
    });
  },

  getDetail: (partyId?: GetPartyDetailParams) => {
    return requester.get<GetPartyDetailResponse>(`/party/details/${partyId}`);
  },
};

const useGetPartyList = (params?: GetPartyListQuery) => {
  return useInfiniteQuery(
    ['party-list', params],
    ({ pageParam = 1 }) => PartyApi.getAll({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length === 0 ? undefined : nextPage;
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 파티 리스트 조회 실패`),
    },
  );
};

const useGetPartyDetails = (
  partyId?: GetPartyDetailParams,
  isSearch?: boolean,
) => {
  const queryKey = ['party-detail', partyId];

  return useQuery(queryKey, () => PartyApi.getDetail(partyId), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 디테일 조회 실패`),
  });
};

export { PartyApi, useGetPartyList, useGetPartyDetails };
