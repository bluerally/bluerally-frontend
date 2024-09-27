import { GetPartyListQuery, GetPartyListResponse } from '@/@types/party/type';
import { useGetPartyList } from '@/hooks/api/party';
import { FormEvent, useMemo, useState } from 'react';
import { List } from './main/List';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  Button,
  Chip,
  DatePicker,
  Label,
  SearchInput,
  TextInput,
  theme,
} from 'bluerally-design-system';
import { Bell,  MoveLeft, Search } from 'lucide-react';
import { Header } from './layouts/Header';
import { SideNavigation } from './common/SideNavigation';
import { useAuth } from '@/hooks/useAuth';
import { useGetSports } from '@/hooks/api/common';
import { useRouter } from 'next/router';
import { Divider } from './common/Divider';
import { Footer } from './layouts/Footer';

const DEFAULT_PARAMS: GetPartyListQuery = {
  is_active: false,
  page: 1,
};

const Main = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [params, setParams] = useState<GetPartyListQuery>(DEFAULT_PARAMS);
  const [formValues, setFormValues] = useState({
    sport_id: undefined,
    search_query: '',
    gather_date_max: undefined,
    place: '',
  });

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { data: sportsData } = useGetSports();
  const { data, fetchNextPage, hasNextPage } = useGetPartyList(params);

  const sports = sportsData?.data ?? [];

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  const handleAvatarClick = () => {
    setIsNavOpen(true);
  };

  const handleCloseNav = () => {
    setIsNavOpen(false);
  };

  const handleSportsCategoryChange = ({ id }: { id: number }) => {
    setParams({ ...params, sport_id: id });
  };

  const handleClickAllSports = () => {
    // setParams({ ...params, sport_id: null });
  };

  const handleChangeField = ({
    value,
    name,
  }: {
    value: string | number;
    name: string;
  }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setParams(formValues);
    setIsSearchModalOpen(false);
  };

  const partyList = useMemo(() => {
    return data?.pages.reduce<GetPartyListResponse>((acc, page) => {
      return acc.concat(page.data);
    }, []);
  }, [data]);

  return (
    <div className="relative flex flex-col h-full mx-auto bg-g-100">
      {!isNavOpen && (
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

      {/* <div className="h-[568px] bg-b-300" /> */}

      <div className="flex-shrink-0">
        <form onSubmit={handleSubmit} className="p-4 bg-g-300">
          <div className="flex gap-2 text-basic text-g-950">
            <div onClick={handleClickAllSports}>
              <Chip
                variant={!params.sport_id ? 'primary-outline' : 'gray-filled'}
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
                      id === params.sport_id ? 'primary-outline' : 'gray-filled'
                    }
                  >
                    {name}
                  </Chip>
                </div>
              );
            })}
          </div>

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
                    // statusMessage={errors.searchKeyword?.message}
                    // status={errors.searchKeyword ? 'error' : 'default'}
                  />
                  <span />
                </div>
              </header>
            </div>
            <Divider />

            <div className="p-5">
              <div className="pb-7">
                <Label>스포츠</Label>
                <div className="pt-1.5 flex gap-2">
                  {sports.map(({ id, name }) => {
                    const isSelected = formValues?.sport_id === id;
                    return (
                      <Button
                        type="button"
                        key={id}
                        value={id}
                        onClick={() => {
                          handleChangeField({
                            value: id,
                            name: 'sport_id',
                          });
                        }}
                        variant={
                          isSelected ? 'primary-outline' : 'gray-outline'
                        }
                        size="md"
                      >
                        {name}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="pb-7">
                <Label>모임 날짜</Label>
                <div className="pt-1.5">
                  <DatePicker
                    name="date"
                    width="100%"
                    startYear={2000}
                    endYear={2030}
                    value={formValues?.gather_date_max}
                    onChange={(value) =>
                      handleChangeField({
                        value,
                        name: 'gather_date_max',
                      })
                    }
                  />
                </div>
              </div>

              <div className="pb-7">
                <Label>장소</Label>
                <div className="pt-1.5">
                  <TextInput
                    name="place"
                    placeholder="원하는 장소를 검색해주세요"
                    startIcon={
                      <Search size={20} color={theme.palette.gray['400']} />
                    }
                    value={formValues.place}
                    onChange={(e) => {
                      handleChangeField({
                        value: e.target.value,
                        name: 'place',
                      });
                    }}
                    // status={errors.searchKeyword ? 'error' : 'default'}
                    // statusMessage={errors.searchKeyword?.message}
                  />
                </div>
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
        <List data={partyList} />
        <div ref={setTarget} />
      </div>
      {isNavOpen && (
        <>
          <div
            className="absolute inset-0 z-40 bg-black bg-opacity-50"
            onClick={handleCloseNav}
          />
          <div className="absolute top-0 right-0 z-50 h-full">
            <SideNavigation open={isNavOpen} onClose={handleCloseNav} />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Main;
