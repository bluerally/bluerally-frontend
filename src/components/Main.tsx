import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { useGetPartyList } from '@/hooks/api/party';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Filter } from './main/Filter';
import { List } from './main/List';
import { filterEmptyValues } from '@/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from 'bluerally-design-system';

const DEFAULT_PARAMS: GetPartyListQuery = {
  sport_id: 1,
  is_active: true,
  gather_date_min: '',
  gather_date_max: '',
  search_query: '',
};

const DEFAULT_VALUES: PartyListFilterType = {
  sport: 1,
  isActive: true,
  minDate: '',
  maxDate: '',
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
    <>
      <Filter setParams={setParams} form={form} />
      <List data={data ? data.pages.flatMap(({ data }) => data) : []} />
      <div ref={setTarget} />
    </>
  );
};
export default Main;
