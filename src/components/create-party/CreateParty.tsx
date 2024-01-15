import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';

import { components } from '@/@types/backend';

declare global {
  interface Window {
    kakao: any;
  }
}

const CreateParty = () => {
  const [isOpenPostcode, setIsOpenPostcode] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<components['schemas']['PartyCreateRequest']>({
    mode: 'all',
  });

  /** 등록 */
  const handleCreateParty: SubmitHandler<
    components['schemas']['PartyCreateRequest']
  > = (data) => {
    console.log(data);
  };

  const watchAll = watch();

  console.log('watchAll', watchAll);

  const geoCoder = new kakao.maps.services();
  //   const geoCoder = new kakao.maps.services.Geocoder();

  console.log('geoCoder', geoCoder);

  /** ========================================================================================== */

  /**
   * @description mock 스포츠 목록
   */
  const sportsList = [
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
    setIsOpenPostcode(false);
    setValue('address', item.roadAddress, { shouldValidate: true });
  };

  /** ========================================================================================== */

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document.getElementById('map');
        var options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  /** ========================================================================================== */
  return (
    <form onSubmit={handleSubmit(handleCreateParty)}>
      <div id="map" style={{ width: '300px', height: '300px' }}></div>

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
        마감
        <input
          {...register('due_at', { required: true })}
          placeholder="Due At"
        />
        {errors.due_at && <span>This field is required</span>}
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

      <div>
        스포츠 카테고리
        {/* <input
          type="number"
          {...register('sport_id', { required: true })}
          placeholder="Sport ID"
        /> */}
        <select
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
        </select>
        {errors.sport_id && <span>This field is required</span>}
      </div>

      <button type="submit">등록</button>
    </form>
  );
};

export default CreateParty;
