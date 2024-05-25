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
        return (
          <ButtonGroupContainer className="snap-y">
            <ButtonGroup
              value={Number(value)}
              {...rest}
              {...ButtonGroupProps}
              onClick={(e) => {
                e.preventDefault();
                handleChange(e);
              }}
              // width="40px"
            />
          </ButtonGroupContainer>
        );
      }}
    />
  );
}

const ButtonGroupContainer = styled('div')`
  display: flex;
  -ms-overflow-style: none;
  overflow-x: auto;
`;

// const ButtonGroup = styled('div')`
//   width: 43px;
// `;
