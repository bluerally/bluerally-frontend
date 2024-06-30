import React from 'react';
import _ from 'lodash';

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const Header = (props: Props) => {
  return (
    <div
      className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-5 mx-auto font-semibold bg-white border-b w-96 h-14 border-g-100 font-18 "
      // className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-5 mx-auto font-semibold bg-white border-b w-96 h-14 border-g-100 font-18 "
      // style={{ backgroundColor: 'ivory' }}
    >
      <div className="w-3/1 cursor-pointer">{props.left}</div>
      {/* <div className="box-border relative flex items-center h-12 max-w-lg px-4 mx-auto bg-white border-b"> */}
      <div className="w-3/1">
        <span
          className="text-black cursor-pointer"
          // onClick={() => pushToRoute('/')}
        >
          {props.center}
          {/* {!_.isUndefined(props.title) && props.title} */}
        </span>
      </div>
      <div className="w-3/1 cursor-pointer">
        {props.right}
        {/* {!_.isEmpty(props.right) ? props.right : <div></div>} */}
      </div>
    </div>
  );
};
