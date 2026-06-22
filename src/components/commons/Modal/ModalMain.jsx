const ModalMain = ({ children }, className = '') => {
  return (
    <div className="fixed z-[9999] flex h-full w-full items-center justify-center bg-black/50">
      <div
        className={`relative flex flex-col items-center gap-[40px] rounded-xs bg-gray-500 p-[80px] ${className || ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalMain;
