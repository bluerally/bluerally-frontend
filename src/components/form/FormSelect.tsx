import { Select, SelectProps, SelectItem } from 'bluerally-design-system';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues, P extends boolean = false>
  extends SelectProps<P> {
  name: string;
  control: Control<T>;
  onSelect?: (item?: SelectItem) => void;
}

export function FormSelect<T extends FieldValues, P extends boolean = false>({
  name,
  control,
  options,
  onSelect,
  ...selectProps
}: Props<T, P>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { value, onChange, ...rest } }) => {
        return (
          <Select<P>
            {...selectProps}
            {...rest}
            selected={value}
            options={options}
            onSelect={(item) => {
              onChange(item);
              onSelect?.(item);
            }}
          />
        );
      }}
    />
  );
}
