import { useNavigate } from '@/hooks/useNavigate';
import React from 'react';
import _ from 'lodash';

interface Props {
  title?: string;
  leftTpye?: 'close' | 'back' | 'none';
  rightType?: 'my' | 'share' | 'custom' | 'none';
  customButton?: (item?: any) => void;
}

export const Header = (props: Props) => {
  const { pushToRoute } = useNavigate();
  return (
    <div
      className="sticky top-0 left-0 right-0 z-50 h-14 flex justify-between border-g-100 border-b bg-white font-semibold font-18 items-center p-5"
      // style={{ backgroundColor: 'ivory' }}
    >
      <div className="w-3/1">dddd</div>
      {/* <div className="box-border relative flex items-center h-12 max-w-lg px-4 mx-auto bg-white border-b"> */}
      <div className="w-3/1">
        <span
          className="text-black cursor-pointer g-300"
          onClick={() => pushToRoute('/')}
        >
          {!_.isUndefined(props.title) && props.title}
        </span>
      </div>
      <div className="w-3/1">ssss</div>
    </div>
  );
};
