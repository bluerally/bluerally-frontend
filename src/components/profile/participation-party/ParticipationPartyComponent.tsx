import { Header } from '@/components/layouts/Header';
import { List } from '@/components/main/List';
import { useGetPartyMeParticipated } from '@/hooks/api/user';
import { ChevronLeft, FileSearch } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';

export const ParticipationPartyComponent = () => {
  const router = useRouter();
  const { data: partyMeParticipatedData } = useGetPartyMeParticipated();

  return (
    <>
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        center={<>신청한 모임</>}
      />
      <List
        data={partyMeParticipatedData?.data}
        noDataMessage="참여한 모임이 없어요"
        description="모임을 신청해주세요"
        icon={<FileSearch size={48} />}
      />
    </>
  );
};
