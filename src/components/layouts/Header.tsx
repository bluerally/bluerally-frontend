import React from 'react';
import _ from 'lodash';

interface Props {
  left?: any;
  center?: any;
  right?: any;
}

export const Header = (props: Props) => {
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

        {/* {!_.isEmpty(props.right) ? props.right : <div></div>} */}
      </div>
    </div>
  );
};
