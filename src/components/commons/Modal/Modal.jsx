const Modal = ({ children }) => {
  return (
    <>
      <div className="fixed z-110 flex h-[100%] w-[100%] items-center justify-center bg-black/50">
        <div className="flex flex-col rounded-xs bg-gray-500 p-[30px]">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
