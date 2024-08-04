import React from 'react';

interface Props {
  description?: React.ReactNode;
}

export const Loading = ({ description }: Props) => (
  <div>
    <br />
    <br />
    {description ?? <p>로딩중입니다... 잠시만 기다려주세요.</p>}
  </div>
);
