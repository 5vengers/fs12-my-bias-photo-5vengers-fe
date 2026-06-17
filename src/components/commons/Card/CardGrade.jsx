const CardGrade = ({ children }) => {
  const textColor = {
    COMMON: 'text-main',
    RARE: 'text-blue',
    SUPER_RARE: 'text-purple',
    LEGENDARY: 'text-pink',
  };

  return (
    <span className={`${textColor[children]}`}>
      {children === 'SUPER_RARE' ? 'SUPER RARE' : children}
    </span>
  );
};

export default CardGrade;
