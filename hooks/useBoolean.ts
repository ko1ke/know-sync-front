import { useState, useCallback } from 'react';

const useBoolean = (initialBool = false) => {
  const [bool, setBool] = useState(initialBool);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggleBool = useCallback(() => {
    setBool(!bool);
  }, [bool]);

  return { bool, setTrue, setFalse, toggleBool };
};

export default useBoolean;
