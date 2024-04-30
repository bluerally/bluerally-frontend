import { TextInput, TextInputProps } from 'bluerally-design-system';
import { Ref, forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> extends TextInputProps {
  name: string;
  control: Control<T>;
}

export const FormNumberInput = forwardRef<HTMLInputElement, Props<any>>(
  function FormNumberInput<T extends FieldValues>(
    { name, control, onChange, ...textInputProps }: Props<T>,
    ref: Ref<HTMLInputElement>,
  ) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({
          field: { onChange: handleChange, name, value, onBlur },
        }) => (
          <TextInput
            {...textInputProps}
            name={name}
            value={value}
            onBlur={onBlur}
            type="number"
            onChange={(e) => {
              handleChange(Number(e.target.value));
              onChange?.(e);
            }}
          />
        )}
      />
    );
  },
);
