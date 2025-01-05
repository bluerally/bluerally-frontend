import { SelectItem } from 'buooy-design-system';
import dayjs from 'dayjs';

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

  return `${dayjs(start).format('YY.MM.DD')}`;
};

export const generateTimeOptions = (selectedDate?: string) => {
  const date = selectedDate === '' ? dayjs() : dayjs(selectedDate);
  const options: SelectItem[] = [];
  const now = dayjs();
  const isToday = date ? date.isSame(now, 'day') : false;

  if (isToday) {
    const currentHour = now.hour();
    const currentMinute = now.minute();

    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;

        if (
          hour > currentHour ||
          (hour === currentHour && minute > currentMinute)
        ) {
          options.push({ title: time, value: time });
        }
      }
    }
  } else {
    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        options.push({ title: time, value: time });
      }
    }
  }

  return options;
};
