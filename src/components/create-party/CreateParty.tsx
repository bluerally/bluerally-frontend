import React, { useState } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { useForm } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import _ from 'lodash';

import { usePostCreateParty } from '@/hooks/api/party';
import { Header } from '@/components/layouts/Header';
import { useGetSports } from '@/hooks/api/common';
import { components } from '@/@types/backend';

import PartyCreateSecond from './PartyCreateSecond';
import { Button, useNotification } from 'bluerally-design-system';
import { ChevronLeft, X } from 'lucide-react';
import { FormSelect } from '../form/FormSelect';
import { FormButtonGroup } from '../form/FormButtonGroup';
import { FormDatePicker } from '../form/FormDatePicker';
import { generateTimeOptions } from '@/utils';

const isFirstStep = (step: 1 | 2) => step === 1;

const CreateParty = () => {
  const { pushToRoute } = useNavigate();

  const { data: sportsData } = useGetSports();
  const { mutate: createParty, data: createPartyData } = usePostCreateParty();

  /** 주소검색 모달 오픈 여부 */
  const [isOpenPostcode, setIsOpenPostcode] = useState(false);

  /** 주소값 없음 */
  const [isEmptyAddress, setIsEmptyAddress] = useState(false);

  /** 선택한 도로명 주소 */
  const [roadAddress, setRoadAddress] = useState<string>('');

  const [step, setStep] = useState<1 | 2>(1);

  const notification = useNotification();

  const handlePrev = () => {
    setStep(1);
  };

  const handleNext = () => {
    setStep(2);
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<components['schemas']['PartyDetailRequest']>({
    mode: 'all',
  });

  const watchAll = watch();

  // console.log('watchAll', watchAll);
  /** 테스트 서밋 */
  const testSubmit = () => {
    console.log('testSubmit');
  };

  /** ========================================================================================== */

  const sports = sportsData?.data ?? [];

  /** ========================================================================================== */

  /**
   * @description 주소 검색 후 값 저장
   * @param item
   */
  const selectAddress = (item: any) => {
    setRoadAddress(item.roadAddress);
    setIsOpenPostcode(false);
    setValue('address', item.roadAddress, { shouldValidate: true });
  };

  /** ========================================================================================== */

  /** 주소 검색창 열기 */
  const handleClickOpenPostCode = () => {
    //
  };

  /** 게시버튼 클릭 */
  const handleClickApply = async () => {
    const param = watchAll;
    setIsEmptyAddress(false);

    if (_.isNil(param.address)) {
      setIsEmptyAddress(true);
    } else {
      // delete param?.due_date;
      // delete param?.due_time;
      // delete param?.gather_date;
      // delete param?.gather_time;

      createParty(param);
    }
  };

  // console.log('isEmptyAddress', isEmptyAddress);

  /** ========================================================================================== */

  // /**
  //  * @description 카카오맵 설정
  //  */
  // useEffect(() => {
  //   const kakaoMapScript = document.createElement('script');
  //   kakaoMapScript.async = false;
  //   kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&libraries=services&autoload=false`;
  //   document.head.appendChild(kakaoMapScript);

  //   const onLoadKakaoAPI = () => {
  //     window.kakao.maps.load(() => {
  //       var container = document.getElementById('map');
  //       var options = {
  //         center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //         // center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //         level: 3,
  //       };

  //       var map = new window.kakao.maps.Map(container, options);
  //       var geoCoder = new window.kakao.maps.services.Geocoder();
  //       /**
  //        * @description 위도/경도 취득
  //        */
  //       var getAddressCoords = async (address: string) => {
  //         return new Promise((resolve, reject) => {
  //           geoCoder.addressSearch(address, (result: any, status: any) => {
  //             if (status === window.kakao.maps.services.Status.OK) {
  //               setGeoPoint([result[0].y, result[0].x]);

  //               console.log('Number(result[0].x)', Number(result[0].x));

  //               setValue('longitude', Number(result[0].x));
  //               setValue('latitude', Number(result[0].y));
  //               resolve([result[0].y, result[0].x]);
  //             } else {
  //               reject(status);
  //             }
  //           });
  //         });
  //       };

  //       if (!_.isEmpty(roadAddress)) {
  //         getAddressCoords(roadAddress);
  //       }
  //     });
  //   };

  //   kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  // }, [roadAddress]);

  /** ========================================================================================== */

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
                  onConfirm: () => pushToRoute(`/`),
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
            <div
              className="custom-button success-full"
              onClick={() => {
                handleClickApply();
              }}
            >
              게시
            </div>
          )
        }
      />
    );
  };

  return (
    <>
      <form
        className="relative flex flex-col min-h-screen bg-g-50"
        onSubmit={handleSubmit(testSubmit)}
      >
        {getHeader(step)}

        <div className="flex-grow">
          {isFirstStep(step) ? (
            <>
              <div className="p-5 mb-4 bg-white">
                <div className="pb-4">
                  <div className="label">스포츠</div>
                  <div className="pt-1.5">
                    <FormButtonGroup
                      control={control}
                      name="sport_id"
                      options={sports.map(({ name, id }) => {
                        return {
                          title: name,
                          value: id,
                        };
                      })}
                      gap={6}
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <div className="label">모임 날짜</div>
                  <div className="pt-1.5">
                    <FormDatePicker
                      control={control}
                      name="gather_date"
                      width="100%"
                      placeholder={`YYYY-MM-DD`}
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <div className="label">모임 시간</div>
                  <div className="pt-1.5">
                    <FormSelect
                      control={control}
                      name="gather_time"
                      width="100%"
                      options={generateTimeOptions()}
                      optionMaxHeight={200}
                      placeholder="00:00"
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <div className="label">인원수</div>
                  <div className="pt-1.5 whitespace-nowrap overflow-x-auto">
                    <FormButtonGroup
                      control={control}
                      options={Array.from({ length: 29 }, (_, i) => ({
                        value: i + 2,
                        title: `${i + 2}명`,
                      }))}
                      name="participant_limit"
                      gap={10}
                    />
                    {/* <FormCustomButtonGroup
                      control={props.control}
                      name="participant_limit"
                      options={participantLimitList}
                      value={props.watchAll.participant_limit}
                      setValue={props.setValue}
                    /> */}
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="pb-4">
                  <div className="label">모집마감날짜</div>
                  <div className="pt-1.5">
                    <FormDatePicker
                      control={control}
                      name="due_date"
                      width="100%"
                      placeholder={`YYYY-MM-DD`}
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <div className="label">모집마감시간</div>
                  <div className="pt-1.5">
                    <FormSelect
                      control={control}
                      name="due_time"
                      width="100%"
                      options={generateTimeOptions()}
                      optionMaxHeight={200}
                      placeholder="00:00"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <PartyCreateSecond
              control={control}
              sports={sports}
              errors={errors}
              watchAll={watchAll}
              setIsOpenPostcode={setIsOpenPostcode}
              roadAddress={roadAddress}
              setValue={setValue}
              isEmptyAddress={isEmptyAddress}
              setIsEmptyAddress={setIsEmptyAddress}
            />
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
          <div
            className={`${
              isOpenPostcode ? 'block' : 'hidden'
            } fixed inset-0  w-[390px] min-w-96 mx-auto z-50 bg-g-0`}
          >
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
              style={{ height: '100%' }}
              className="absolute h-full"
              onComplete={selectAddress}
              autoClose={false}
              defaultQuery=""
            />
          </div>
        )}
      </form>
    </>
  );
};

export default CreateParty;
