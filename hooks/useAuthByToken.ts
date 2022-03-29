import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser, refresh } from '../slices/auth';
import { useSelector } from './../store';
import { hasTokenErrorSelector } from '../selectors/auth';

const useAuthByToken = () => {
  const dispatch = useDispatch();
  const hasTokenError = useSelector(hasTokenErrorSelector);
  dispatch(authUser());

  useEffect(() => {
    if (hasTokenError === true) {
      dispatch(refresh());
    }
  }, [dispatch, hasTokenError]);
};

export default useAuthByToken;
