import {
  GetPartyListQuery,
  GetPartyListResponse,
  PartyListFilterType,
} from '@/@types/party/type';
import { useGetPartyList } from '@/hooks/api/party';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Filter } from './main/Filter';
import { List } from './main/List';
import { filterEmptyValues } from '@/utils';

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

  const { data } = useGetPartyList(filteredParams);
  const partyList = data?.data;

  return (
    <>
      <Filter params={params} setParams={setParams} form={form} />
      <List data={partyList} />
    </>
  );
};
export default Main;
