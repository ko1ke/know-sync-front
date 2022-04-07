import React from 'react';
import Head from 'next/head';
import MyProcedureForm from '../../components/myProcedure/MyProcedureForm';
import useProcedureEdit from '../../hooks/useProcedureEdit';
import Title from '../../components/common/Title';

export default function EditProcedure() {
  const title = '投稿編集';
  const { initialProcedure, updateProcedure, initializationRef, error } =
    useProcedureEdit();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Title text={title} />
        <MyProcedureForm
          initialProcedure={initialProcedure}
          createOrUpdateProcedure={updateProcedure}
          isInitialized={initializationRef.current}
        />
      </div>
    </>
  );
}
