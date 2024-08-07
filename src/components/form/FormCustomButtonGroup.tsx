import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import _ from 'lodash';

import CustomButton from '../common/CustomButton';

interface Props<T extends FieldValues> {
  name: string;
  control: Control<T>;
  options: any[];
  value?: any;
  setValue: (key: string, item: any) => void;
  isMultiple?: boolean;
}

export function FormCustomButtonGroup<T extends FieldValues>({
  name,
  control,
  options,
  setValue,
  value,
  isMultiple,
}: Props<T>) {
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);

  const handleButtonClick = (event: string | number) => {
    const selectedValue = event;
    setValue(name, event);

    const isSelected = selectedValues.includes(selectedValue);

    setSelectedValues(
      isMultiple
        ? isSelected
          ? selectedValues.filter((value) => value !== selectedValue)
          : [...selectedValues, selectedValue]
        : [selectedValue],
    );
  };

  useEffect(() => {
    !_.isUndefined(value) && setSelectedValues([value]);
    // value
  }, [value]);

  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field: { value, onChange: handleChange, ...rest } }) => {
        return (
          <div className="custom-button-container">
            {options.map(({ id, name }) => {
              const isSelected = selectedValues.includes(id);

              return (
                <CustomButton
                  key={id}
                  value={id}
                  isSelected={isSelected}
                  onClick={(value) => {
                    handleButtonClick(value);
                  }}
                  title={name}
                />
              );
            })}
          </div>
        );
      }}
    />
  );
}
