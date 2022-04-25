import { useSelector } from '../store';
import pathMapping from '../lib/pathMapping';
import { idSelector } from '../selectors/auth';

const useNavigation = () => {
  const userId = useSelector(idSelector);
  const initialNavigation = pathMapping.filter((m) => m.useOnNav);
  const navigation = userId
    ? initialNavigation.filter((n) => n.hideFromNavIfAuth !== true)
    : initialNavigation.filter((n) => n.authRequired !== true);

  return { navigation };
};

export default useNavigation;
