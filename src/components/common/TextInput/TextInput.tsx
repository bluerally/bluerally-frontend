import { Status } from '@/@types/common';
import { InputHTMLAttributes } from 'react';
import { disabledStyles, inputStyles } from './style';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  status?: Status;
  name?: string;
  label?: React.ReactNode | string;
  statusMessage?: string;
  description?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}

export const TextInput = ({
  value,
  name,
  inputRef,
  type = 'text',
  status = 'default',
  label,
  placeholder,
  description,
  disabled,
  onChange,
  ...rest
}: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className="w-full px-3 my-5">
      <label
        className={`block mb-1 text-sm font-bold tracking-wide ${inputStyles[status].color} uppercase`}
      >
        {label}
      </label>
      <input
        className={`block w-full px-4 py-2 mb-2 leading-tight border ${
          inputStyles[status].backgroundColor
        } ${inputStyles[status].borderColor} ${
          disabled && disabledStyles.color
        }${disabled && disabledStyles.backgroundColor} ${
          disabled && disabledStyles.borderColor
        }
        rounded appearance-none focus:outline-none focus:bg-white`}
        ref={inputRef}
        aria-label={name}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        type={type}
        value={value}
        {...rest}
      />
      <p className={`text-xs italic ${inputStyles[status].color}`}>
        {description}
      </p>
    </div>
  );
};
