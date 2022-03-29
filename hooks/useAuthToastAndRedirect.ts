import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from '../store';
import { idSelector, userNameSelector, errorSelector } from '../selectors/auth';
import toast from 'react-hot-toast';

const useAuthToastAndRedirect = () => {
  const router = useRouter();
  const mountRef = useRef(false);
  const id = useSelector(idSelector);
  const username = useSelector(userNameSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    if (mountRef.current === true && error !== undefined) {
      toast.error(error.message || '予期しないエラーです');
      return;
    }
    if (mountRef.current === true && id && username) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        toast.success('ログインしました');
        router.push('/');
      } else {
        toast.success('登録が完了しました。ログインしてください');
        router.push('/sign_in');
      }
    }
    mountRef.current = true;
  }, [id, username, error, mountRef]);
};

export default useAuthToastAndRedirect;
