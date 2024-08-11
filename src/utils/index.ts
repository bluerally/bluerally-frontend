import { IMAGE_URL } from '@/constants/common';
import { SelectItem, formatter } from 'bluerally-design-system';
import { AnyRecord } from 'dns';
import { omitBy } from 'lodash';

export const filterEmptyValues = (obj: Record<string, any>) => {
  return omitBy(
    obj,
    (value) => value === undefined || value === null || value === '',
  );
};

export const elapsedTime = (date: number): string => {
  const start = new Date(date);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) {
    return '방금 전';
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}분 전`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}시간 전`;
  }

  const days = hours / 24;
  if (days < 7) {
    return `${Math.floor(days)}일 전`;
  }

  return `${formatter.date(start)}`;
};

export const generateTimeOptions = () => {
  const options: SelectItem[] = [];

  for (let hour = 0; hour <= 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 24 && minute === 30) {
        return options;
      }

      const time = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;

      options.push({ title: time, value: time });
    }
  }

  return options;
};

export const generateTimeStamp = () => {
  const options: SelectItem[] = [];

  for (let hour = 0; hour <= 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 24 && minute === 30) {
        return options;
      }

      const time = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;

      options.push({ title: time, value: time });
    }
  }

  console.log('options', options);

  return options;
};

/**
 * @description new Date() 객체를 ISO 8601 형식으로 변환
 * @param date
 * @returns
 */
export const generateISO = (date: any) => {
  // 현재 날짜 및 시간을 생성
  // let date = new Date();

  // ISO 8601 형식으로 변환 (UTC 기준)
  let isoString = date.toISOString();

  // ISO 문자열을 현지 시간대로 조정하기
  let localISOString = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();

  // 문자열 자르기로 초단위까지 보여주고, 시간대 정보 추가
  let formattedString = localISOString.substring(0, 19) + '+09:00';

  return formattedString;
};

export const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width?: number | string;
  quality?: number | string;
}) => {
  return `${IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
};
