'use client';

import { useEffect, useState } from 'react';

const DropDown = ({ isOpen, handleOpen, index, start, end, onChange }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(getPages());
  }, []);

  const getPages = () => {
    const pages = [];

    for (let i = start + 1; i < end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        className="h-full w-full"
        onClick={() => handleOpen(isOpen ? null : index)}
      >
        ...
      </button>
      {isOpen && (
        <ul className="custom-scrollbar absolute top-[0] flex max-h-[180px] w-full flex-col items-center overflow-y-scroll border border-gray-100 bg-black">
          {pages.map((p, i) => (
            <li
              key={`drop-page-${i}`}
              className="w-full py-[8px] text-center hover:bg-gray-500"
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
