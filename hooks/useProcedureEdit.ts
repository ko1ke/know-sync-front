import type { ProcedureFormProps } from '../types/Procedure';
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const useProcedureEdit = () => {
  const router = useRouter();
  const procedureId = router.query.id;
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState();
  // access token as state
  const [accessToken, setAccessToken] = useState<null | string>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
  }, []);

  const [initialProcedure, setInitialProcedure] = useState<ProcedureFormProps>({
    title: '',
    content: '',
    publish: false,
    steps: [],
  });

  const fetcher = (url: string, accessToken: string | null) =>
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json() as Promise<ProcedureFormProps>);

  useEffect(() => {
    if (procedureId && isInitialized === false && accessToken) {
      fetcher(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/procedures/${procedureId}`,
        accessToken
      )
        .then((res) => {
          setInitialProcedure(res);
          setIsInitialized(true);
        })
        .catch((e) => {
          setError(e);
        });
    }
  }, [setIsInitialized, setInitialProcedure, procedureId, accessToken]);

  const updateProcedure = useCallback(
    (procedure: ProcedureFormProps) => {
      (async () => {
        const method = 'PUT';
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };
        const body = JSON.stringify(procedure);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/procedures/${procedureId}`,
          {
            method,
            headers,
            body,
          }
        );

        if (res.status === 200) {
          toast.success('更新しました');
          router.push('/my_procedures');
        } else {
          console.log({ res });
        }
      })();
    },
    [procedureId]
  );

  return {
    initialProcedure,
    error,
    isInitialized,
    updateProcedure,
  };
};

export default useProcedureEdit;
