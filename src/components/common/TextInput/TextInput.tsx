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
}

export const TextInput = ({
  value,
  type = 'text',
  status = 'default',
  label,
  placeholder,
  description,
  disabled,
}: TextInputProps) => {
  return (
    <div className="w-full px-3 my-5">
      <label
        className={`block mb-1 text-sm font-bold tracking-wide ${inputStyles[status].color} uppercase`}
      >
        {label}
      </label>
      <input
        value={value}
        className={`block w-full px-2 py-2 mb-2 leading-tight border ${
          inputStyles[status].backgroundColor
        } ${inputStyles[status].borderColor} ${
          disabled && disabledStyles.color
        }${disabled && disabledStyles.backgroundColor} ${
          disabled && disabledStyles.borderColor
        }
        rounded appearance-none focus:outline-none focus:bg-white`}
        type={type}
        placeholder={placeholder}
      />
      <p className={`text-xs italic ${inputStyles[status].color}`}>
        {description}
      </p>
    </div>
  );
};
