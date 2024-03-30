import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';

import _ from 'lodash';

import { components } from '@/@types/backend';
import { Header } from '@/components/layouts/Header';

import { FormTextInput } from '@/components/form/FormTextInput';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSwitch } from '@/components/form/FormSwitch';
import { FormSelect } from '@/components/form/FormSelect';

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
  const [isOpenPostcode, setIsOpenPostcode] = useState<boolean>(false);
  /** 선택한 도로명 주소 */
  const [roadAddress, setRoadAddress] = useState<string>('');
  /** 위도/경도 [lat(y), lng(x)] */
  const [geoPoint, setGeoPoint] = useState<String[]>(['']);

  const {
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
    console.log(data);
  };

  const watchAll = watch();

  console.log('watchAll', watchAll);

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

  /** 게시버튼 클릭 */
  const handleClickApply = () => {
    //
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
        <div id="map" style={{ width: '300px', height: '300px' }}></div>
        <div>
          <div>종류</div>
          <div>
            {/* {...register('sport_id', { required: true })} */}
            {sportsList.map((item: SportType) => (
              <button
                key={item.id}
                onClick={() => {
                  setValue('sport_id', item.id, { shouldValidate: true });
                }}
              >
                {item.value}
              </button>
            ))}
          </div>

          {/* <input
          type="number"
          {...register('sport_id', { required: true })}
          placeholder="Sport ID"
        /> */}

          {/* <select
          value={watchAll.sport_id}
          {...register('sport_id', { required: true })}
        >
          <option value="">스포츠를 선택하세요</option>
          {sportsList.map((sport) => (
            <option
              key={sport.id}
              value={sport.id}
              onClick={() => {
                setValue('sport_id', sport.id, { shouldValidate: true });
              }}
            >
              {sport.value}
            </option>
          ))}
        </select> */}

          {/* {errors.sport_id && <span>This field is required</span>} */}
        </div>

        <div>
          마감 날짜
          <input
            {...register('due_at', { required: true })}
            placeholder="Due At"
          />
          {errors.due_at && <span>This field is required</span>}
        </div>

        <div>
          제목 : 50자
          <input
            {...register('title', { required: true })}
            placeholder="Title"
            maxLength={50}
          />
          {errors.title && <span>This field is required</span>}
        </div>

        <div>
          내용 : 500자
          <textarea
            {...register('body', { required: true })}
            maxLength={500}
            placeholder="Body"
          />
          {errors.body && <span>This field is required</span>}
        </div>

        <div>
          모임 시간
          <input
            {...register('gather_at', { required: true })}
            placeholder="Gather At"
          />
          {errors.gather_at && <span>This field is required</span>}
        </div>

        <div>
          장소
          <input
            {...register('place_name', { required: true })}
            placeholder="Place Name"
          />
          {errors.place_name && <span>This field is required</span>}
        </div>

        <div>
          상세 주소
          <input
            {...register('address', { required: true })}
            placeholder="Address"
            onClick={() => {
              setIsOpenPostcode(true);
            }}
            value={watchAll.address}
          />
          {errors.address && <span>This field is required</span>}
        </div>
        {isOpenPostcode && (
          <DaumPostcode
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        )}

        <div>
          인원 입력 (드롭다운x)
          <input
            type="number"
            {...register('participant_limit')}
            placeholder="Participant Limit"
          />
        </div>
        <div>
          금액
          <input
            type="number"
            {...register('participant_cost')}
            placeholder="Participant Cost"
          />
        </div>
        <div style={{ height: 1400 }}></div>

        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default CreateParty;
