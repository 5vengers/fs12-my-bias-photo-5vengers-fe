const ModalMain = ({ children }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="relative flex h-[375px] w-[560px] flex-col items-center gap-[40px] rounded-xs bg-gray-500 p-[80px]">
        {children}
      </div>
    </div>
  );
};

export default ModalMain;
