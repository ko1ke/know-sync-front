import { Field, ErrorMessage } from 'formik';
import React from 'react';

const FormikTextInput = ({
  labelText,
  name,
  type,
  placeholder,
  rows,
  as,
}: {
  labelText?: string;
  name: string;
  type: 'text' | 'number' | 'password';
  placeholder?: string;
  rows?: number;
  as?: string;
}) => {
  return (
    <div className="my-4">
      {labelText && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {labelText}
        </label>
      )}
      <Field
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        rows={rows}
        as={as}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div className="text-red-800 mt-2 text-sm">{msg}</div>}
      />
    </div>
  );
};

export default FormikTextInput;
