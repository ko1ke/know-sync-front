import React, { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useProcedures from '../../hooks/useProcedures';
import MyProceduresCard from '../../components/myProcedure/MyProceduresCard';
import FloatingButton from '../../components/common/FloatingButton';
import LoadingBar from '../../components/common/LoadingBar';

export default function Procedures() {
  const title = '投稿一覧';
  const intersectionRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const { procedures, error, deleteProcedure } = useProcedures(intersectionRef);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        {error && <>エラー</>}
        {!procedures && <LoadingBar />}
        {procedures &&
          procedures.map((procedure) => (
            <MyProceduresCard
              key={procedure.id}
              id={procedure.id}
              title={procedure.title}
              content={procedure.content}
              updatedAt={procedure.updatedAt}
              deleteProcedure={deleteProcedure}
            />
          ))}
      </div>

      <div aria-label={'scroll-trigger'} ref={intersectionRef} />

      <div className="fixed bottom-8 right-8">
        <Link href={`/my_procedures/new`}>
          <a>
            <FloatingButton
              color="blue"
              Icon={
                <svg
                  viewBox="0 0 20 20"
                  enableBackground="new 0 0 20 20"
                  className="w-6 h-6 inline-block"
                >
                  <path
                    fill="#FFFFFF"
                    d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                  />
                </svg>
              }
            />
          </a>
        </Link>
      </div>
    </>
  );
}