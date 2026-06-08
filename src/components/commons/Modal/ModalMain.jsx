const ModalMain = ({ children }) => {
  return (
    <div className="fixed z-110 flex h-[100%] w-[100%] items-center justify-center bg-black/50">
      <div className="relative flex flex-col items-center gap-[40px] rounded-xs bg-gray-500 p-[80px]">
        {children}
      </div>
    </div>
  );
};

export default ModalMain;
