import React from 'react';
import BaseCheckbox from '@mui/material/Checkbox';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  label?: string | React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  value,
  label,
  disabled = false,
  checked = false,
  onChange,
  readOnly = false,
  ...rest
}: CheckboxProps) => {
  return (
    <>
      <BaseCheckbox
        checked={checked}
        onChange={(e) => {
          if (readOnly) {
            return;
          }
          onChange?.(e);
        }}
        readOnly={readOnly}
        value={value}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </>
  );
};
