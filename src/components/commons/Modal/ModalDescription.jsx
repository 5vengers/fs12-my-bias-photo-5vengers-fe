const ModalDescription = ({ children, className = '' }) => {
  return (
    <div className={`text-gray-300 ${className}`}>
      <p>{children}</p>
    </div>
  );
};

export default ModalDescription;
