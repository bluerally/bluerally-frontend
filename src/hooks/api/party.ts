import requester from '@/utils/requester';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  GetPartyDetailParams,
  GetPartyDetailResponse,
  GetPartyListQuery,
  GetPartyListResponse,
  PostParticipateInPartyParams,
  PostCancelParticipate,
  PostChangePartyStatus,
} from '@/@types/party/type';

const BASE_URL = '/party';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MDgwMDQwNTh9.etzuZV6OOovAk2XyHrynIJoBIcm-xOwy728FCWjfjds';

const PartyApi = {
  getAll: ({ page = 1, ...params }: GetPartyListQuery) => {
    return requester.get<GetPartyListResponse>(`${BASE_URL}/list`, {
      params: { ...params, page },
    });
  },

  getDetail: (partyId?: GetPartyDetailParams) => {
    return requester.get<GetPartyDetailResponse>(
      `${BASE_URL}/details/${partyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  participate: (partyId: PostParticipateInPartyParams) => {
    return requester.post(`${BASE_URL}/${partyId}/participate`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  cancel: ({ partyId, status }: PostCancelParticipate) => {
    return requester.post(
      `${BASE_URL}/participants/${partyId}/status-change`,
      {
        new_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  },

  statusChange: ({
    partyId,
    participationId,
    status,
  }: PostChangePartyStatus) => {
    return requester.post(
      `${BASE_URL}/organizer/${partyId}/status-change/${participationId}`,
      {
        new_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
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

const usePostParticipateInParty = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: PostParticipateInPartyParams) => PartyApi.participate(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['party-detail']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 파티 참여 실패`),
    },
  );
};

const usePostCancelParticipate = () => {
  const queryClient = useQueryClient();

  return useMutation((data: PostCancelParticipate) => PartyApi.cancel(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['party-detail']);
    },
    onError: (error: AxiosError<any>) =>
      window.alert(`${error.code} 파티 참여 취소 실패`),
  });
};

const usePostStatusChangeParticipate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: PostChangePartyStatus) => PartyApi.statusChange(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['party-detail']);
      },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 파티 상태 변경 실패`),
    },
  );
};

export {
  PartyApi,
  useGetPartyList,
  useGetPartyDetails,
  usePostParticipateInParty,
  usePostCancelParticipate,
  usePostStatusChangeParticipate,
};
