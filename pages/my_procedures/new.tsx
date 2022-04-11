import React from 'react';
import Head from 'next/head';
import MyProcedureForm from '../../components/procedure/MyProcedureForm';
import useProcedureNew from '../../hooks/useProcedureNew';
import Title from '../../components/common/Title';
import { useSelector } from '../../store';
import { idSelector } from '../../selectors/auth';

export default function NewProcedure() {
  const title = '投稿作成';
  const { initialProcedure, createProcedure } = useProcedureNew();
  const userId = useSelector(idSelector);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Title text={title} />
        {!userId && <>ログインしてください</>}
        {userId && (
          <MyProcedureForm
            initialProcedure={initialProcedure}
            createOrUpdateProcedure={createProcedure}
          />
        )}
      </div>
    </>
  );
}
