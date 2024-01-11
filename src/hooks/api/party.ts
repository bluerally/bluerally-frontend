import requester from '@/utils/requester';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  GetPartyDetailParams,
  GetPartyDetailResponse,
  GetPartyListQuery,
  GetPartyListResponse,
} from '@/@types/party/type';

const PartyApi = {
  getAll: (params?: GetPartyListQuery) => {
    return requester.get<GetPartyListResponse>('/party/list', {
      params,
    });
  },

  getDetail: (partyId?: GetPartyDetailParams) => {
    return requester.get<GetPartyDetailResponse>(`/party/details/${partyId}`);
  },
};

const useGetPartyList = (params?: GetPartyListQuery, isSearch?: boolean) => {
  const queryKey = ['party-list', params];

  return useQuery(queryKey, () => PartyApi.getAll(params), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 리스트 조회 실패`),
  });
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
