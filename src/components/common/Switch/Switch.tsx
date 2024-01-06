import React from 'react';

export interface SwitchProps {
  label?: string;
  checked: boolean;
  checkedLabel?: string;
  unCheckedLabel?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  checked = false,
  checkedLabel,
  unCheckedLabel = '마감',
  onChange,
  disabled,
  label,
  ...rest
}: SwitchProps) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        aria-checked={checked}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <div
        className={`w-20 h-9 ${
          disabled ? 'bg-gray-400' : 'bg-gray-200'
        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[5px] after:start-[17px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
      >
        {!checked && (
          <span className="flex items-center justify-end h-full mr-3 text-sm text-white">
            {unCheckedLabel}
          </span>
        )}
      </div>
      <span
        className={`font-medium text-gray-900 text-md ms-2 dark:text-gray-700 ${
          disabled ? 'pointer-events-none' : ''
        }`}
      >
        {label}
      </span>
    </label>
  );
};
