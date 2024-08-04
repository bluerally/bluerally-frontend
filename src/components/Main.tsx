import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { useGetPartyList } from '@/hooks/api/party';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Filter } from './main/Filter';
import { List } from './main/List';
import { filterEmptyValues } from '@/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { formatter } from 'bluerally-design-system';
import dayjs from 'dayjs';
import { Bell, Pencil } from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigate';
import { Header } from './layouts/Header';
import { Avatar } from './common/Avatar';
import { SideNavigation } from './common/SideNavigation';

const DEFAULT_PARAMS: GetPartyListQuery = {
  sport_id: 1,
  is_active: true,
  gather_date_min: '',
  gather_date_max: '',
  search_query: '',
};

const DEFAULT_VALUES: PartyListFilterType = {
  sport: { id: 1, name: '프리다이빙' },
  isActive: true,
  date: formatter.date(dayjs()),
  startTime: { title: '06:00', value: '06:00' },
  searchKeyword: '',
};

const Main = () => {
  const { pushToRoute } = useNavigate();
  const [params, setParams] = useState<GetPartyListQuery>(DEFAULT_PARAMS);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const form = useForm<PartyListFilterType>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  const filteredParams = filterEmptyValues(params);

  const { data, fetchNextPage, hasNextPage } = useGetPartyList(filteredParams);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const handleAvatarClick = () => {
    setIsNavOpen(true);
  };

  const handleCloseNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="relative flex flex-col h-full mx-auto bg-g-100">
      {!isNavOpen && (
        <Header
          left={<div className="w-6 h-6 rounded-full bg-g-300"></div>}
          right={
            <div className="flex items-center justify-center gap-4">
              <div
                className="cursor-pointer"
                onClick={() => pushToRoute(`/notification`)}
              >
                <Bell size={24} />
              </div>
              <div onClick={handleAvatarClick} className="cursor-pointer">
                <Avatar size="xs" />
              </div>
            </div>
          }
        />
      )}

      <div className="flex-shrink-0">
        <Filter setParams={setParams} form={form} />
      </div>
      <div className="flex-grow overflow-y-auto bg-g-1">
        <List data={data ? data.pages.flatMap(({ data }) => data) : []} />
        <div ref={setTarget} />
      </div>
      <div className="fixed bottom-0 right-0 flex items-center justify-end w-full h-24 p-5 bg-transparent">
        <div
          className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-b-500 shadow-lg cursor-pointer"
          onClick={() => pushToRoute(`/create-party`)}
        >
          <Pencil size={24} className="text-white" />
        </div>
      </div>
      {isNavOpen && (
        <div
          className="absolute inset-0 z-40 bg-black bg-opacity-50"
          onClick={handleCloseNav}
        />
      )}
      {isNavOpen && (
        <div className="absolute top-0 right-0 z-50 h-full">
          <SideNavigation open={isNavOpen} onClose={handleCloseNav} />
        </div>
      )}
    </div>
  );
};

export default Main;
