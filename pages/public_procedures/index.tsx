import React, { useRef } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import type { ProcedureIndex } from '../../types/Procedure';
import Head from 'next/head';
import usePublicProcedures from '../../hooks/usePublicProcedures';
import PublicProceduresCard from '../../components/procedure/PublicProceduresCard';
import Title from '../../components/common/Title';
import LoadingBar from '../../components/common/LoadingBar';
import { getPublicProcedures } from '../../lib/api/public_procedures';
import SearchInput from '../../components/common/SearchInput';

type Props = {
  publicProcedures: ProcedureIndex;
};

const PublicProcedures: NextPage<Props> = ({ publicProcedures }) => {
  const title = '公開投稿一覧';
  const intersectionRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const { procedures, error, setKeyword } = usePublicProcedures(
    intersectionRef,
    publicProcedures
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Title text={title} />
        <SearchInput
          placeholder="タイトル or ユーザー名で検索"
          setKeyword={setKeyword}
        />
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
                username={procedure.username}
                updatedAt={procedure.updatedAt}
                eyeCatchImgName={procedure.eyeCatchImgName}
              />
            );
          })}
      </div>

      <div aria-label={'scroll-trigger'} ref={intersectionRef} />
    </>
  );
};

export default PublicProcedures;

export const getStaticProps: GetStaticProps = async () => {
  const publicProcedures = await getPublicProcedures();
  return {
    props: { publicProcedures },
    revalidate: 10,
  };
};
