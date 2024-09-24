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
} from 'bluerally-design-system';
import { Bell, Home, PenSquare, Pencil, Search, X } from 'lucide-react';
import { Header } from './layouts/Header';
import { SideNavigation } from './common/SideNavigation';
import { useAuth } from '@/hooks/useAuth';
import { useGetSports } from '@/hooks/api/common';
import { useRouter } from 'next/router';
import { Avatar } from './common/Avatar';

const DEFAULT_PARAMS: GetPartyListQuery = {
  sport_id: 1,
  is_active: true,
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

  const handleChangeSwitch = (checked: boolean) => {
    setParams({ ...params, is_active: checked });
  };

  const handleSportsCategoryChange = ({ id }: { id: number }) => {
    setParams({ ...params, sport_id: id });
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
        <form onSubmit={handleSubmit} className="p-4 bg-g-0">
          <div className="flex pt-2.5 text-basic text-g-950 gap-2">
            <Chip>전체</Chip>
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
                <div className="box-border relative flex items-center justify-between max-w-sm mx-auto h-14">
                  <span className="cursor-pointer">
                    <X size={24} onClick={() => setIsSearchModalOpen(false)} />
                  </span>
                  <span className="text-lg font-semibold text-black">검색</span>
                  <span />
                </div>
              </header>
            </div>
            <hr />
            <div className="p-5">
              <div className="pt-1.5 pb-4">
                <SearchInput
                  value={formValues.search_query}
                  placeholder="검색어를 입력해주세요"
                  onChange={(e) => {
                    handleChangeField({
                      value: e.target.value,
                      name: 'search_query',
                    });
                  }}
                  // statusMessage={errors.searchKeyword?.message}
                  // status={errors.searchKeyword ? 'error' : 'default'}
                />
              </div>

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
                    endIcon={<Search size={18} color="#A1A1AA" />}
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
      {/* {isLoggedIn && (
        <div className="fixed bottom-0 right-0 flex items-center justify-end w-full h-24 p-5 bg-transparent">
          <div
            className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-b-500 shadow-lg cursor-pointer"
            onClick={() => router.push(`/create-party`)}
          >
            <Pencil size={24} className="text-white" />
          </div>
        </div>
      )} */}
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
      <footer className="sticky bottom-0 w-full h-[56px] p-4 bg-white text-center border-t border-gray-300">
        <div className="flex items-center justify-between h-full max-w-screen-lg mx-auto">
          <Home size={24} />
          <PenSquare size={24} />
          <Avatar size="xs" />
        </div>
      </footer>
    </div>
  );
};

export default Main;
