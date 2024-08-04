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
  PostPartyDetailRequestParams,
} from '@/@types/party/type';
import { useSnackbar } from 'bluerally-design-system';

const BASE_URL = '/party';

const token = process.env.NEXT_PUBLIC_USER_TOKEN;

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
  /** 파티 생성 */
  createParty: (partyDetail: PostPartyDetailRequestParams) => {
    return requester.post(`${BASE_URL}`, partyDetail, {
      // return requester.post(`${BASE_URL}/party`, partyDetail, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const snackbar = useSnackbar();

  return useInfiniteQuery(
    ['party-list', params],
    ({ pageParam = 1 }) => {
      return PartyApi.getAll({ ...params, page: pageParam });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length === 0 ? undefined : nextPage;
      },
      onError: (error: AxiosError<any>) => {
        snackbar.error({ content: `${error.code} 파티 리스트 조회 실패` });
      },
    },
  );
};
const useGetPartyDetails = (
  partyId?: GetPartyDetailParams,
  isSearch?: boolean,
) => {
  const snackbar = useSnackbar();
  const queryKey = ['party-detail', partyId];

  return useQuery(queryKey, () => PartyApi.getDetail(partyId), {
    enabled: isSearch,
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 파티 디테일 조회 실패` }),
  });
};

const usePostParticipateInParty = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation(
    (data: PostParticipateInPartyParams) => PartyApi.participate(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['party-detail']);
      },
      onError: (error: AxiosError<any>) =>
        snackbar.error({ content: `${error.code} 파티 참여 실패` }),
    },
  );
};

const usePostCancelParticipate = () => {
  const snackbar = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation((data: PostCancelParticipate) => PartyApi.cancel(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['party-detail']);
    },
    onError: (error: AxiosError<any>) =>
      snackbar.error({ content: `${error.code} 파티 참여 취소 실패` }),
  });
};

/** 파티 생성 */
const usePostCreateParty = () => {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  return useMutation(
    (data: PostPartyDetailRequestParams) => PartyApi.createParty(data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['party-list', data]);
      },
      onError: (error: AxiosError<any>) =>
        snackbar.error({ content: `${error.code} 파티 생성 실패` }),
    },
  );
};

const usePostStatusChangeParticipate = () => {
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  return useMutation(
    (data: PostChangePartyStatus) => PartyApi.statusChange(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['party-detail']);
      },
      onError: (error: AxiosError<any>) =>
        snackbar.error({ content: `${error.code} 파티 상태 변경 실패` }),
    },
  );
};

export {
  PartyApi,
  useGetPartyList,
  useGetPartyDetails,
  usePostParticipateInParty,
  usePostCancelParticipate,
  usePostCreateParty,
  usePostStatusChangeParticipate,
};
