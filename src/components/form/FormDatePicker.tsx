import { DatePicker, DatePickerProps } from 'bluerally-design-system';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues, P extends boolean = false>
  extends DatePickerProps<P> {
  name: string;
  control: Control<T>;
}

export function FormDatePicker<
  T extends FieldValues,
  P extends boolean = false,
>({ name, control, onChange, ...datePickerProps }: Props<T, P>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { onChange: handleChange, name, value } }) => (
        <DatePicker
          name={name}
          value={value}
          {...datePickerProps}
          onChange={(e) => {
            handleChange(e);
            onChange?.(e);
          }}
        />
      )}
    />
  );
}
