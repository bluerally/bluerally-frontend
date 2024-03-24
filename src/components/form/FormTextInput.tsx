import { TextInput, TextInputProps } from 'bluerally-design-system';
import { Ref, forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> extends TextInputProps {
  name: string;
  control: Control<T>;
}

export const FormTextInput = forwardRef<HTMLInputElement, Props<any>>(
  function FormTextInput<T extends FieldValues>(
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
            onChange={(e) => {
              handleChange(e);
              onChange?.(e);
            }}
          />
        )}
      />
    );
  },
);
