import { GetPartyListQuery } from '@/@types/party/type';
import {
  Button,
  Checkbox,
  Chip,
  DatePicker,
  DateRangeType,
  Label,
  SearchInput,
  theme,
} from 'buooy-design-system';
import dayjs from 'dayjs';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import qs from 'qs';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { DEFAULT_PARAMS } from '../Main';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setParams: Dispatch<SetStateAction<GetPartyListQuery>>;
  formValues: {
    sport_id: number[];
    search_query: string;
    gather_date_min?: string;
    gather_date_max?: string;
    is_active: boolean;
  };
  setFormValues: (values: any) => void;
  sports: { id: number; name: string }[];
};

const SearchModal = ({
  isOpen,
  onClose,
  setParams,
  formValues,
  setFormValues,
  sports,
}: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [dates, setDates] = useState<DateRangeType>([
    formValues.gather_date_min || '',
    formValues.gather_date_max || '',
  ]);

  const handleChangeField = ({
    value,
    name,
  }: {
    value: string | number | boolean;
    name: string;
  }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSportsCategoryFieldChange = (id: number) => {
    setFormValues((prev: { sport_id: number[] }) => {
      const isSelected = prev.sport_id.includes(id);
      const newSportIds = isSelected
        ? prev.sport_id.filter((sportId: number) => sportId !== id)
        : [...prev.sport_id, id];

      return { ...prev, sport_id: newSportIds };
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = e.target.checked;
    setFormValues({ ...formValues, is_active: !isActive });
  };

  const handleChange = (dates: DateRangeType) => {
    setDates(dates);

    handleChangeDateRangeField({
      value: dates,
    });
  };

  const handleChangeDateRangeField = ({ value }: { value: DateRangeType }) => {
    setFormValues({
      ...formValues,
      gather_date_min: value[0]
        ? dayjs(value[0]).format('YYYY-MM-DD')
        : undefined,
      gather_date_max: value[1]
        ? dayjs(value[1]).format('YYYY-MM-DD')
        : undefined,
    });
  };

  const handleBack = async () => {
    if (isLoading) {
      return;
    }

    setParams(DEFAULT_PARAMS);
    setIsLoading(true);

    await router.push('/');

    onClose();
    setIsLoading(false);
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const newParams: GetPartyListQuery = {
      page: 1,
      is_active: formValues.is_active,
    };

    Object.entries(formValues).forEach(([key, value]) => {
      if (value) {
        if (key === 'gather_date_max' && typeof value === 'string') {
          newParams[key] = dayjs(value).format('YYYY-MM-DD');
        } else {
          newParams[key as keyof GetPartyListQuery] = value as any;
        }
      }
    });

    const queryString = qs.stringify(
      {
        ...newParams,
        sport_id: formValues.sport_id,
      },
      { arrayFormat: 'repeat' },
    );

    setIsLoading(true);

    await router.push({
      pathname: '/search',
      query: queryString,
    });

    setParams(newParams);
    setDates(['', '']);
    setIsLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={`px-4`}>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed inset-0 min-w-96 mx-auto z-50 bg-white  w-full max-w-[600px]`}
      >
        <div className="pl-1 pr-5 border-b border-g-100">
          <header className="top-0 left-0 right-0 z-50">
            <div className="box-border relative flex items-center mx-auto h-14">
              <span className="pr-3 cursor-pointer">
                <ChevronLeft
                  size={24}
                  onClick={handleBack}
                  color={theme.palette.gray['600']}
                  strokeWidth={1.5}
                />
              </span>
              <SearchInput
                value={formValues.search_query}
                placeholder="검색어를 입력해주세요"
                onChange={(e) => {
                  handleChangeField({
                    value: e.target.value,
                    name: 'search_query',
                  });
                }}
                width={520}
                onClickReset={() => {
                  setFormValues({ ...formValues, search_query: '' });
                }}
              />
              <span />
            </div>
          </header>
        </div>
        <div className="p-5">
          <div className="pb-8">
            <Label>스포츠</Label>
            <div className="pt-1.5 flex gap-2">
              {sports.map(({ id, name }) => {
                const isSelected = formValues?.sport_id.includes(id);
                return (
                  <div
                    key={id}
                    onClick={() => {
                      handleSportsCategoryFieldChange(id);
                    }}
                    className="cursor-pointer"
                  >
                    <Chip
                      variant={isSelected ? 'primary-outline' : 'gray-outline'}
                    >
                      {name}
                    </Chip>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pb-8">
            <Label>모임 날짜</Label>
            <div className="pt-1.5">
              <DatePicker
                name="date"
                width="100%"
                startYear={2000}
                endYear={2030}
                value={dates}
                placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
                onChange={(dates) => handleChange(dates)}
                isRange
              />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Checkbox
              checked={!formValues.is_active}
              onChange={handleCheckboxChange}
            />
            <span className="text-g-600 text-md-2">마감된 모임 포함</span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Button type="submit" color="gray" width="100%">
            검색
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchModal;
