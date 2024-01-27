import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import { FormSwitch } from '@/components/form/FormSwitch';
import { FormSelect } from '@/components/form/FormSelect';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { useGetSports } from '@/hooks/api/common';
import { Button } from '@mui/material';

interface Props {
  setParams: Dispatch<SetStateAction<GetPartyListQuery>>;
  form: UseFormReturn<PartyListFilterType>;
}

export const Filter = ({ setParams, form }: Props) => {
  const { data: sports } = useGetSports();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const searchData: SubmitHandler<PartyListFilterType> = ({
    sport,
    searchKeyword,
    isActive,
    minDate,
    maxDate,
  }) => {
    setParams({
      gather_date_max: maxDate,
      gather_date_min: minDate,
      is_active: isActive,
      search_query: searchKeyword,
      sport_id: Number(sport),
    });
  };

  const handleError: SubmitErrorHandler<GetPartyListQuery> = (error) => {
    console.log(error);
  };

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isActive', e.target.checked);
    handleSubmit(searchData, handleError)();
  };

  return (
    <form onSubmit={handleSubmit(searchData, handleError)}>
      <FormSelect control={control} name="sport" options={sports?.data ?? []} />
      <FormSwitch
        control={control}
        name="isActive"
        label="마감"
        onChange={(value) => handleSwitchChange(value)}
      />
      <FormDatePicker control={control} name="minDate" />
      <FormDatePicker control={control} name="maxDate" />
      <FormTextInput
        control={control}
        name="searchKeyword"
        placeholder="제목/장소를 검색해주세요."
        status={errors.searchKeyword ? 'error' : 'primary'}
        statusmessage={errors.searchKeyword?.message ?? ''}
      />
      <Button type="submit" variant="outlined">
        검색
      </Button>
    </form>
  );
};
