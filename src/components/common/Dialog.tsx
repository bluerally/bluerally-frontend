import { Modal } from 'buooy-design-system';

type Props = {
  open: boolean;
  header?: React.ReactNode;
  children: React.ReactNode;
};

export const Dialog = ({ open, header, children }: Props) => {
  return (
    <Modal open={open} side="center" align="center" dimmed>
      {header}
      <hr />
      <div className="p-5">{children}</div>
    </Modal>
  );
};
