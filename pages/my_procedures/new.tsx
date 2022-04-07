import React from 'react';
import Head from 'next/head';
import MyProcedureForm from '../../components/myProcedure/MyProcedureForm';
import useProcedureNew from '../../hooks/useProcedureNew';
import Title from '../../components/common/Title';

export default function NewProcedure() {
  const title = '投稿作成';
  const { initialProcedure, createProcedure } = useProcedureNew();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Title text={title} />
        <MyProcedureForm
          initialProcedure={initialProcedure}
          createOrUpdateProcedure={createProcedure}
        />
      </div>
    </>
  );
}
