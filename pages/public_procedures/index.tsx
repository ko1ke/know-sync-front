import React, { useRef } from 'react';
import Head from 'next/head';
import usePublicProcedures from '../../hooks/usePublicProcedures';
import PublicProceduresCard from '../../components/publicProcedure/PublicProceduresCard';
import Title from '../../components/common/Title';
import LoadingBar from '../../components/common/LoadingBar';

export default function Procedures() {
  const title = '公開投稿一覧';
  const intersectionRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const { procedures, error } = usePublicProcedures(intersectionRef);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Title text={title} />
        {!procedures && <LoadingBar />}
        {error && <>エラー発生</>}
        {procedures &&
          procedures.map((procedure) => {
            return (
              <PublicProceduresCard
                key={procedure.id}
                id={procedure.id}
                title={procedure.title}
                content={procedure.content}
                publish={procedure.publish}
                updatedAt={procedure.updatedAt}
              />
            );
          })}
      </div>

      <div aria-label={'scroll-trigger'} ref={intersectionRef} />
    </>
  );
}
