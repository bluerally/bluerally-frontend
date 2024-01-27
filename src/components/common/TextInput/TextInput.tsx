import { Status } from '@/@types/common';
import { InputHTMLAttributes } from 'react';
import { TextField } from '@mui/material';
import { inputStyles } from './style';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  status?: Status;
  name?: string;
  label?: React.ReactNode | string;
  statusmessage?: string;
  description?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StatusMessage = ({
  children,
  status,
}: {
  children: React.ReactNode;
  status: Status;
}) => {
  return <p className={`text-sm ${inputStyles[status].color}`}>{children}</p>;
};
export const TextInput = ({
  value,
  name,
  type = 'text',
  status = 'primary',
  label,
  placeholder,
  description,
  disabled,
  onChange,
  required,
  statusmessage,
}: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className="w-full px-3 my-5">
      <TextField
        size="small"
        aria-label={name}
        name={name}
        variant="outlined"
        color={status}
        label={label}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        helperText={description}
        required={required}
      />
      <StatusMessage status={status}>{statusmessage}</StatusMessage>
    </div>
  );
};
