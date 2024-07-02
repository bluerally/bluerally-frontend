import React from 'react';
import ReactDOM from 'react-dom';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onSumit: () => void;
  title: string;
  content: string;
}

const CustomDialog = ({
  open,
  onClose,
  onSumit,
  title,
  content,
}: DialogProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      {/* <div style={modalStyles.overlay}> */}
      <div>
        {/* <div style={modalStyles.content}> */}
        <div className="mb-5">
          <div style={modalStyles.title}>{title}</div>
          <div className="dialog-content">{content}</div>
        </div>
        <div className="dialog-button-container">
          <div
            className="custom-button full"
            onClick={() => {
              onClose();
            }}
          >
            취소
          </div>
          <div
            className="custom-button full fail"
            onClick={() => {
              onSumit();
            }}
          >
            삭제
          </div>
        </div>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  title: {
    fontWeight: 600,
    fontSize: '18px',
  },

  content: {
    paddingTop: '24px',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    position: 'relative',
    minWidth: '300px',
    maxWidth: '375px',
    // height: '100%',
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

export default CustomDialog;
