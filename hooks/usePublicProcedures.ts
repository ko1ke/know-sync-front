import React, { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import useIntersection from './useIntersection';
import type { ProcedureIndex } from '../types/Procedure';

const usePublicProcedures = (
  ref: React.MutableRefObject<HTMLDivElement>,
  initialData: ProcedureIndex
) => {
  // observe the trigger is displayed
  const intersection = useIntersection(ref);
  // generate key of swr
  const getKey = (pageIndex: number, previousPageData: ProcedureIndex) => {
    if (previousPageData && !previousPageData.procedures?.length) return null;
    return `${process.env.NEXT_PUBLIC_API_DOMAIN}/public_procedures?page=${
      pageIndex + 1
    }`;
  };
  const {
    data: procedureList,
    error,
    size,
    setSize,
  } = useSWRInfinite(
    getKey,
    (url): Promise<ProcedureIndex> =>
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json()),
    {
      initialSize: 1,
      fallbackData: [initialData],
    }
  );

  const isReachingEnd =
    procedureList &&
    procedureList[procedureList.length - 1].pagination?.isLast === true;

  const getProcedures = async () => {
    setSize(size + 1);
  };

  useEffect(() => {
    // if react the trigger by scroll, get next data
    if (intersection && !isReachingEnd) {
      getProcedures();
    }
  }, [intersection, isReachingEnd]);

  // flat array to manipulate easy
  const procedures = procedureList
    ? procedureList.map((p) => p.procedures).flat()
    : [];

  return { procedures, error };
};

export default usePublicProcedures;
