import React, { useEffect, useState, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import useIntersection from './useIntersection';
import type { ProcedureIndex } from '../types/Procedure';

const usePublicProcedures = (
  ref: React.MutableRefObject<HTMLDivElement>,
  initialData: ProcedureIndex
) => {
  // observe the trigger is displayed
  const intersection = useIntersection(ref);
  // keyword for search
  const [keyword, setKeyword] = useState('');
  // sanitize keyword
  const keywordQuery = useMemo(
    () => keyword.replace(/^\#+|\;/g, ''),
    [keyword]
  );

  // generate key of swr
  const getKey = (pageIndex: number, previousPageData: ProcedureIndex) => {
    if (previousPageData && !previousPageData.procedures?.length) return null;
    return `${
      process.env.NEXT_PUBLIC_API_DOMAIN
    }/public_procedures?keyword=${keywordQuery}&page=${pageIndex + 1}`;
  };
  const {
    data: procedureList,
    error,
    size,
    setSize,
    mutate,
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

  // reset data when keyword changed
  useEffect(() => {
    mutate([
      {
        procedures: [],
        pagination: {
          itemsCount: 0,
          currentPage: 1,
          totalPages: 1,
          isFirst: true,
          isLast: true,
        },
      },
    ]);
    setSize(1);
  }, [keyword]);

  useEffect(() => {
    // if react the trigger by scroll, get next data
    if (intersection && !isReachingEnd) {
      getProcedures();
    }
  }, [intersection, isReachingEnd]);

  // flat array to manipulate easy
  const procedures = useMemo(
    () => (procedureList ? procedureList.map((p) => p.procedures).flat() : []),
    [procedureList]
  );

  return { procedures, error, setKeyword };
};

export default usePublicProcedures;
