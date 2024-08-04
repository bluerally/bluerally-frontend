import React, { useState, useEffect } from 'react';
import { Button, Label, SearchInput } from 'bluerally-design-system';
import dayjs from 'dayjs';
import _ from 'lodash';

import { FormCustomButtonGroup } from '../form/FormCustomButtonGroup';
import { FormDatePicker } from '../form/FormDatePicker';
import { FormNumberInput } from '../form/FormNumberInput';
import { CircleDollarSign, Plus } from 'lucide-react';
import { FormSelect } from '../form/FormSelect';
import { generateTimeOptions, generateTimeStamp, generateISO } from '@/utils';
import { FooterCustom } from '../layouts/FooterCustom';
import { FormButtonGroup } from '../form/FormButtonGroup';

interface Props {
  control: any;
  sports: any;
  errors: any;
  watchAll: any;

  setValue: any;
  setStep: any;
}

const PartyCreateFirst = (props: Props) => {
  let participantLimitList: any[] = [];

  for (let i = 2; i <= 30; i++) {
    participantLimitList.push({ id: i, name: `${i}명` });
  }

  const checkValueEmpty = _.isEmpty(props.watchAll)
    ? true
    : _.values(props.watchAll).some(
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
      {/* <FooterCustom>
        <div
          className={`bottom-button ${
            checkValueEmpty ? 'disabled' : 'success-full'
          }`}
          // className="w-[350px] h-[52px] p-[14px] px-[var(--spacingmd2)] pb-0 gap-[var(--spacing5xs)] rounded-tl-[30px] opacity-0"
          onClick={() => {
            props.setShowSection(2);
          }}
        >
          <span>다음</span>
        </div>
      </FooterCustom> */}
    </>
  );
};

export default PartyCreateFirst;
