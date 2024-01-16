import React, { useRef } from 'react';

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (inputRef.current && onChange) {
      onChange(inputRef.current.value);
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type="date"
        ref={inputRef}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};
