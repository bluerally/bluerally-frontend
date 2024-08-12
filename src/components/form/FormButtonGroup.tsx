import { ButtonGroup, ButtonGroupProps } from 'bluerally-design-system';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> extends ButtonGroupProps {
  name: string;
  control: Control<T>;
}

export function FormButtonGroup<T extends FieldValues>({
  name,
  control,
  options,
  onChange,
  ...ButtonProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { onChange: handleChange, value, ...rest } }) => {
        return (
          <ButtonGroup
            {...rest}
            {...ButtonProps}
            options={options}
            values={value}
            onChange={(values) => {
              handleChange(values);
            }}
          />
        );
      }}
    />
  );
}
