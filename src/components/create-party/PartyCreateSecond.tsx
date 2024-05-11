import React, { useState, useEffect } from 'react';
import { FormTextInput } from '../form/FormTextInput';
import { FormTextArea } from '../form/FormTextArea';
import { Button, Label, SearchInput } from 'bluerally-design-system';
import _ from 'lodash';

interface Props {
  control: any;
  sports: any;
  errors: any;
  watchAll: any;
  setIsOpenPostcode: any;
}

const PartyCreateSecond = (props: Props) => {
  return (
    <>
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
      <div>
        <div className="pt-1.5">
          <FormTextInput
            control={props.control}
            name="place_name"
            placeholder="장소명을 입력하세요"
            status={props.errors.place_name ? 'error' : 'default'}
            statusMessage={props.errors.place_name?.message}
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
