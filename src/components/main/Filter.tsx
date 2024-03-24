import { GetPartyListQuery, PartyListFilterType } from '@/@types/party/type';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormSwitch } from '@/components/form/FormSwitch';
import { useGetSports } from '@/hooks/api/common';
import { Button, Label, SearchInput } from 'bluerally-design-system';
import { FormDatePicker } from '../form/FormDatePicker';
import { FormTextInput } from '../form/FormTextInput';
import { X } from 'lucide-react';
import { FormSelect } from '../form/FormSelect';
import { generateTimeOptions } from '@/utils';

interface Props {
  setParams: Dispatch<SetStateAction<GetPartyListQuery>>;
  form: UseFormReturn<PartyListFilterType>;
}

export const Filter = ({ setParams, form }: Props) => {
  const { data: sportsData } = useGetSports();
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const sports = sportsData?.data ?? [];

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

  const handleSportsCategoryChange = (id: number) => {
    setValue('sport', id);
    handleSubmit(searchData, handleError)();
  };

  return (
    <>
      <form onSubmit={handleSubmit(searchData, handleError)} className="pb-5">
        {/* 마감여부 */}
        <div className="flex justify-end pt-5">
          <FormSwitch
            control={control}
            name="isActive"
            onChange={(value) => handleSwitchChange(value)}
          />
        </div>
        <div className="pt-2.5 pb-4">
          <SearchInput
            value=""
            placeholder="찾으시는 모임을 검색해주세요"
            onClick={() => setOpenSearchModal(true)}
          />
        </div>
        <div className="flex justify-center pt-2.5 text-xs text-g-950">
          {sports.map(({ id, name }) => {
            return (
              <div
                key={id}
                className="mr-5 text-center hover:cursor-pointer"
                onClick={() => handleSportsCategoryChange(id)}
              >
                <div className="w-16 h-16 pb-1 rounded bg-g-100">
                  {/* 스포츠 아이콘 */}
                </div>
                <span>{name}</span>
              </div>
            );
          })}
        </div>

        {/* 서치 모달  */}
        <div
          className={`${
            openSearchModal ? 'block' : 'hidden'
          } fixed inset-0 max-w-sm mx-auto bg-g-50 z-50`}
        >
          <div className="px-4">
            <header className="top-0 left-0 right-0 z-50 bg-g-50">
              <div className="box-border relative flex items-center justify-between max-w-sm px-4 mx-auto bg-white h-14">
                <span className="">
                  <X size={24} onClick={() => setOpenSearchModal(false)} />
                </span>
                <span className="text-lg font-semibold text-black">검색</span>
                <span />
              </div>
            </header>
          </div>
          <div className="border border-g-100" />
          <div className="p-4">
            <div className="flex justify-end pt-1">
              <FormSwitch
                control={control}
                name="isActive"
                onChange={(value) => handleSwitchChange(value)}
              />
            </div>

            <div className="pb-8">
              <Label>종류</Label>
              <div className="flex gap-1.5 pt-1.5">
                {sports.map(({ id, name }) => (
                  <Button key={id}>{name}</Button>
                ))}
              </div>
            </div>

            <div className="pb-8">
              <Label>모임 날짜</Label>
              <FormDatePicker control={control} name="minDate" width="100%" />
            </div>

            <div className="pb-8">
              <Label>모임 시작</Label>
              <FormSelect
                control={control}
                name="minDate"
                width="100%"
                options={generateTimeOptions()}
              />
            </div>

            <div className="pb-8">
              <Label>장소</Label>
              <FormTextInput
                control={control}
                name="searchKeyword"
                placeholder="원하는 장소를 검색해주세요"
                status={errors.searchKeyword ? 'error' : 'default'}
                statusMessage={errors.searchKeyword?.message}
              />
            </div>

            <Button type="submit" color="gray" width="100%">
              검색
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
