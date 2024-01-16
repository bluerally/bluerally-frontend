import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { Dispatch, SetStateAction } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormTextInput } from '../form/FormTextInput';
import { FormSwitch } from '../form/FormSwitch';
import { FormSelect } from '../form/FormSelect';

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

  const searchData: SubmitHandler<PartyListFilterType> = () => {
    setParams((params) => {
      return {
        ...params,
      };
    });
  };

  const handleError: SubmitErrorHandler<GetPartyListQuery> = (error) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(searchData, handleError)}>
      <>
        <FormSelect
          control={control}
          name="sport"
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
        />
        <FormSwitch control={control} name="isActive" />
        <FormTextInput
          control={control}
          name="searchKeyword"
          label="암호 입력"
          placeholder="검색"
          status={errors.searchKeyword ? 'error' : 'default'}
          statusMessage={errors.searchKeyword?.message ?? ''}
        />
        <button type="submit">조회</button>
      </>
    </form>
  );
};
