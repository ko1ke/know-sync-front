import React, { useMemo } from 'react';

type Props = {
  text?: string;
  color?: 'pink' | 'blue' | 'green' | 'gray';
  disabled?: boolean;
  Icon: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const FloatingButton: React.FC<Props> = ({
  color,
  text,
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
      case 'gray':
        return 'bg-gray-500 hover:bg-gray-700';
      default:
        return 'bg-blue-500 hover:bg-blue-700';
    }
  }, [color]);

  return (
    <button
      className={`${buttonColorNames} p-0 w-16 h-16 rounded-full`}
      {...rest}
    >
      {Icon}
    </button>
  );
};

export default FloatingButton;
