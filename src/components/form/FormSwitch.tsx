import { Switch, SwitchProps } from 'bluerally-design-system';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> extends Omit<SwitchProps, 'checked'> {
  name: string;
  control: Control<T>;
}

export function FormSwitch<T extends FieldValues>({
  name,
  control,
  onChange,
  ...switchProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { value, onChange: handleChange, ...rest } }) => {
        return (
          <Switch
            {...rest}
            {...switchProps}
            checked={value}
            onChange={(e) => {
              handleChange(e.target.checked);
              onChange?.(e);
            }}
          />
        );
      }}
    />
  );
}
