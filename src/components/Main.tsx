import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { useGetPartyList } from '@/hooks/api/party';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Filter } from './main/Filter';
import { List } from './main/List';

const DEFAULT_PARAMS: GetPartyListQuery = {
  sport_id: 2,
  is_active: true,
  gather_date_min: '',
  gather_date_max: '',
  search_query: '',
};

const DEFAULT_VALUES: PartyListFilterType = {
  sport: '1',
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

  const { data } = useGetPartyList({
    ...params,
  });

  const partyList = data?.data;



  return (
    <>
      <Filter setParams={setParams} form={form} />
      <List data={partyList} />
    </>
  );
};

export default Main;
