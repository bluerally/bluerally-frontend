import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Select, SelectProps } from '@/components/common/Select/Select';

interface Props<T extends FieldValues> extends Omit<SelectProps, 'onSelect'> {
  name: Path<T>;
  control: Control<T>;
  onSelect?: (value: string) => void;
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  options,
  onSelect,
  ...selectProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...rest } }) => (
        <Select
          {...selectProps}
          {...rest}
          selected={value}
          options={options}
          onSelect={(value) => {
            onChange(value);
            onSelect?.(value);
          }}
        />
      )}
    />
  );
}
