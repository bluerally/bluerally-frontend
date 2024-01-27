import React, { useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as BaseDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (date: string) => void;
}

export const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
  const handleInputChange = (selectedDate: Date | null) => {
    if (!selectedDate) {
      return;
    }

    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    onChange?.(formattedDate);
  };

  return (
    <div className="relative inline-block">
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{ monthShort: `M` }}
      >
        <BaseDatePicker
          slotProps={{
            textField: { size: 'small' },
            inputAdornment: {
              position: 'start',
            },
          }}
          format="YYYY-MM-DD"
          showDaysOutsideCurrentMonth
          value={value ? dayjs(value).toDate() : undefined}
          label={label}
          onChange={handleInputChange}
        />
      </LocalizationProvider>
    </div>
  );
};
