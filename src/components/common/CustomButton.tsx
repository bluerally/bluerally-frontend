interface Props {
  //   key: number;
  value: string | number;
  title: string | number;
  onClick: (value: string | number) => any;
  isSelected: boolean;
}

const CustomButton = (props: Props) => {
  return (
    <div
      className={`custom-button ${props.isSelected ? 'selected' : ''}`}
      onClick={() => {
        props.onClick(props.value);
      }}
    >
      {props.title}
    </div>
  );
};

export default CustomButton;
