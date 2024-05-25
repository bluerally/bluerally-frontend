import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Header } from '@/components/layouts/Header';
import { CircleDollarSign, Plus, X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div style={modalStyles.overlay}>
      <Header
        right={
          <X
            onClick={() => {
              onClose();
            }}
          />
        }
      />

      <div style={modalStyles.content}>
        {/* <button onClick={onClose} style={modalStyles.closeButton}>

        </button> */}
        {children}
      </div>
    </div>,
    document.getElementById('global-modal') as HTMLElement,
  );
};
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경 투명도
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    paddingTop: '24px',
    backgroundColor: 'white',
    // padding: '20px',
    // borderRadius: '8px',
    position: 'relative',
    maxWidth: '500px',
    width: '100%',
    height: '100%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Modal;
