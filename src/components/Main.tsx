import { GetPartyListQuery, GetPartyListResponse } from '@/@types/party/type';
import { useSearchModal } from '@/contexts/SearchModalContext';
import { useGetSports } from '@/hooks/api/common';
import { useGetNotificationList } from '@/hooks/api/notification';
import { useGetPartyList } from '@/hooks/api/party';
import { useAuth } from '@/hooks/useAuth';
import { Chip } from 'bluerally-design-system';
import { Bell, ChevronDown, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Loading } from './common/Loading';
import { NoDataMessage } from './common/NoDataMessage';
import { Header } from './layouts/Header';
import { List } from './main/List';
import SearchModal from './main/SearchModal';

export const DEFAULT_PARAMS: GetPartyListQuery = {
  is_active: true,
  page: 1,
};

const getRandomIndex = (min = 1, max = 3) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Main = () => {
  const router = useRouter();

  const { isLoggedIn } = useAuth();
  const { isSearchModalOpen, setIsSearchModalOpen } = useSearchModal();

  const [params, setParams] = useState<GetPartyListQuery>(DEFAULT_PARAMS);
  const [formValues, setFormValues] = useState<{
    sport_id: number[];
    search_query: string;
    gather_date_min?: string;
    gather_date_max?: string;
    is_active: boolean;
  }>({
    sport_id: [],
    search_query: '',
    gather_date_min: undefined,
    gather_date_max: undefined,
    is_active: true,
  });

  const imageIndex = useMemo(() => getRandomIndex(), []);

  const { data: sportsData } = useGetSports();
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useGetPartyList(params);
  const { data: notificationData } = useGetNotificationList(1, isLoggedIn);

  const sports = sportsData?.data ?? [];
  const notificationList = notificationData?.data.notifications;

  const notReadNotification = notificationList?.filter(
    ({ is_read }) => !is_read,
  );

  const handleSportsCategoryChange = ({ id }: { id: number }) => {
    setParams({ ...params, sport_id: [id], page: 1 });
  };

  const handleClickAllSports = () => {
    setParams({ ...params, sport_id: undefined, page: 1 });
  };

  const partyList = useMemo(() => {
    return data?.pages.reduce<GetPartyListResponse>((acc, page) => {
      return acc.concat(page.data);
    }, []);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="relative flex flex-col mx-auto">
        <div className={`flex flex-col flex-grow`}>
          <div className="fixed top-0 z-10 w-full bg-white border-b border-g-100 max-w-[600px]">
            <Header
              left={
                <Image
                  src={`/images/logo.svg`}
                  alt="logo"
                  width={75}
                  height={26}
                  priority
                />
              }
              right={
                <div className={`flex items-center gap-[18px] text-g-950`}>
                  <div className="cursor-pointer">
                    <Search
                      size={24}
                      onClick={() => setIsSearchModalOpen(true)}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div
                    className="relative flex cursor-pointer"
                    onClick={() => router.push(`/notification`)}
                  >
                    <Bell size={24} strokeWidth={1.5} />
                    {notReadNotification && notReadNotification?.length > 0 && (
                      <div className="absolute top-0 right-0 w-[13px] h-[13px] bg-b-300 rounded-full outline outline-white flex items-center justify-center text-[9px] font-bold text-white">
                        {notReadNotification?.length}
                      </div>
                    )}
                  </div>
                </div>
              }
              transparent
            />
            <div className="flex gap-2 px-5 py-[10px] text-basic text-g-950 ">
              <div onClick={handleClickAllSports} className="cursor-pointer">
                <Chip
                  variant={!params.sport_id ? 'primary-filled' : 'gray-outline'}
                >
                  전체
                </Chip>
              </div>
              {sports.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    className="text-center hover:cursor-pointer"
                    onClick={() => handleSportsCategoryChange({ id })}
                  >
                    <Chip
                      variant={
                        params.sport_id?.includes(id)
                          ? 'primary-filled'
                          : 'gray-outline'
                      }
                    >
                      {name}
                    </Chip>
                  </div>
                );
              })}
            </div>
          </div>
          <Image
            src={`/images/home_${imageIndex}.svg`}
            alt="banner"
            width={600}
            height={320}
            priority
            className="object-cover w-full h-[320px] md:h-[320px] md:w-[600px] mx-auto mt-[112px]"
          />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col items-center justify-center w-full h-full bg-white">
            {partyList?.length ? (
              <div className="flex flex-col w-full gap-2 mt-5">
                {partyList.map((party) => (
                  <List key={party.id} data={party} />
                ))}
              </div>
            ) : (
              <NoDataMessage
                message="아직 게시물이 없어요"
                description="좋은 모임이 곧 준비될거에요"
              />
            )}
          </div>
          <div
            className={`flex flex-row items-center justify-center gap-1 ${
              hasNextPage ? 'pt-5 pb-8' : 'pt-[80px]'
            } text-lg bg-white text-g-500`}
          >
            {hasNextPage && (
              <>
                <span
                  role="button"
                  aria-label="button"
                  onClick={() => fetchNextPage()}
                >
                  더보기
                </span>
                <ChevronDown size={20} />
              </>
            )}
          </div>
        </div>
      </div>
      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          formValues={formValues}
          setParams={setParams}
          setFormValues={setFormValues}
          sports={sports}
        />
      )}
    </>
  );
};

export default Main;
