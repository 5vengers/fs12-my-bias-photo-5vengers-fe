const GRADE_COLORS = {
  COMMON: 'text-main',
  RARE: 'text-blue',
  SUPER_RARE: 'text-purple',
  LAGENDARY: 'text-pink',
};

const GradeText = ({ grade }) => {
  const color = GRADE_COLORS[grade] || '#555555';

  return (
    <span
      style={{
        color: color,
        fontFamily: '"Noto Sans KR", sans-serif',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 'normal',
      }}
    >
      {grade}
    </span>
  );
};

export default GradeText;
