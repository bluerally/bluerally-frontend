import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { Dispatch, SetStateAction } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormTextInput } from '@/components/form/FormTextInput';
import { FormSwitch } from '@/components/form/FormSwitch';
import { FormSelect } from '@/components/form/FormSelect';
import { FormDatePicker } from '@/components/form/FormDatePicker';

interface Props {
  setParams: Dispatch<SetStateAction<GetPartyListQuery>>;
  form: UseFormReturn<PartyListFilterType>;
}

export const Filter = ({ setParams, form }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const searchData: SubmitHandler<PartyListFilterType> = ({
    sport,
    searchKeyword,
    isActive,
    minDate,
    maxDate,
  }) => {
    console.log('<<', sport, searchKeyword, String(isActive), minDate, maxDate);

    setParams((params) => {
      return {
        gather_date_max: maxDate,
        gather_date_min: minDate,
        is_active: isActive,
        search_query: searchKeyword,
        sport_id: sport,
      };
    });
  };

  const handleError: SubmitErrorHandler<GetPartyListQuery> = (error) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(searchData, handleError)}>
      <FormSelect
        control={control}
        name="sport"
        options={[
          { value: '1', label: '프리다이빙' },
          { value: '2', label: '수영' },
          { value: '3', label: '서핑' },
        ]}
      />
      <FormSwitch control={control} name="isActive" />
      <FormDatePicker control={control} name="minDate" />
      <FormDatePicker control={control} name="maxDate" />
      <FormTextInput
        control={control}
        name="searchKeyword"
        placeholder="제목/장소를 검색해주세요."
        status={errors.searchKeyword ? 'error' : 'default'}
        statusMessage={errors.searchKeyword?.message ?? ''}
      />
      <button type="submit">검색</button>
    </form>
  );
};
