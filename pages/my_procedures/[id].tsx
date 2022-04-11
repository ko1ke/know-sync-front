import React from 'react';
import Head from 'next/head';
import MyProcedureForm from '../../components/procedure/MyProcedureForm';
import useProcedureEdit from '../../hooks/useProcedureEdit';
import Title from '../../components/common/Title';
import { useSelector } from '../../store';
import { idSelector } from '../../selectors/auth';

export default function EditProcedure() {
  const title = '投稿編集';

  const { initialProcedure, updateProcedure, isInitialized, error } =
    useProcedureEdit();
  const userId = useSelector(idSelector);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <Title text={title} />
        {!userId && <>ログインしてください</>}
        {error && <>エラー発生</>}
        {userId && (
          <MyProcedureForm
            initialProcedure={initialProcedure}
            createOrUpdateProcedure={updateProcedure}
            isInitialized={isInitialized}
          />
        )}
      </div>
    </>
  );
}
