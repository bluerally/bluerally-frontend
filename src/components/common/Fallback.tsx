import React from 'react';

interface Props {
  error?: any;
}

export const Fallback = ({ error }: Props) => (
  <div>
    <span>에러가 발생했습니다.</span>
    {error?.message}
    <div>
      <a
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
      >
        뒤로가기
      </a>
      <a
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
      >
        새로고침
      </a>
    </div>
  </div>
);
