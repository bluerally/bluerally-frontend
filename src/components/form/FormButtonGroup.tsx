import styled from '@emotion/styled';
import { ButtonGroup, ButtonGroupProps } from 'bluerally-design-system';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> extends ButtonGroupProps {
  name: string;
  control: Control<T>;
}

export function FormButtonGroup<T extends FieldValues>({
  name,
  control,
  onClick,
  ...ButtonGroupProps
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { value, onChange: handleChange, ...rest } }) => {
        console.log({ value });
        return (
          <ButtonGroupContainer>
            <ButtonGroup
              value={Number(value)}
              {...rest}
              {...ButtonGroupProps}
              onClick={(e) => {
                handleChange(e);
              }}
            />
          </ButtonGroupContainer>
        );
      }}
    />
  );
}

const ButtonGroupContainer = styled('div')`
  display: flex;
`;
