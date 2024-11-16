import { Header } from '@/components/layouts/Header';
import { useGetLikeList } from '@/hooks/api/like';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { NoDataMessage } from '../common/NoDataMessage';
import { List } from '../main/List';
import { Loading } from '../common/Loading';

export const Like = () => {
  const router = useRouter();
  const { data, isLoading } = useGetLikeList();

  const likeList = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        center={<>찜한 모임</>}
      />
      {likeList?.length ? (
        <div className="flex flex-col gap-2">
          {likeList.map((party) => {
            return <List key={party.id} data={party} />;
          })}
        </div>
      ) : (
        <NoDataMessage message="찜한 목록이 없어요" />
      )}
    </>
  );
};
