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
  const [params, setParams] = useState<GetPartyListQuery>(DEFAULT_PARAMS);

  const form = useForm<PartyListFilterType>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  const filteredParams = filterEmptyValues(params);

  const { data, fetchNextPage, hasNextPage } = useGetPartyList(filteredParams);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage: () => fetchNextPage(),
  });

  return (
    <div className="bg-g-100">
      <Filter setParams={setParams} form={form} />
      <div className="bg-g-0 h-812">
        <List data={data ? data.pages.flatMap(({ data }) => data) : []} />
      </div>
      <div ref={setTarget} />
    </div>
  );
};
export default Main;
