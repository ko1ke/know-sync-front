import React, { useEffect, useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';
import useIntersection from './useIntersection';
import type { ProcedureIndex } from '../types/Procedure';
import toast from 'react-hot-toast';

const useProcedures = (ref: React.MutableRefObject<HTMLDivElement>) => {
  // observe the trigger is displayed
  const intersection = useIntersection(ref);
  // generate key of swr
  const getKey = (pageIndex: number, previousPageData: ProcedureIndex) => {
    if (previousPageData && !previousPageData.procedures?.length) return null;
    return `${process.env.NEXT_PUBLIC_API_DOMAIN}/procedures?page=${
      pageIndex + 1
    }`;
  };
  const {
    data: procedureList,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(
    getKey,
    (url): Promise<ProcedureIndex> =>
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }).then((r) => r.json()),
    {
      initialSize: 1,
      fallbackData: [
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
      ],
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

  const deleteProcedure = useCallback(
    (id: number) => {
      (async () => {
        const method = 'DELETE';
        const accessToken = localStorage.getItem('accessToken');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/procedures/${id}`,
          {
            method,
            headers,
          }
        );

        if (res.status === 200 && procedureList) {
          const newList = procedureList.map((p) => {
            const { procedures } = p;
            const newProcedures = procedures.filter((p) => p.id !== id);
            return {
              procedures: newProcedures,
              pagination: p.pagination,
            };
          });
          mutate(newList);
          toast.success('削除しました');
        } else {
          toast.error('エラーにより、削除できませんでした');
        }
      })();
    },
    [procedureList]
  );

  // flat array to manipulate easy
  const procedures = procedureList
    ? procedureList.map((p) => p.procedures).flat()
    : [];

  return { procedures, error, deleteProcedure };
};

export default useProcedures;
