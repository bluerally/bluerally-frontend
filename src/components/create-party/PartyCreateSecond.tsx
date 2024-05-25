import React, { useState, useEffect } from 'react';
import { FormTextInput } from '../form/FormTextInput';
import { FormTextArea } from '../form/FormTextArea';
import { Button, Label, SearchInput } from 'bluerally-design-system';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../common/Modal';

import _ from 'lodash';

interface Props {
  control: any;
  sports: any;
  errors: any;
  watchAll: any;
  setIsOpenPostcode: any;
}

const PartyCreateSecond = (props: Props) => {
  console.log('props.watchAll.address', props.watchAll.address);

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
      <div>
        <div className="pt-1.5">
          <FormTextInput
            control={props.control}
            name="title"
            placeholder="제목을 입력하세요"
            status={props.errors.title ? 'error' : 'default'}
            statusMessage={props.errors.title?.message}
          />
        </div>
      </div>

      <div>
        <FormTextArea
          control={props.control}
          name="body"
          placeholder="내용을 입력해주세요"
          status={props.errors.body ? 'error' : 'default'}
          statusMessage={props.errors.body?.message}
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
      {_.isEmpty(props.watchAll.address) && (
        <div>
          <Label>장소</Label>
          <input
            //   {...register('address', { required: true })}
            placeholder="Address"
            onClick={() => {
              props.setIsOpenPostcode(true);
            }}
            value={props.watchAll.address}
          />
        </div>
      )}

      {!_.isEmpty(props.watchAll.address) && (
        <div>
          <div>{props.watchAll.address}</div>
          <div className="pt-1.5">
            <FormTextInput
              control={props.control}
              name="place_name"
              placeholder="장소명을 입력하세요"
              status={props.errors.place_name ? 'error' : 'default'}
              statusMessage={props.errors.place_name?.message}
            />
          </div>
        </div>
      )}
      <div>
        <Label>추가정보</Label>

        {/* 연락처, 오픈카톡 링크 등을 입력할 수 있어요 */}
        <FormTextInput
          control={props.control}
          name="notice"
          placeholder="연락처, 오픈카톡 링크 등을 입력할 수 있어요"
          status={props.errors.title ? 'error' : 'default'}
          statusMessage={props.errors.title?.message}
        />
      </div>
    </>
  );
};

export default PartyCreateSecond;
