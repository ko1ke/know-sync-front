import type { ProcedureIndex } from '../../../types/Procedure';

export const getPublicProcedures = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/public_procedures`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const json = (await res.json()) as ProcedureIndex;
  return json;
};
