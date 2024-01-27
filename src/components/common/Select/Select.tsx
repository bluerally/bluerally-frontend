import React from 'react';
import type { Option } from '@/@types/common';
import MenuItem from '@mui/material/MenuItem';
import BaseSelect, { SelectChangeEvent } from '@mui/material/Select';

export interface SelectProps {
  label?: string;
  options: Option[];
  onSelect: (value: string) => void;
  selected?: string;
}

export const Select = ({ options, label, onSelect, selected }: SelectProps) => {
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    onSelect && onSelect(value);
  };

  return (
    <BaseSelect
      label={label}
      value={selected}
      onChange={handleSelectChange}
      size="small"
      sx={{ width: 130 }}
    >
      {options.map(({ id, name }) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ))}
    </BaseSelect>
  );
};
