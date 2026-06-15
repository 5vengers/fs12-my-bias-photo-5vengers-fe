const GRADE_COLORS = {
  COMMON: '#555555',
  RARE: '#2A6AFF', // 예시 블루
  SUPER_RARE: '#8B2AFF', // 예시 퍼플
  LEGENDARY: '#FF2A6A', // 요청하신 Pink
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
