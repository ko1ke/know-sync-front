import { useRef, useEffect } from 'react';
import { useSelector } from './../store';
import { idSelector, userNameSelector, errorSelector } from '../selectors/auth';
import toast from 'react-hot-toast';

const useAuthToast = () => {
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
      } else {
        toast.success('登録が完了しました。ログインしてください');
      }
    }
    mountRef.current = true;
  }, [id, username, error, mountRef]);
};

export default useAuthToast;
