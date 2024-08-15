import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import { usePostCreateParty } from '@/hooks/api/party';
import { Header } from '@/components/layouts/Header';
import { useGetSports } from '@/hooks/api/common';

import {
  Button,
  DatePicker,
  TextArea,
  TextInput,
  formatter,
  useNotification,
} from 'bluerally-design-system';
import { ChevronLeft, Info, MapPin, X, Map } from 'lucide-react';
import { PostPartyDetailRequestParams } from '@/@types/party/type';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

const isFirstStep = (step: 1 | 2) => step === 1;

const PARTICIPANT_COUNT = Array.from({ length: 29 }, (_, i) => ({
  value: i + 2,
  title: `${i + 2}명`,
}));

export const CreateParty = () => {
  const router = useRouter();

  const { data: sportsData } = useGetSports();
  const { mutate: createParty } = usePostCreateParty();

  const [params, setParams] = useState<PostPartyDetailRequestParams>({
    title: '',
    body: '',
    gather_at: '',
    due_at: '',
    place_id: 0,
    place_name: '',
    address: '',
    longitude: 0,
    latitude: 0,
    participant_limit: 2,
    participant_cost: 0,
    sport_id: 0,
    notice: '',
  });

  const [validationStatus, setValidationStatus] = useState({
    title: true,
    body: true,
    gather_at: true,
  });

  const [errorMessages, setErrorMessages] = useState({
    title: true,
    body: true,
  });

  /** 주소검색 모달 오픈 여부 */
  const [isOpenPostcode, setIsOpenPostcode] = useState(false);

  const [step, setStep] = useState<1 | 2>(1);

  const notification = useNotification();

  const handlePrev = () => {
    setStep(1);
  };

  const handleNext = () => {
    setStep(2);
  };

  const sports = sportsData?.data ?? [];

  const handleChangeField = ({
    value,
    name,
  }: {
    value: string | number;
    name: string;
  }) => {
    setParams({ ...params, [name]: value });
  };

  const selectAddress = ({ address }: { address: string }) => {
    setParams({ ...params, address });
    setIsOpenPostcode(false);
  };

  const handleSave = () => {
    console.log({ params });

    notification.alert({
      type: 'confirm',
      title: '모임 개설',
      content: '모임을 개설하시겠습니까?',
      onConfirm: () => {
        createParty(params, {
          onSuccess: () => {
            notification.alert({
              type: 'alert',
              title: '모임이 성공적으로 개설되었습니다.',
              onConfirm: () => {
                router.push('/');
              },
            });
          },
        });
      },
    });
  };

  const getHeader = (step: 1 | 2) => {
    return (
      <Header
        left={
          isFirstStep(step) ? (
            <X
              className="pointer"
              onClick={() => {
                notification.alert({
                  type: 'confirm',
                  title: '게시물을 닫으시겠어요?',
                  content: '작성중인 내용은 저장되지 않아요',
                  onConfirm: () => router.push(`/`),
                });
              }}
            />
          ) : (
            <ChevronLeft size={24} onClick={handlePrev} className="pointer" />
          )
        }
        center={<>모임개설</>}
        right={
          !isFirstStep(step) && (
            <div className="custom-button success-full" onClick={handleSave}>
              게시
            </div>
          )
        }
      />
    );
  };

  return (
    <form className="relative flex flex-col min-h-screen bg-g-50">
      {getHeader(step)}

      <div className="flex-grow">
        {isFirstStep(step) ? (
          <>
            <div className="p-5 mb-4 bg-white">
              <div className="pb-4">
                <div className="text-basic-2 text-g">스포츠</div>
                <div className="pt-1.5 flex gap-2">
                  {sports.map(({ id, name }) => {
                    const isSelected = params.sport_id === id;
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
                        size="sm"
                      >
                        {name}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div className="pb-4">
                <div className="text-basic-2 text-g">모임 날짜</div>
                <div className="pt-1.5">
                  <DatePicker
                    name="gather_date"
                    width="100%"
                    placeholder={formatter.date(dayjs())}
                    startYear={2000}
                    endYear={2030}
                    value={params.gather_at}
                    onChange={(value) =>
                      handleChangeField({
                        value,
                        name: 'gather_at',
                      })
                    }
                  />
                </div>
              </div>
              <div className="pb-4">
                <div className="text-basic-2 text-g">인원수</div>
                <div className="pt-1.5 overflow-x-auto">
                  <div className="inline-flex gap-1 whitespace-nowrap">
                    {PARTICIPANT_COUNT.map(({ value, title }) => {
                      const isSelected = params.participant_limit === value;
                      return (
                        <Button
                          type="button"
                          key={value}
                          value={value}
                          onClick={() => {
                            handleChangeField({
                              value,
                              name: 'participant_limit',
                            });
                          }}
                          variant={
                            isSelected ? 'primary-outline' : 'gray-outline'
                          }
                          size="sm"
                        >
                          {title}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white">
              <div className="pb-4">
                <div className="text-basic-2 text-g">모집마감날짜</div>
                <div className="pt-1.5">
                  <DatePicker
                    name="due_at"
                    width="100%"
                    placeholder={formatter.date(dayjs())}
                    startYear={2000}
                    endYear={2030}
                    value={params.due_at}
                    onChange={(value) =>
                      handleChangeField({
                        value,
                        name: 'due_at',
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col flex-grow p-5 bg-white">
              <div>
                <TextInput
                  name="title"
                  placeholder="제목을 입력해주세요"
                  value={params.title}
                  onChange={(e) =>
                    handleChangeField({
                      value: e.target.value,
                      name: 'title',
                    })
                  }
                  containerStyle={{ border: 'none', padding: 0 }}
                  // status={props.errors.title ? 'error' : 'default'}
                  // statusMessage={props.errors.title?.message}
                />
              </div>

              <TextArea
                name="body"
                placeholder="내용을 입력해주세요"
                className="pt-2"
                value={params.body}
                onChange={(e) =>
                  handleChangeField({
                    value: e.target.value,
                    name: 'body',
                  })
                }
                containerStyle={{ border: 'none', padding: 0 }}
                // status={props.errors.body ? 'error' : 'default'}
                // statusMessage={props.errors.body?.message}
              />
            </div>
            <div>
              {/* 카카오맵 */}
              {!!(params.latitude && params.longitude) && (
                <div id="map" className="w-[300px] h-[300px]" />
              )}
              <div
                id="map"
                className={`w-[300px] h-[300px] ${
                  !params.latitude && !params.longitude ? 'hidden' : 'block'
                }`}
              />
            </div>
            <div className="flex-1 bg-white ">
              <div className="box-border relative">
                {params.address ? (
                  <div>
                    <div
                      className="flex px-5 py-3 cursor-pointer bg-g-50 text-md text-g-600"
                      onClick={() => {
                        setIsOpenPostcode(true);
                      }}
                    >
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                      </div>
                      <div>{params.address}</div>
                    </div>

                    <div className="px-5 pt-3 pb-10 border-t bg-g-50 border-g-200">
                      <div className="flex items-center pt-3 pb-1.5 text-md text-g-500">
                        <Map size={16} className="mr-1" />
                        <div>상세 주소</div>
                      </div>
                      <TextInput
                        name="place_name"
                        placeholder="상세주소를 입력해주세요"
                        value={params.place_name}
                        onChange={(e) => {
                          handleChangeField({
                            value: e.target.value,
                            name: 'place_name',
                          });
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className={`bg-b-50 cursor-pointer text-md px-5 py-3 text-b-500 ${
                      !params.address ? 'empty' : ''
                    }`}
                    onClick={() => {
                      setIsOpenPostcode(true);
                    }}
                  >
                    <div
                      className={`flex items-center ${
                        !params.address ? 'empty' : ''
                      }`}
                    >
                      <MapPin size={16} className="mr-1" />
                      장소
                    </div>
                  </div>
                )}

                <div className="flex-1 px-5 pt-5 pb-10 bg-g-100 text-g-500">
                  <div className="flex items-center pb-2.5">
                    <Info size={16} className="mr-1" />
                    <div className="text-md">추가정보</div>
                  </div>
                  <TextArea
                    placeholder="해당 정보는 모임을 신청한 멤버에게만 공개됩니다.
              연락처, 오픈카톡 링크,금액 등을 입력할 수 있어요.
              "
                    value={params.notice}
                    onChange={(e) =>
                      handleChangeField({
                        value: e.target.value,
                        name: 'notice',
                      })
                    }
                    // status={props.errors.title ? 'error' : 'default'}
                    // statusMessage={props.errors.title?.message}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {isFirstStep(step) && (
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 p-5 bg-white">
            <Button color="gray" className="w-full" onClick={handleNext}>
              다음
            </Button>
          </div>
        </div>
      )}
      {isOpenPostcode && (
        <div className="fixed inset-0 w-[390px] min-w-96 mx-auto z-50 bg-g-0">
          <Header
            right={
              <X
                onClick={() => {
                  setIsOpenPostcode(false);
                }}
              />
            }
          />
          <DaumPostcode
            className="absolute h-full"
            onComplete={selectAddress}
            autoClose={false}
            defaultQuery=""
          />
        </div>
      )}
    </form>
  );
};
