import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export function FormDatePicker<T extends FieldValues>({
  name,
  control,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...rest } }) => (
        <Datepicker
          {...rest}
          value={value}
          onChange={(newValue) => {
            onChange(newValue);
          }}
        />
      )}
    />
  );
}
