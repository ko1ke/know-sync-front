import React from 'react';
import { useMemo } from 'react';

type Props = {
  text: string;
  color?: 'pink' | 'blue' | 'green' | 'gray';
  fullWidth?: boolean;
  Icon?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({
  color,
  text,
  fullWidth = false,
  Icon,
  ...rest
}) => {
  const buttonColorNames = useMemo(() => {
    switch (color) {
      case 'green':
        return 'bg-green-500 hover:bg-green-700';
      case 'pink':
        return 'bg-pink-500 hover:bg-pink-700';
      case 'gray':
        return 'bg-gray-500 hover:bg-gray-700';
      default:
        return 'bg-blue-500 hover:bg-blue-700';
    }
  }, [color]);

  return (
    <div className="my-4">
      <button
        type="button"
        className={`${
          fullWidth ? 'w-full max-w-5xl' : ''
        } ${buttonColorNames} text-white font-medium py-2 px-4 rounded inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
        {...rest}
      >
        {Icon}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default Button;
