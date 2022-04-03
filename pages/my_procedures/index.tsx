import React, { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../../components/common/Button';
import useProcedures from '../../hooks/useProcedures';
import MyProceduresCard from '../../components/myProcedure/MyProceduresCard';

export default function Procedures() {
  const title = '投稿一覧';
  const intersectionRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const { procedures, error } = useProcedures(intersectionRef);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Link href={`/my_procedures/new`}>
        <a>
          <div className="text-center mb-2">
            <Button fullWidth text="新規作成" color="blue" />
          </div>
        </a>
      </Link>
      <div>
        {error && <>エラー</>}
        {!procedures && <>データ取得中……</>}
        {procedures &&
          procedures.map((procedure) => (
            <MyProceduresCard
              key={procedure.id}
              id={procedure.id}
              title={procedure.title}
              content={procedure.content}
              updatedAt={procedure.updatedAt}
            />
          ))}
      </div>
      <div aria-label={'scroll-trigger'} ref={intersectionRef} />
    </>
  );
}
