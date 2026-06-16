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
        aria-label="ellipsis-page"
      >
        ...
      </button>
      {isOpen && (
        <ul className="custom-scrollbar absolute top-[0] flex max-h-[180px] w-full flex-col items-center overflow-y-scroll border border-gray-100 bg-black">
          {getPages().map((p, i, pages) => (
            <li
              key={`drop-page-${i}`}
              className={`w-full text-center hover:bg-gray-500 ${pages.length === 1 ? 'p-[13px]' : 'p-[8px]'}`}
              onClick={() => {
                onChange(p);
                handleOpen(null);
              }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
