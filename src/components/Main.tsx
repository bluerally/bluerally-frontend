import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { useGetPartyList } from '@/hooks/api/party';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Filter } from './main/Filter';

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
  const router = useRouter();
  const [params, setParams] = useState<GetPartyListQuery>(DEFAULT_PARAMS);

  const form = useForm<PartyListFilterType>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  const { data } = useGetPartyList({
    ...params,
  });

  const partyList = data?.data;

  const goToDetail = (partyId: number) => {
    router.push({
      pathname: `/detail/${partyId}`,
    });
  };

  return (
    <>
      <Filter setParams={setParams} form={form} />
      <>
        {partyList?.map(
          (
            {
              title,
              sport_name,
              price,
              posted_date,
              participants_info,
              is_user_organizer,
              organizer_profile,
              gather_date,
              gather_time,
              due_date,
              body,
            },
            index,
          ) => {
            return (
              <div key={index}>
                <div>{title}</div>
                <div>{sport_name}</div>

                <div>{price}</div>
                <div>{posted_date}</div>
                <div>{participants_info}</div>

                <div>{String(is_user_organizer)}</div>
                <div>{organizer_profile.name}</div>
                <div>{organizer_profile.profile_picture}</div>

                <div>{gather_date}</div>
                <div>{gather_time}</div>

                <div>{due_date}</div>
                <div>{body}</div>
                <button onClick={() => goToDetail(1)}>go to detail</button>
              </div>
            );
          },
        )}
      </>
    </>
  );
};

export default Main;
