import React from 'react';
import { useRouter } from 'next/router';
import { useNavigate } from '@/hooks/useNavigate';
import { ChevronLeft, Share, GripVerticalIcon, X } from 'lucide-react';
import _ from 'lodash';

interface Props {
  // title?: string;
  // leftType?: 'close' | 'back' | 'none';
  // rightType?: 'my' | 'share' | 'custom' | 'none';
  // customButton?: ((item?: any) => any) | undefined;
  left?: any;
  right?: any;
  center?: any;
}

export const Header = (props: Props) => {
  const { pushToRoute } = useNavigate();
  const router = useRouter();
  return (
    <div
      className="sticky mx-auto w-96 top-0 left-0 right-0 z-50 h-14 flex justify-between border-g-100 border-b bg-white font-semibold font-18 items-center p-5 w-full "
      // className="absolute mx-auto w-96 top-0 left-0 right-0 z-50 h-14 flex justify-between border-g-100 border-b bg-white font-semibold font-18 items-center p-5 w-full "
      // style={{ backgroundColor: 'ivory' }}
    >
      <div className="w-3/1">{props.left}</div>
      {/* <div className="box-border relative flex items-center h-12 max-w-lg px-4 mx-auto bg-white border-b"> */}
      <div className="w-3/1">
        <span
          className="text-black cursor-pointer "
          // onClick={() => pushToRoute('/')}
        >
          {props.center}
          {/* {!_.isUndefined(props.title) && props.title} */}
        </span>
      </div>
      <div className="w-3/1">
        {props.right}

        {/* {!_.isEmpty(props) && */}
      </div>
    </div>
  );
};
