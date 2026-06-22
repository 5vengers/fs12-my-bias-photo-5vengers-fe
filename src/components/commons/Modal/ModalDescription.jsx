const ModalDescription = ({ children, className = '' }) => {
  return (
    <div className="">
      <p className={`text-gray-300 ${className}`}>{children}</p>
    </div>
  );
};

export default ModalDescription;
