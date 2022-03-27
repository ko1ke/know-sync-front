import React from 'react';

type Props = {
  color: 'pink' | 'blue' | 'green';
  text: string;
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
  return (
    <div className="my-4">
      <button
        type="button"
        className={`${
          fullWidth ? 'w-full max-w-5xl' : ''
        } bg-${color}-500 hover:bg-${color}-700 text-white font-medium py-2 px-4 rounded inline-flex items-center justify-center`}
        {...rest}
      >
        {Icon}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default Button;
