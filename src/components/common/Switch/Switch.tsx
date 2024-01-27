import React from 'react';
import BaseSwitch from '@mui/material/Switch';

export interface SwitchProps {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  checked = false,
  onChange,
  disabled,
  label,
  ...rest
}: SwitchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <div className="flex items-center justify-center">
      <BaseSwitch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        {...rest}
      />
      {label && <span className="text-sm text-gray-900">{label}</span>}
    </div>
  );
};
