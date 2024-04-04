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
import { Search, X } from 'lucide-react';
import { FormSelect } from '../form/FormSelect';
import { generateTimeOptions } from '@/utils';
import { FormButtonGroup } from '../form/FormButtonGroup';

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
    date,
    startTime,
  }) => {
    console.log(sport, searchKeyword, isActive, date, startTime);
    setParams({
      gather_date_min: date,
      is_active: isActive,
      search_query: searchKeyword,
      sport_id: Number(sport.id),
    });

    setOpenSearchModal(false);
  };

  const handleError: SubmitErrorHandler<GetPartyListQuery> = (error) => {
    console.log(error);
  };

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('isActive', e.target.checked);
    handleSubmit(searchData, handleError)();
  };

  const handleSportsCategoryChange = (sport: { id: number; name: string }) => {
    setValue('sport', sport);
    handleSubmit(searchData, handleError)();
  };

  return (
    <form
      onSubmit={handleSubmit(searchData, handleError)}
      className="p-5 bg-g-0"
    >
      {/* 마감여부 */}
      <div className="flex justify-end pt-5">
        <FormSwitch
          control={control}
          name="isActive"
          onChange={(value) => handleSwitchChange(value)}
          label="마감여부"
        />
      </div>
      <div className="pt-2.5 pb-4">
        <SearchInput
          value=""
          placeholder="찾으시는 모임을 검색해주세요"
          onClick={() => setOpenSearchModal(true)}
        />
      </div>
      {/* 스포츠종류 검색 */}
      <div className="flex justify-center pt-2.5 text-basic text-g-950">
        {sports.map(({ id, name }) => {
          return (
            <div
              key={id}
              className="mr-5 text-center hover:cursor-pointer"
              onClick={() => handleSportsCategoryChange({ id, name })}
            >
              <div className="pb-1 rounded h-[68px] w-[68px] bg-g-100">
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
        } fixed inset-0 max-w-sm mx-auto  z-50 mb-6`}
      >
        <div className="px-4">
          <header className="top-0 left-0 right-0 z-50 ">
            <div className="box-border relative flex items-center justify-between max-w-sm px-4 mx-auto h-14">
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
            <FormSwitch control={control} name="isActive" label="마감여부" />
          </div>

          <div className="pb-8">
            <Label>종류</Label>
            <FormButtonGroup control={control} name="sports" options={sports} />
          </div>

          <div className="pb-8">
            <Label>모임 날짜</Label>
            <div className="pt-1.5">
              <FormDatePicker control={control} name="date" width="100%" />
            </div>
          </div>

          <div className="pb-8">
            <Label>모임 시작 시간</Label>
            <div className="pt-1.5">
              <FormSelect
                control={control}
                name="startTime"
                width="100%"
                options={generateTimeOptions()}
                optionMaxHeight={200}
              />
            </div>
          </div>

          <div className="pb-8">
            <Label>장소</Label>
            <div className="pt-1.5">
              <FormTextInput
                control={control}
                name="place"
                placeholder="원하는 장소를 검색해주세요"
                status={errors.searchKeyword ? 'error' : 'default'}
                statusMessage={errors.searchKeyword?.message}
                endIcon={<Search size={18} color="#A1A1AA" />}
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          color="gray"
          width="100%"
          className="absolute inset-x-0 bottom-0"
        >
          검색
        </Button>
      </div>
    </form>
  );
};
