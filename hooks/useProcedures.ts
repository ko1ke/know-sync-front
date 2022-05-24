import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { refresh } from '../slices/auth';
import useSWRInfinite from 'swr/infinite';
import useIntersection from './useIntersection';
import type { ProcedureIndex } from '../types/Procedure';
import toast from 'react-hot-toast';

const initialData = [
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
];

const useProcedures = (ref: React.MutableRefObject<HTMLDivElement>) => {
  const dispatch = useDispatch();
  // observe the trigger is displayed
  const intersection = useIntersection(ref);
  // keyword for search
  const [keyword, setKeyword] = useState('');
  // sanitize keyword
  const keywordQuery = useMemo(
    () => keyword.replace(/^\#+|\;/g, ''),
    [keyword]
  );

  const fetcher = async (url: string, accessToken: string) => {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // unless status code in 200-299, throw error
    if (!res.ok) {
      const error: any = new Error(
        'An error occurred while fetching the data.'
      );
      error.info = await res.json();
      error.status = res.status;
      console.log(error);
      throw error;
    }

    return res.json();
  };

  // generate key of swr
  const getKey = (pageIndex: number, previousPageData: ProcedureIndex) => {
    if (previousPageData && !previousPageData.procedures?.length) return null;
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;
    return [
      `${
        process.env.NEXT_PUBLIC_API_DOMAIN
      }/procedures?keyword=${keywordQuery}&page=${pageIndex + 1}`,
      accessToken,
    ];
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
    (url, accessToken): Promise<ProcedureIndex> => fetcher(url, accessToken),
    {
      initialSize: 1,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // return unless 401(unauthorized)
        if (error.status !== 401) return;

        // retry up to 3 times
        if (retryCount >= 3) return;

        // error might be happened by expiration, so refresh token
        dispatch(refresh());

        // retry after 5 sec
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
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

  // reset data when keyword changed
  useEffect(() => {
    mutate(initialData);
    setSize(1);
  }, [keyword]);

  const deleteProcedure = useCallback(
    (id: number) => {
      (async () => {
        const accessToken = localStorage.getItem('accessToken');
        const method = 'DELETE';
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
  const procedures = useMemo(
    () => (procedureList ? procedureList.map((p) => p.procedures).flat() : []),
    [procedureList]
  );
  return { procedures, error, isValidating, deleteProcedure, setKeyword };
};

export default useProcedures;
