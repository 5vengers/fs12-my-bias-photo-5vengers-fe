const ModalMain = ({ children, className = '', overlayClassName = '' }) => {
  return (
    <div
      className={`fixed z-[9999] flex h-full w-full items-center justify-center bg-black/50 ${overlayClassName}`}
    >
      <div
        className={`relative flex flex-col items-center gap-10 rounded-xs bg-gray-500 p-20 ${className || ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalMain;
