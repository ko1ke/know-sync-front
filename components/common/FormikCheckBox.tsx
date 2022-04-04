import { Field } from 'formik';
import React from 'react';

const FormikCheckBox = ({
  labelText = '',
  name,
}: {
  labelText?: string;
  name: string;
}) => {
  return (
    <div className="my-4">
      <label className="inline-flex items-center">
        <Field type="checkbox" className="form-checkbox h-5 w-5" name={name} />
        <span className="ml-3 text-md">{labelText}</span>
      </label>
    </div>
  );
};

export default FormikCheckBox;
