import React from 'react';
import { useMemo } from 'react';

type Props = {
  text: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const Button: React.FC<Props> = ({ text, ...rest }) => {
  return (
    <h3 className="text-2xl text-gray-700 font-bold my-2" {...rest}>
      {text}
    </h3>
  );
};

export default Button;
