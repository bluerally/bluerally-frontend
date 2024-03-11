import React from 'react';
import type { Option } from '@/@types/common';

export interface SelectProps {
  options: Option[];
  onSelect: (value: string) => void;
  selected?: string;
}

export const Select = ({ options, onSelect, selected }: SelectProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onSelect && onSelect(value);
  };

  return (
    <select
      className="px-4 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
      value={selected}
      onChange={handleSelectChange}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
