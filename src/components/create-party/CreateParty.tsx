import React, { useState, useEffect } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { Button, Label, SearchInput } from 'bluerally-design-system';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CircleDollarSign, Plus, X } from 'lucide-react';
import DaumPostcode from 'react-daum-postcode';
import _ from 'lodash';

import { usePostcreateParty } from '@/hooks/api/party';
import { Header } from '@/components/layouts/Header';
import { useGetSports } from '@/hooks/api/common';
import { components } from '@/@types/backend';
import Modal from '@/components/common/Modal';
import Dialog from '@/components/common/CustomDialog';
import { generateTimeOptions, generateTimeStamp, generateISO } from '@/utils';

import { FormButtonGroup } from '../form/FormButtonGroup';
import { FormDatePicker } from '../form/FormDatePicker';
import { FormTextInput } from '../form/FormTextInput';

/** @todo 숫자만 입력 가능 */
/** @todo 숫자만 입력 가능일때 3째자리 마다 콤마 설정 */
import PaddingLayout from '@/components/layouts/PaddingLayout';
import { FormNumberInput } from '../form/FormNumberInput';
import { Footer } from '@/components/layouts/Footer';
import { FormTextArea } from '../form/FormTextArea';
import { FormSelect } from '../form/FormSelect';

import PartyCreateFirst from './PartyCreateFirst';
import PartyCreateSecond from './PartyCreateSecond';

declare global {
  interface Window {
    kakao: any;
  }
}

/**
 * @description 파티 생성
 * @returns
 */
const CreateParty = () => {
  const { pushToRoute } = useNavigate();

  const { data: sportsData } = useGetSports();
  // const result = usePostcreateParty();
  const { mutate: createParty, data: createPartyData } = usePostcreateParty();

  /** 주소검색 모달 오픈 여부 */
  const [isOpenPostcode, setIsOpenPostcode] = useState<boolean>(false);

  /** 게시글 종료 다이얼로그 오픈 여부 */
  const [isOpenCloseDialog, setIsOpenCloseDialog] = useState<boolean>(false);

  /** 주소값 없음 */
  const [isEmptyAddress, setIsEmptyAddress] = useState<boolean>(false);

  /** 선택한 도로명 주소 */
  const [roadAddress, setRoadAddress] = useState<string>('');
  /** 위도/경도 [lat(y), lng(x)] */
  const [geoPoint, setGeoPoint] = useState<String[]>(['']);

  /** 보여줄 섹션 */
  const [showSection, setShowSection] = useState<1 | 2>(1);

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

  /** 등록 */
  // const handleCreateParty: SubmitHandler<
  //   components['schemas']['PartyDetailRequest']
  // > = (data) => {
  //   createParty(data);
  // };

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
  return (
    <>
      {showSection === 1 && (
        <Header
          left={
            <X
              className="pointer"
              onClick={() => {
                setIsOpenCloseDialog(true);
              }}
            />
          }
          center={<>모임개설</>}
        />
      )}
      {showSection === 2 && (
        <Header
          left={
            <div
              className="pointer"
              onClick={() => {
                setShowSection(1);
              }}
            >
              뒤로가기
            </div>
          }
          center={<>모임개설</>}
          right={
            <div
              className="custom-button success-full"
              onClick={() => {
                handleClickApply();
              }}
            >
              게시
            </div>
          }
        />
      )}
      <PaddingLayout>
        {/* <form > */}
        <form onSubmit={handleSubmit(testSubmit)}>
          {showSection === 1 && (
            <PartyCreateFirst
              control={control}
              sports={sports}
              errors={errors}
              watchAll={watchAll}
              setValue={setValue}
              setShowSection={setShowSection}
            />
          )}
          {showSection === 2 && (
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

          <Modal
            open={isOpenPostcode}
            onClose={() => {
              setIsOpenPostcode(false);
            }}
          >
            <DaumPostcode
              style={{ height: '100%' }}
              onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          </Modal>

          <Dialog
            open={isOpenCloseDialog}
            onClose={() => {
              setIsOpenCloseDialog(false);
            }}
            title="게시물을 닫으시겠어요?"
            content="작성중인 내용은 저장되지 않아요"
            onSumit={() => {
              pushToRoute(`/`);
              // setIsOpenCloseDialog(false);
            }}
          />

          {/* {isOpenPostcode && (
            <DaumPostcode
              onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
              autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
              defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
            />
          )} */}

          {/* {isOpenNotice && (
            <div>
              <Label>추가정보</Label>

              연락처, 오픈카톡 링크 등을 입력할 수 있어요
              <FormTextInput
                control={control}
                name="notice"
                placeholder="연락처, 오픈카톡 링크 등을 입력할 수 있어요"
                status={errors.title ? 'error' : 'default'}
                statusMessage={errors.title?.message}
              />
            </div>
          )} */}
          {/* {!isOpenNotice && (
            <div
              onClick={() => {
                setIsOpenNotice(true);
              }}
            >
              <Plus />
              <Label>추가정보</Label>
            </div>
          )} */}
        </form>
      </PaddingLayout>
      {/* <Footer /> */}
    </>
  );
};

export default CreateParty;
