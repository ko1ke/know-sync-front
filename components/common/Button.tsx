import React from 'react';
import { useMemo } from 'react';

type Props = {
  color: 'pink' | 'blue' | 'green';
  text: string;
  fullWidth?: boolean;
  disabled?: boolean;
  Icon?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({
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
        return 'bg-green-500 hover:bg-green-700';
      case 'pink':
        return 'bg-pink-500 hover:bg-pink-700';
      default:
        return 'bg-blue-500 hover:bg-blue-700';
    }
  }, [color]);

  return (
    <div className="my-4">
      <button
        type="button"
        className={`${fullWidth ? 'w-full max-w-5xl' : ''} ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${buttonColorNames} text-white font-medium py-2 px-4 rounded inline-flex items-center justify-center `}
        {...rest}
      >
        {Icon}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default Button;
