import React, { useState, useEffect, ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children?: ReactNode;
  visible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, visible }) => {
  const [showTooltip, setShowTooltip] = useState(visible);

  //   console.log('visible', visible);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      setShowTooltip(true);
      timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    } else {
      setShowTooltip(false);
    }

    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <>
      {showTooltip ? (
        <div className="tooltip-container">
          {children}
          {visible && <div className="tooltip-box">{content}</div>}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Tooltip;
