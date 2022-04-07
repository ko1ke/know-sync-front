import type { ProcedureFormProps } from '../types/Procedure';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const useProcedureNew = () => {
  const router = useRouter();
  const [initialProcedure, _setInitialProcedure] = useState<ProcedureFormProps>(
    {
      title: '',
      content: '',
      publish: false,
      steps: [],
    }
  );

  const createProcedure = useCallback((procedure: ProcedureFormProps) => {
    (async () => {
      const method = 'POST';
      const accessToken = localStorage.getItem('accessToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const body = JSON.stringify(procedure);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/procedures`,
        {
          method,
          headers,
          body,
        }
      );

      if (res.status === 201) {
        toast.success('作成しました');
        router.push('/my_procedures');
      }
    })();
  }, []);

  return {
    initialProcedure,
    createProcedure,
  };
};

export default useProcedureNew;
