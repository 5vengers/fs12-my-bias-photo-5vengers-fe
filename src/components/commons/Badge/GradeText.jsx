const GRADE_COLORS = {
  COMMON: 'text-main',
  RARE: 'text-blue',
  SUPER_RARE: 'text-purple',
  LAGENDARY: 'text-pink',
};

const GradeText = ({ grade }) => {
  const color = GRADE_COLORS[grade] || 'text-gray-500';

  return (
    <span className={`font-noto-sans-kr text-2xl font-bold ${color}`}>
      {grade}
    </span>
  );
};

export default GradeText;
