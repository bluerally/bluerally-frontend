import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import _ from 'lodash';
import { CircleDollarSign, Plus } from 'lucide-react';

import { Button, Label, SearchInput } from 'bluerally-design-system';
import { Header } from '@/components/layouts/Header';
import { useGetSports } from '@/hooks/api/common';
import { usePostcreateParty } from '@/hooks/api/party';
import { components } from '@/@types/backend';
import { generateTimeOptions, generateTimeStamp, generateISO } from '@/utils';

import { FormButtonGroup } from '../form/FormButtonGroup';
import { FormDatePicker } from '../form/FormDatePicker';

/** @todo 숫자만 입력 가능 */
/** @todo 숫자만 입력 가능일때 3째자리 마다 콤마 설정 */
import { FormTextInput } from '../form/FormTextInput';
import { FormSelect } from '../form/FormSelect';
import { FormTextArea } from '../form/FormTextArea';

declare global {
  interface Window {
    kakao: any;
  }
}

type SportType = {
  id: number;
  key: string;
  value: string;
};

const CreateParty = () => {
  const { data: sportsData } = useGetSports();
  // const result = usePostcreateParty();
  const { mutate: createParty } = usePostcreateParty();

  const [isOpenPostcode, setIsOpenPostcode] = useState<boolean>(false);
  /** 선택한 도로명 주소 */
  const [roadAddress, setRoadAddress] = useState<string>('');
  /** 위도/경도 [lat(y), lng(x)] */
  const [geoPoint, setGeoPoint] = useState<String[]>(['']);

  /** 추가정보 */
  const [isOpenNotice, setIsOpenNotice] = useState<boolean>(false);

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
  const handleCreateParty: SubmitHandler<
    components['schemas']['PartyDetailRequest']
  > = (data) => {
    createParty(data);
    // console.log('게시함!!!!!', data);
  };

  const watchAll = watch();

  console.log('watchAll', watchAll);
  // console.log('watchAll.latitude', watchAll.latitude);
  // console.log('watchAll.longitude', watchAll.longitude);

  // console.log('process.env.API_TOKEN', process.env.NEXT_PUBLIC_API_TOKEN);

  /** ========================================================================================== */

  /**
   * @description mock 스포츠 목록
   */
  const sportsList: SportType[] = [
    { id: 1, key: 'freediving', value: '프리다이빙' },
    { id: 2, key: 'surfing', value: '서핑' },
    { id: 3, key: 'fishing', value: '낚시' },
    { id: 4, key: 'swim', value: '수영' },
  ];

  const sports = sportsData?.data ?? [];

  let participantLimitList: any[] = [];

  for (let i = 2; i <= 30; i++) {
    participantLimitList.push({ id: i, name: `${i}명` });
  }

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
  const handleClickApply = () => {
    handleCreateParty(watchAll);
    console.log(' 게시버튼 클릭 ');
  };

  /** 헤더 오른쪽에 들어갈 커스텀 버튼 */
  const applyButton = () => {
    return (
      <div
        className="w-16 h-9	bg-black text-white  rounded text-center flex justify-center items-center "
        onClick={handleClickApply}
      >
        <span className="text-sm">게시</span>
      </div>
    );
  };
  /** ========================================================================================== */

  // test
  useEffect(() => {
    const dddd = new Date();
    setValue('gather_at', generateISO(dddd), { shouldValidate: true });
    setValue('due_at', generateISO(dddd), { shouldValidate: true });
  }, []);

  /** ========================================================================================== */

  /**
   * @description 카카오맵 설정
   */
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&libraries=services&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map');
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          // center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);
        var geoCoder = new window.kakao.maps.services.Geocoder();
        /**
         * @description 위도/경도 취득
         */
        var getAddressCoords = async (address: string) => {
          return new Promise((resolve, reject) => {
            geoCoder.addressSearch(address, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                setGeoPoint([result[0].y, result[0].x]);
                setValue('longitude', Number(result[0].x));
                setValue('latitude', Number(result[0].y));
                resolve([result[0].y, result[0].x]);
              } else {
                reject(status);
              }
            });
          });
        };

        if (!_.isEmpty(roadAddress)) {
          getAddressCoords(roadAddress);
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, [roadAddress]);

  /** ========================================================================================== */
  return (
    <div>
      <Header leftTpye="back" title="글쓰기" customButton={applyButton} />
      <form onSubmit={handleSubmit(handleCreateParty)}>
        <div>
          <div>종류</div>
          <FormButtonGroup control={control} name="sport_id" options={sports} />
        </div>

        <div className="pb-8">
          <Label>마감 날짜</Label>
          <div className="pt-1.5">
            <FormDatePicker control={control} name="due_at" width="100%" />
          </div>
          {/* 마감 날짜
          <input
            {...register('due_at', { required: true })}
            placeholder="Due At"
          />
          {errors.due_at && <span>This field is required</span>} */}
        </div>
        <div>
          <Label>모임 시작 시간</Label>
          <div className="pt-1.5">
            <FormSelect
              control={control}
              name="gather_at"
              width="100%"
              options={generateTimeStamp()}
              optionMaxHeight={200}
            />
          </div>
          {/* <input
            {...register('gather_at', { required: true })}
            placeholder="Gather At"
          />
          {errors.gather_at && <span>This field is required</span>} */}
        </div>

        <div>
          <Label>금액</Label>
          <div className="pt-1.5">
            <FormTextInput
              control={control}
              name="participant_cost"
              placeholder="1000원"
              status={errors.participant_cost ? 'error' : 'default'}
              statusMessage={errors.participant_cost?.message}
              startIcon={<CircleDollarSign size={18} color="#A1A1AA" />}
            />
          </div>
          {/* <input
            {...register('title', { required: true })}
            placeholder="Title"
            maxLength={50}
          />
          {errors.title && <span>This field is required</span>} */}
        </div>
        <div>
          <Label>인원 입력</Label>
          <FormButtonGroup
            control={control}
            name="participant_limit"
            options={participantLimitList}
          />
        </div>

        <div>
          <div className="pt-1.5">
            <FormTextInput
              control={control}
              name="title"
              placeholder="제목을 입력하세요"
              status={errors.title ? 'error' : 'default'}
              statusMessage={errors.title?.message}
            />
          </div>
          {/* <input
            {...register('title', { required: true })}
            placeholder="Title"
            maxLength={50}
          />
          {errors.title && <span>This field is required</span>} */}
        </div>

        <div>
          <FormTextArea
            control={control}
            name="body"
            placeholder="내용을 입력해주세요"
            status={errors.body ? 'error' : 'default'}
            statusMessage={errors.body?.message}
          />
          {/* <textarea
            {...register('body', { required: true })}
            maxLength={500}
            placeholder="Body"
          />
          {errors.body && <span>This field is required</span>} */}
        </div>
        <div>
          {/* 카카오맵 */}
          {/* {!_.isEmpty(watchAll.latitude) && !_.isEmpty(watchAll.longitude) && (
            <div id="map" style={{ width: '300px', height: '300px' }}></div>
          )} */}
          <div
            id="map"
            style={{
              width: '300px',
              height: '300px',
              display: `${
                (_.isUndefined(watchAll.latitude) &&
                  _.isUndefined(watchAll.longitude) &&
                  'none') ||
                (!_.isUndefined(watchAll.latitude) &&
                  !_.isUndefined(watchAll.longitude) &&
                  'content')
              }`,
            }}
          ></div>
          {/* {!_.isUndefined(watchAll.latitude) &&
            !_.isUndefined(watchAll.longitude) && (
              <div
                id="map"
                style={{
                  width: '300px',
                  height: '300px',
                }}
              ></div>
            )} */}
        </div>

        <div>
          장소
          <input
            {...register('address', { required: true })}
            placeholder="Address"
            onClick={() => {
              setIsOpenPostcode(true);
            }}
            value={watchAll.address}
          />
        </div>
        <div>
          <div className="pt-1.5">
            <FormTextInput
              control={control}
              name="place_name"
              placeholder="장소명을 입력하세요"
              status={errors.place_name ? 'error' : 'default'}
              statusMessage={errors.place_name?.message}
            />
          </div>
          {/* <input
            {...register('title', { required: true })}
            placeholder="Title"
            maxLength={50}
          />
          {errors.title && <span>This field is required</span>} */}
        </div>
        {isOpenPostcode && (
          <DaumPostcode
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        )}

        {isOpenNotice && (
          <div>
            <Label>추가정보</Label>

            {/* 연락처, 오픈카톡 링크 등을 입력할 수 있어요 */}
            <FormTextInput
              control={control}
              name="notice"
              placeholder="연락처, 오픈카톡 링크 등을 입력할 수 있어요"
              status={errors.title ? 'error' : 'default'}
              statusMessage={errors.title?.message}
            />
          </div>
        )}
        {!isOpenNotice && (
          <div
            onClick={() => {
              setIsOpenNotice(true);
            }}
          >
            <Plus />
            <Label>추가정보</Label>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateParty;
