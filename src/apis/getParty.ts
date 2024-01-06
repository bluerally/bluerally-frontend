import requester from '@/utils/requester';

export const getParty = (partyId: number) =>
  requester.get(`/party/details/${partyId}`);
