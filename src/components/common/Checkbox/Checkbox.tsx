import React from 'react';

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
    <label
      className={`inline-flex items-center cursor-${
        disabled ? 'not-allowed' : 'pointer'
      }`}
    >
      <span
        className={`
          inline-flex justify-center items-center rounded w-4 h-4
          ${
            disabled && checked
              ? 'bg-gray-300 border border-gray-200'
              : checked
              ? 'bg-blue-500 border border-blue-500'
              : disabled && 'bg-gray-300 border border-gray-200'
          }
        `}
      >
        <input
          type="checkbox"
          aria-hidden="true"
          readOnly={readOnly}
          onChange={(e) => {
            if (readOnly) {
              return;
            }
            onChange?.(e);
          }}
          checked={checked}
          value={value}
          className="hidden"
          {...rest}
        />
        {checked && <span className="text-white">X</span>}
      </span>
      {label && <span className="pl-2 text-gray-700">{label}</span>}
    </label>
  );
};
