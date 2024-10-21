import { GetPartyListQuery, GetPartyListResponse } from '@/@types/party/type';
import qs from 'qs';
import { SPORTS } from '@/constants/common';
import { useGetSports } from '@/hooks/api/common';
import { useGetPartyList } from '@/hooks/api/party';
import { Divider } from '@mui/material';
import {
  Button,
  Checkbox,
  Chip,
  DatePicker,
  DateRangeType,
  formatter,
  Label,
  SearchInput,
  theme,
} from 'bluerally-design-system';
import dayjs from 'dayjs';
import {
  Bell,
  Calendar,
  ChevronDown,
  MapPin,
  MoveLeft,
  Search,
  UsersRound,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useState } from 'react';
import { NoDataMessage } from './common/NoDataMessage';
import { BottomMenu } from './layouts/BottomMenu';
import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';

const DEFAULT_PARAMS: GetPartyListQuery = {
  is_active: true,
  page: 1,
};

const Main = () => {
  const router = useRouter();
  const { query } = router;

  const [params, setParams] = useState<GetPartyListQuery>(DEFAULT_PARAMS);
  const [formValues, setFormValues] = useState<{
    sport_id: number[];
    search_query: string;
    gather_date_min?: string;
    gather_date_max?: string;
    is_active: boolean;
  }>({
    sport_id: [],
    search_query: '',
    gather_date_min: undefined,
    gather_date_max: undefined,
    is_active: true,
  });

  const [dates, setDates] = useState<DateRangeType>([
    formValues.gather_date_min || '',
    formValues.gather_date_max || '',
  ]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isShowResults, setIsShowResults] = useState(false);

  const { data: sportsData } = useGetSports();
  const { data, fetchNextPage, hasNextPage } = useGetPartyList(params);

  const sports = sportsData?.data ?? [];

  const handleSportsCategoryChange = ({ id }: { id: number }) => {
    setParams({ ...params, sport_id: id, page: 1 });
  };

  const handleSportsCategoryFieldChange = (id: number) => {
    setFormValues((prev) => {
      const isSelected = prev.sport_id.includes(id);
      const newSportIds = isSelected
        ? prev.sport_id.filter((sportId) => sportId !== id) // 선택 해제
        : [...prev.sport_id, id];

      return { ...prev, sport_id: newSportIds };
    });
  };

  const handleClickAllSports = () => {
    setParams({ ...params, sport_id: undefined, page: 1 });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = e.target.checked;
    setFormValues({ ...formValues, is_active: !isActive });
  };

  const handleChangeField = ({
    value,
    name,
  }: {
    value: string | number | boolean;
    name: string;
  }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangeDateRangeField = ({
    value,
    name,
  }: {
    value: DateRangeType;
    name: string;
  }) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    router.push({
      pathname: router.pathname,
      query: queryString,
    });

    setParams(newParams);
    setIsShowResults(true);
    setIsSearchModalOpen(false);
  };

  const partyList = useMemo(() => {
    return data?.pages.reduce<GetPartyListResponse>((acc, page) => {
      return acc.concat(page.data);
    }, []);
  }, [data]);

  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleChange = (dates: DateRangeType) => {
    setDates(dates);

    handleChangeDateRangeField({
      value: dates,
      name: 'gather_date_min',
    });
  };

  const chips = useMemo(() => {
    return [
      query.sport_id && (
        <div className="flex gap-2" onClick={handleOpenSearchModal}>
          {query.sport_id &&
          Array.isArray(query.sport_id) &&
          query.sport_id.length > 0
            ? query.sport_id.map((id) => {
                const sport = SPORTS.find((sport) => String(sport.id) === id);
                return sport ? (
                  <Chip key={id} variant="primary-outline">
                    #{sport.name}
                  </Chip>
                ) : null;
              })
            : null}
        </div>
      ),
      query.gather_date_min && query.gather_date_max && (
        <div className="cursor-pointer" onClick={handleOpenSearchModal}>
          <Chip key="gather_date_max" variant="primary-outline">
            #{formatter.dateKR(query.gather_date_in as string)} ~
            {formatter.dateKR(query.gather_date_max as string)}
          </Chip>
        </div>
      ),
      query.is_active && (
        <div className="cursor-pointer" onClick={handleOpenSearchModal}>
          <Chip key="is_active" variant="primary-outline">
            #{query.is_active === 'true' ? '마감불포함' : '마감포함'}
          </Chip>
        </div>
      ),
    ].filter(Boolean);
  }, [query]);

  return (
    <div className="relative flex flex-col h-full mx-auto bg-g-100">
      {!isShowResults && (
        <Header
          right={
            <div className="flex items-center justify-center gap-[18px]">
              <div className="cursor-pointer">
                <Search size={24} onClick={() => setIsSearchModalOpen(true)} />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/notification`)}
              >
                <Bell size={24} />
              </div>
            </div>
          }
        />
      )}
      {/* <Image
        src={`/images/home_1.svg`}
        alt="buooy"
        width={600}
        height={600}
        priority
      /> */}
      <div className="flex-shrink-0">
        <form
          onSubmit={handleSubmit}
          className={`bg-g-100 ${isShowResults ? 'px-4' : 'p-4'}`}
        >
          {!isShowResults && (
            <div className="flex gap-2 text-basic text-g-950">
              <div onClick={handleClickAllSports} className="cursor-pointer">
                <Chip
                  variant={!params.sport_id ? 'primary-filled' : 'gray-outline'}
                >
                  전체
                </Chip>
              </div>
              {sports.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    className="text-center hover:cursor-pointer"
                    onClick={() => handleSportsCategoryChange({ id })}
                  >
                    <Chip
                      variant={
                        id === params.sport_id
                          ? 'primary-filled'
                          : 'gray-outline'
                      }
                    >
                      {name}
                    </Chip>
                  </div>
                );
              })}
            </div>
          )}

          {/* 서치 모달  */}
          <div
            className={`${
              isSearchModalOpen ? 'block' : 'hidden'
            } fixed inset-0  w-[600px] min-w-96 mx-auto z-50 bg-g-0`}
          >
            <div className="px-5">
              <header className="top-0 left-0 right-0 z-50">
                <div className="box-border relative flex items-center mx-auto h-14">
                  <span className="pr-3 cursor-pointer">
                    <MoveLeft
                      size={24}
                      onClick={() => setIsSearchModalOpen(false)}
                      color={theme.palette.gray['600']}
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
                    // statusMessage={errors.searchKeyword?.message}
                    // status={errors.searchKeyword ? 'error' : 'default'}
                  />
                  <span />
                </div>
              </header>
            </div>
            <Divider />

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
                          variant={
                            isSelected ? 'primary-outline' : 'gray-outline'
                          }
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
      </div>
      <div className="flex-grow overflow-y-auto bg-g-1">
        <div className="flex flex-col items-center justify-center w-full">
          {isShowResults && (
            <>
              {
                <div className="px-5">
                  <header className="top-0 left-0 right-0 z-50">
                    <div className="box-border relative flex items-center mx-auto h-14">
                      <span className="pr-3 cursor-pointer">
                        <MoveLeft
                          size={24}
                          onClick={() => router.back()}
                          color={theme.palette.gray['600']}
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
              }
              <div className="flex flex-wrap justify-start w-full gap-2 px-5 m-4">
                {chips}
              </div>
            </>
          )}

          {partyList?.length ? (
            <div className="w-full bg-g-100">
              {partyList.map(
                (
                  {
                    id,
                    title,
                    sport_name,
                    posted_date,
                    participants_info,
                    gather_date,
                    body,
                    address,
                    is_active,
                  },
                  index,
                ) => (
                  <div
                    key={index}
                    className="p-4 mx-5 mt-3 mb-4 hover:cursor-pointer bg-g-0 rounded-2xl"
                    onClick={() => router.push(`/detail/${id}`)}
                  >
                    <div className="flex gap-1">
                      <Chip variant="gray-filled" size="sm">
                        {sport_name}
                      </Chip>
                      {!is_active && (
                        <Chip variant="red-outline" size="sm">
                          마감
                        </Chip>
                      )}
                    </div>
                    <h1 className="pt-2 text-xl font-semibold md-2 text-g-900">
                      {title}
                    </h1>
                    <div className="text-md text-g-500">{body}</div>

                    <div className="flex justify-between">
                      <div className="flex w-full pt-4 text-basic-2 text-g-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {dayjs(gather_date).format('YY.MM.DD')}
                          <div className="w-0.5 h-0.5 bg-g-100 mx-1.5" />
                        </div>
                        <div className="flex items-center justify-end gap-1">
                          <UsersRound size={14} />
                          {participants_info}
                          <div className="w-0.5 h-0.5 bg-g-100 mx-1.5" />
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span className="max-w-[200px] truncate">
                            {address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <NoDataMessage
              message="아직 게시물이 없어요"
              description="좋은 모임이 곧 준비될거에요"
            />
          )}
        </div>
        {hasNextPage && (
          <div className="flex flex-row items-center justify-center gap-1 pt-5 pb-8 text-lg text-g-500">
            <span
              role="button"
              aria-label="button"
              onClick={() => fetchNextPage()}
            >
              더보기
            </span>
            <ChevronDown size={20} />
          </div>
        )}
        <Footer />
      </div>
      <BottomMenu />
    </div>
  );
};

export default Main;
