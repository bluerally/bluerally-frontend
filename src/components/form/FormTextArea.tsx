import { TextArea, TextAreaProps } from 'bluerally-design-system';
import { Ref, forwardRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> extends TextAreaProps {
  name: string;
  control: Control<T>;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, Props<any>>(
  function FormTextArea<T extends FieldValues>(
    { name, control, onChange, ...textAreaProps }: Props<T>,
    ref: Ref<HTMLTextAreaElement>,
  ) {
    return (
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field: { onChange: handleChange, name, value } }) => (
          <TextArea
            {...textAreaProps}
            name={name}
            value={value}
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
