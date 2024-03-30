import React from 'react';
import { useRouter } from 'next/router';
import { useNavigate } from '@/hooks/useNavigate';
import { ChevronLeft, Share, GripVerticalIcon, X } from 'lucide-react';
import _ from 'lodash';

interface Props {
  title?: string;
  leftTpye?: 'close' | 'back' | 'none';
  rightType?: 'my' | 'share' | 'custom' | 'none';
  customButton?: ((item?: any) => any) | undefined;
}

export const Header = (props: Props) => {
  const { pushToRoute } = useNavigate();
  const router = useRouter();
  return (
    <div
      className="sticky top-0 left-0 right-0 z-50 h-14 flex justify-between border-g-100 border-b bg-white font-semibold font-18 items-center p-5 w-full"
      // style={{ backgroundColor: 'ivory' }}
    >
      <div className="w-3/1">
        {props.leftTpye === 'close' && (
          <X
            onClick={() => {
              // 닫기
            }}
          />
        )}
        {props.leftTpye === 'back' && (
          <ChevronLeft
            onClick={() => {
              router.back();
            }}
          />
        )}
      </div>
      {/* <div className="box-border relative flex items-center h-12 max-w-lg px-4 mx-auto bg-white border-b"> */}
      <div className="w-3/1">
        <span
          className="text-black cursor-pointer "
          onClick={() => pushToRoute('/')}
        >
          {!_.isUndefined(props.title) && props.title}
        </span>
      </div>
      <div className="w-3/1">
        {props.rightType === 'my' && (
          <div className="flex">
            <Share className="mr-5" />
            <GripVerticalIcon />
          </div>
        )}
        {props.rightType === 'share' && (
          <div className="flex">
            <Share className="mr-5" />
            <GripVerticalIcon />
          </div>
        )}
        {/* {!_.isEmpty(props) && */}
        {!_.isUndefined(props.customButton) && props?.customButton()}
      </div>
    </div>
  );
};
