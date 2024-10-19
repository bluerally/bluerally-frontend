import { Header } from '@/components/layouts/Header';
import { List } from '@/components/main/List';
import { useGetPartyMeOrganized } from '@/hooks/api/user';
import { ChevronLeft, FileSearch } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

export const OrganizedPartyComponent = () => {
  const router = useRouter();
  const { data: partyMeOrganizationData } = useGetPartyMeOrganized();

  return (
    <>
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        center={<>주최한 모임</>}
      />
      <List
        data={partyMeOrganizationData?.data}
        noDataMessage="주최한 모임이 없어요"
        description="모임을 주최해주세요"
        icon={<FileSearch size={48} />}
      />
    </>
  );
};
