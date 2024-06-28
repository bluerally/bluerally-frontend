import React, { useState, useEffect } from 'react';
import { MapPin, Info, Map } from 'lucide-react';

import { FormTextInput } from '../form/FormTextInput';
import { FormTextArea } from '../form/FormTextArea';
import { Button, Label, SearchInput } from 'bluerally-design-system';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../common/Modal';

import { FormCustomTextInput } from '../form/FormCustomTextInput';
import { FormCustomTextArea } from '../form/FormCustomTextArea';
import { FooterCustom } from '../layouts/FooterCustom';

import _ from 'lodash';

interface Props {
  control: any;
  sports: any;
  errors: any;
  watchAll: any;
  setIsOpenPostcode: any;
  roadAddress: any;
  setValue: any;
}

const PartyCreateSecond = (props: Props) => {
  // console.log('props.watchAll.address', props.watchAll.address);
  /** 위도/경도 [lat(y), lng(x)] */
  const [geoPoint, setGeoPoint] = useState<String[]>(['']);

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

                console.log('Number(result[0].x)', Number(result[0].x));

                props.setValue('longitude', Number(result[0].x));
                props.setValue('latitude', Number(result[0].y));
                resolve([result[0].y, result[0].x]);
              } else {
                reject(status);
              }
            });
          });
        };

        if (!_.isEmpty(props.roadAddress)) {
          getAddressCoords(props.roadAddress);
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, [props.roadAddress]);

  // console.log('props.watchAll', props.watchAll);

  return (
    <>
      {/* <Modal
        open={isOpenPostCode}
        onClose={() => {
          setIsOpenPostcode(false);
        }}
      >
        <div>
          <DaumPostcode
            // onResize={{ width: '', height: '' }}
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        </div>
      </Modal> */}
      {/* <Modal
        open={isOpenPostCode}
        children={
          <DaumPostcode
            onComplete={selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
        }
      /> */}
      <div className="pb-1.5">
        <div className="pt-1.5">
          <FormCustomTextInput
            name="title"
            placeholder="제목을 입력해주세요"
            // status={props.errors.title ? 'error' : 'default'}
            // statusMessage={props.errors.title?.message}
            setValue={props.setValue}
            className={'input-title'}
          />
        </div>

        <FormCustomTextArea
          name="body"
          placeholder="내용을 입력해주세요"
          setValue={props.setValue}
          className={'input-content pt-2'}
          // status={props.errors.body ? 'error' : 'default'}
          // statusMessage={props.errors.body?.message}
        />
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
              (_.isUndefined(props.watchAll.latitude) &&
                _.isUndefined(props.watchAll.longitude) &&
                'none') ||
              (!_.isUndefined(props.watchAll.latitude) &&
                !_.isUndefined(props.watchAll.longitude) &&
                'content')
            }`,
          }}
        ></div>
      </div>

      <FooterCustom>
        {_.isEmpty(props.watchAll.address) && (
          <div
            className="address"
            onClick={() => {
              props.setIsOpenPostcode(true);
            }}
          >
            <div className="address-title flex">
              <MapPin
                style={{ width: '16px', marginTop: '10px', marginRight: '4px' }}
              />
              장소
            </div>
            {/* <Label>장소</Label>
          <input
            placeholder="Address"
            onClick={() => {
              props.setIsOpenPostcode(true);
            }}
            value={props.watchAll.address}
          /> */}
          </div>
        )}
        {!_.isEmpty(props.watchAll.address) && (
          <div className="font">
            <div className="flex address-title-read">
              <MapPin style={{ width: '16px', marginRight: '4px' }} />
              <div>{props.watchAll.address}</div>
            </div>

            <div className="pt-1.5 address-detail-wrapper">
              <div className="flex pt-3 pb-1.5 address-detail-title">
                <Map style={{ width: '16px', marginRight: '4px' }} />
                <div>상세 주소</div>
              </div>
              <FormCustomTextInput
                name="place_name"
                placeholder="상세주소를 입력해주세요"
                setValue={props.setValue}
                className={'address-detail'}
                // status={props.errors.place_name ? 'error' : 'default'}
                // statusMessage={props.errors.place_name?.message}
              />
            </div>
          </div>
        )}
        <div className="notice-wrapper">
          {/* 연락처, 오픈카톡 링크 등을 입력할 수 있어요 */}
          {/* <FormTextInput
          control={props.control}
          name="notice"
          placeholder="연락처, 오픈카톡 링크 등을 입력할 수 있어요"
          status={props.errors.title ? 'error' : 'default'}
          statusMessage={props.errors.title?.message}
        /> */}
          <div className="flex">
            <Info style={{ width: '16px', marginRight: '4px' }} />
            <div className="notice-title">추가정보</div>
          </div>
          <FormCustomTextArea
            name="title"
            placeholder="해당 정보는 모임을 신청한 멤버에게만 공개됩니다
          연락처, 오픈카톡 링크,금액 등을 입력할 수 있어요
          "
            // status={props.errors.title ? 'error' : 'default'}
            // statusMessage={props.errors.title?.message}
            setValue={props.setValue}
            className={'notice font'}
          />
        </div>
      </FooterCustom>
    </>
  );
};

export default PartyCreateSecond;
