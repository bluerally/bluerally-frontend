import { Ref, forwardRef } from 'react';

interface Props {
  name: string;
  placeholder: string;
  setValue: (key: string, inputValue: string) => void;
  className: string;
}

export const FormCustomTextInput = (props: Props) => {
  const handleChangeInput = (inputValue: string) => {
    props.setValue(props.name, inputValue);
  };

  return (
    <input
      className={`${props.className}`}
      placeholder={props.placeholder}
      onChange={(e) => {
        handleChangeInput(e.target.value);
      }}
    />
  );
};
