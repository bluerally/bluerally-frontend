import React, { useState, useEffect } from 'react';
import { Button, Label, SearchInput } from 'bluerally-design-system';
import dayjs from 'dayjs';
import _ from 'lodash';

import { FormButtonGroup } from '../form/FormButtonGroup';
import { FormDatePicker } from '../form/FormDatePicker';
import { FormNumberInput } from '../form/FormNumberInput';
import { CircleDollarSign, Plus } from 'lucide-react';
import { FormSelect } from '../form/FormSelect';
import { generateTimeOptions, generateTimeStamp, generateISO } from '@/utils';

interface Props {
  control: any;
  sports: any;
  errors: any;
  watchAll: any;

  setValue: any;
  setShowSection: any;
}

const PartyCreateFirst = (props: Props) => {
  let participantLimitList: any[] = [];

  for (let i = 2; i <= 30; i++) {
    participantLimitList.push({ id: i, name: `${i}명` });
  }

  //   console.log('props.control', props.control);

  // console.log('watchAll', props.watchAll);
  // console.log('값 확인', _.isEmpty(props.watchAll));

  const checkValueEmpty = _.values(props.watchAll).some(
    (value) => _.isUndefined(value) || _.isNull(value),
  );

  /** 모임 날짜와 시간 */
  useEffect(() => {
    if (
      !_.isUndefined(props.watchAll.gather_date) &&
      !_.isUndefined(props.watchAll.gather_time)
    ) {
      const gatherAt = new Date(
        props.watchAll.gather_date + 'T' + props.watchAll.gather_time.value,
      );

      props.setValue('gather_at', generateISO(gatherAt), {
        shouldValidate: true,
      });
    }
  }, [props.watchAll.gather_date, props.watchAll.gather_time]);

  /** 모집 마감 날짜와 시간 */
  useEffect(() => {
    if (
      !_.isUndefined(props.watchAll.due_date) &&
      !_.isUndefined(props.watchAll.due_time)
    ) {
      const dueAt = new Date(
        props.watchAll.due_date + 'T' + props.watchAll.due_time.value,
      );

      props.setValue('due_at', generateISO(dueAt), {
        shouldValidate: true,
      });
    }
  }, [props.watchAll.due_date, props.watchAll.due_time]);

  return (
    <>
      <div className="pb-4">
        <div className="label">스포츠</div>
        <FormButtonGroup
          control={props.control}
          name="sport_id"
          options={props.sports}
        />
      </div>
      <div className="pb-4">
        <div className="label">모임 날짜</div>

        <div className="pt-1.5">
          <FormDatePicker
            control={props.control}
            name="gather_date"
            width="100%"
            placeholder={`${dayjs().format('YYYY-MM-DD')}`}
          />
        </div>
      </div>
      <div className="pb-4">
        <div className="label">모임 시간</div>
        <div className="pt-1.5">
          <FormSelect
            control={props.control}
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

        <div className="pt-1.5">
          <FormButtonGroup
            control={props.control}
            name="participant_limit"
            options={participantLimitList}
          />
        </div>
      </div>
      <div className="divide-line" />

      <div className="pb-4">
        <div className="label">모집마감날짜</div>
        <div className="pt-1.5">
          <FormDatePicker
            control={props.control}
            name="due_date"
            width="100%"
            placeholder={`${dayjs().format('YYYY-MM-DD')}`}
          />
        </div>
      </div>
      <div className="pb-4">
        <div className="label">모집마감시간</div>
        <div className="pt-1.5">
          <FormSelect
            control={props.control}
            name="due_time"
            width="100%"
            options={generateTimeOptions()}
            optionMaxHeight={200}
            placeholder="00:00"
          />
        </div>
      </div>
      {/* 
      <div className="pb-4">
        <Label>금액</Label>
        <div className="pt-1.5">
          <FormNumberInput
            control={props.control}
            name="participant_cost"
            placeholder="1000원"
            status={props.errors.participant_cost ? 'error' : 'default'}
            statusMessage={props.errors.participant_cost?.message}
            startIcon={<CircleDollarSign size={18} color="#A1A1AA" />}
          />
        </div>
      </div> */}
      {!checkValueEmpty && (
        <div>
          <div
            className="bottom-button"
            // className="w-[350px] h-[52px] p-[14px] px-[var(--spacingmd2)] pb-0 gap-[var(--spacing5xs)] rounded-tl-[30px] opacity-0"
            onClick={() => {
              props.setShowSection(2);
            }}
          >
            <span>다음</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PartyCreateFirst;
