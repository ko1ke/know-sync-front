import React from 'react';
import Head from 'next/head';
import MyProcedureForm from '../../components/procedure/MyProcedureForm';
import useProcedureNew from '../../hooks/useProcedureNew';
import Title from '../../components/common/Title';
import { useSelector } from '../../store';
import { idSelector } from '../../selectors/auth';
import Button from '../../components/common/Button';
import OutlineButton from '../../components/common/OutlineButton';
import useBoolean from '../../hooks/useBoolean';
import ModalDialog from '../../components/common/ModalDialog';
import MarkdownExample from '../../components/procedure/MarkdownExample';

export default function NewProcedure() {
  const title = '投稿作成';
  const { initialProcedure, createProcedure } = useProcedureNew();
  const userId = useSelector(idSelector);
  const {
    bool: isOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div className="flex justify-between">
          <Title text={title} />
          <OutlineButton text={'マークダウン早見表'} onClick={openModal} />
          <ModalDialog
            title={`使用可能なマークダウン例`}
            isOpen={isOpen}
            maxWidth={'xl'}
            closeModal={closeModal}
          >
            <MarkdownExample />
            <div className="flex justify-end">
              <Button
                color="gray"
                text="閉じる"
                type="button"
                autoFocus={false}
                onClick={closeModal}
              />
            </div>
          </ModalDialog>
        </div>
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
