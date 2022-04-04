import React from 'react';
import Head from 'next/head';
import MyProcedureForm from '../../components/myProcedure/MyProcedureForm';
export default function NewProcedures() {
  const title = '投稿作成';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <MyProcedureForm />
      </div>
    </>
  );
}
