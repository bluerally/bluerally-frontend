import { Ref, forwardRef } from 'react';

interface Props {
  name: string;
  placeholder: string;
  setValue: (key: string, inputValue: string) => void;
  className: string;
}

export const FormCustomTextArea = (props: Props) => {
  const handleChangeInput = (inputValue: string) => {
    props.setValue(props.name, inputValue);
  };

  return (
    <textarea
      style={{ resize: 'none' }}
      className={`${props.className}`}
      placeholder={props.placeholder}
      onChange={(e) => {
        handleChangeInput(e.target.value);
      }}
    />
  );
};
