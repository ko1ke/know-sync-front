import React from 'react';
import { useMemo } from 'react';

type Props = {
  text: string;
  color?: 'pink' | 'blue' | 'green' | 'gray';
  fullWidth?: boolean;
  disabled?: boolean;
  Icon?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const OutlineButton: React.FC<Props> = ({
  color,
  text,
  fullWidth = false,
  disabled = false,
  Icon,
  ...rest
}) => {
  const buttonColorNames = useMemo(() => {
    switch (color) {
      case 'green':
        return 'border-green-500 text-green-700 hover:border-green-700 ';
      case 'pink':
        return 'border-pink-500 text-pink-700 hover:border-pink-700';
      case 'gray':
        return 'border-gray-500 text-gray-700 hover:border-gray-700';
      default:
        return 'border-blue-500 text-blue-700 hover:border-blue-700';
    }
  }, [color]);

  return (
    <div className="my-4">
      <button
        type="button"
        className={`${fullWidth ? 'w-full max-w-5xl' : ''} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${buttonColorNames} font-normal py-2 px-4 rounded inline-flex items-center justify-center bg-transparent border-2`}
        disabled={disabled}
        {...rest}
      >
        {Icon}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default OutlineButton;
