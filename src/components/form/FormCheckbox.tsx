import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Checkbox, CheckboxProps } from '@/components/common';

interface Props<T extends FieldValues> extends CheckboxProps {
  name: string;
  control: Control<T>;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  onChange,
  ...checkboxProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { value, onChange: handleChange, ...rest } }) => {
        return (
          <Checkbox
            value={value}
            onChange={(e) => {
              handleChange(e);
              onChange?.(e);
            }}
            checked={value}
            {...rest}
            {...checkboxProps}
          />
        );
      }}
    />
  );
}
