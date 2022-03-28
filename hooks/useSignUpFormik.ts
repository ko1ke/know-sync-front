import { useFormik } from 'formik';
import type { SignUpItem } from '../types/Auth';
import { signUp } from '../slices/auth';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

const useSignUp = () => {
  const dispatch = useDispatch();
  const signupFormik = useFormik<SignUpItem>({
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    validationSchema: Yup.object({
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
    }),
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(signUp(values));
    },
  });

  return { signupFormik };
};

export default useSignUp;
