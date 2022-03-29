import type { NextPage } from 'next';
import type { SignUpItem } from '../types/Auth';
import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Button from '../components/common/Button';
import FormikTextInput from '../components/common/FormikTextInput';
import { useDispatch } from 'react-redux';
import { signUp } from '../slices/auth';
import useAuthToast from '../hooks/useAuthToast';

const SignUp: NextPage = () => {
  useAuthToast();
  const initialValues: SignUpItem = {
    email: '',
    username: '',
    password: '',
  };
  const dispatch = useDispatch();

  return (
    <div className="max-w-3xl w-full mx-auto z-10">
      <div className="text-center">
        <h3 className="text-xl text-gray-700 font-bold mb-2">登録</h3>
      </div>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('入力必須です')
            .email('Eメールの形式で入力してください'),
          username: Yup.string()
            .required('入力必須です')
            .max(1000, '最大100文字までで入力してください'),
          password: Yup.string()
            .required('入力必須です')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              '8文字以上で、大文字、小文字、数字、「@$!%*#?&」の特殊文字がそれぞれ１文字以上含まれるよう入力してください'
            ),
        })}
        onSubmit={(values) => {
          dispatch(signUp(values));
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="py-1">
              <FormikTextInput labelText="Eメール" type="text" name="email" />
              <FormikTextInput
                labelText="ユーザー名"
                type="text"
                name="username"
              />
              <FormikTextInput
                labelText="パスワード"
                type="password"
                name="password"
              />
            </div>

            <Button
              fullWidth
              text="登録"
              color="blue"
              type="submit"
              disabled={!isValid || !dirty}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
