const DropDown = ({ isOpen, handleOpen, index, start, end, onChange }) => {
  const getPages = () => {
    const pages = [];

    for (let i = start + 1; i < end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="relative z-[10] size-full">
      <button
        type="button"
        className="size-full"
        onClick={() => handleOpen(isOpen ? null : index)}
        aria-label="줄임표 페이지"
      >
        ...
      </button>
      {isOpen && (
        <ul className="custom-scrollbar absolute top-[0] flex max-h-[180px] w-full flex-col items-center overflow-y-scroll border border-gray-100 bg-black">
          {getPages().map((p, i, pages) => (
            <li key={`drop-page-${i}`}>
              <button
                className={`w-full text-center hover:bg-gray-500 ${pages.length === 1 ? 'p-[13px]' : 'p-[8px]'}`}
                type="button"
                onClick={() => {
                  onChange(p);
                  handleOpen(null);
                }}
                aria-label={`${p} 페이지`}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
