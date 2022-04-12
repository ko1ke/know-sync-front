import React, { useRef, useCallback } from 'react';

type Props = {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const SearchInput: React.FC<Props> = ({ setKeyword, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickSearchButton = useCallback(() => {
    setKeyword(inputRef.current?.value || '');
  }, [inputRef, setKeyword]);

  return (
    <div className="my-4 flex items-center justify-center">
      <div className="flex w-2/3">
        <input
          ref={inputRef}
          type="search"
          className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...rest}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              e.preventDefault();
              onClickSearchButton();
            }
          }}
        />
        <button
          type="button"
          onClick={onClickSearchButton}
          className="shadow px-5 text-white bg-blue-500 hover:bg-blue-700 rounded-r active:shadow-lg focus:outline-none focus:ring-0"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            className="w-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
