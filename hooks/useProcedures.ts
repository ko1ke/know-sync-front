import useSWRInfinite from 'swr/infinite';
import useIntersection from './useIntersection';
import React, { useEffect, useRef } from 'react';
import type { ProcedureIndex } from '../types/Procedure';

const useProcedures = (ref: React.MutableRefObject<HTMLDivElement>) => {
  // observe the trigger is displayed
  const intersection = useIntersection(ref);
  // generate key of swr
  const getKey = (pageIndex: number, previousPageData: ProcedureIndex) => {
    if (previousPageData && !previousPageData.procedures.length) return null;
    return `http://localhost:4000/procedures?page=${pageIndex + 1}`;
  };
  const {
    data: procedureList,
    error,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite(
    getKey,
    (url): Promise<ProcedureIndex> => fetch(url).then((r) => r.json()),
    {
      initialSize: 1,
    }
  );

  const isReachingEnd =
    procedureList?.[procedureList.length - 1].pagination.isLast === true;

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
  const procedures = procedureList?.map((p) => p.procedures).flat();

  return { procedures, error };
};

export default useProcedures;
