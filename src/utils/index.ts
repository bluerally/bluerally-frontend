import { SelectItem, formatter } from 'bluerally-design-system';
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
