import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { TextInput, TextInputProps } from '@/components/common/TextInput';

interface Props<T extends FieldValues> extends TextInputProps {
  name: string;
  control: Control<T>;
}

export function FormTextInput<T extends FieldValues>({
  name,
  control,
  onChange,
  ...textInputProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { onChange: handleChange, ...rest } }) => (
        <TextInput
          {...textInputProps}
          {...rest}
          onChange={(e) => {
            handleChange(e);
            onChange?.(e);
          }}
        />
      )}
    />
  );
}
