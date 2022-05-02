import React from 'react';
import Head from 'next/head';
import MyProcedureForm from '../../components/procedure/MyProcedureForm';
import useProcedureEdit from '../../hooks/useProcedureEdit';
import Title from '../../components/common/Title';
import Button from '../../components/common/Button';
import useBoolean from '../../hooks/useBoolean';
import { useSelector } from '../../store';
import { idSelector } from '../../selectors/auth';
import OutlineButton from '../../components/common/OutlineButton';
import ModalDialog from '../../components/common/ModalDialog';

export default function EditProcedure() {
  const title = '投稿編集';

  const { initialProcedure, updateProcedure, isInitialized, error } =
    useProcedureEdit();
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
            <div>
              <table className="mx-auto overflow-x-scroll whitespace-no-wrap my-4 border-collapse border-2 border-gray-500">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 text-gray-800">
                      スタイル名称
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-gray-800">
                      記述例
                    </th>
                    <th className="border border-gray-400 px-4 py-2 text-gray-800">
                      表示
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      見出し１
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      # ハロー
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <p className="text-3xl">ハロー</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      見出し２
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      ## ハロー
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <p className="text-2xl">ハロー</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      見出し３
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      ### ハロー
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <p className="text-xl">ハロー</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">斜体</td>
                    <td className="border border-gray-400 px-4 py-2">
                      _ハロー_
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <em>ハロー</em>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">太字</td>
                    <td className="border border-gray-400 px-4 py-2">
                      __ハロー__
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <strong>ハロー</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">取消線</td>
                    <td className="border border-gray-400 px-4 py-2">
                      ~ハロー~
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <del>ハロー</del>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">引用</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {'>'} ハロー
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <span className="border-l-2 px-1 text-gray-400">
                        ハロー
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">文字色</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {`<font color="Red">ハロー</font>`}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <p className="text-red-400">ハロー</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      番号付きリスト
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <p>1. ハロー</p>
                      <p>1. ハロー</p>
                      <p>1. ハロー</p>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <ol>
                        <li className="list-decimal ml-5">ハロー</li>
                        <li className="list-decimal ml-5">ハロー</li>
                        <li className="list-decimal ml-5">ハロー</li>
                      </ol>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      箇条書きリスト
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <p>- ハロー</p>
                      <p>- ハロー</p>
                      <p>- ハロー</p>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <ul>
                        <li className="list-disc ml-5">ハロー</li>
                        <li className="list-disc ml-5">ハロー</li>
                        <li className="list-disc ml-5">ハロー</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      ハイパーリンク
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      [ハロー]("リンク先のURL")
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <a className="underline text-blue-600 hover:text-blue-800 cursor-pointer">
                        ハロー
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end">
                <Button
                  color="gray"
                  text="閉じる"
                  type="button"
                  autoFocus={false}
                  onClick={closeModal}
                />
              </div>
            </div>
          </ModalDialog>
        </div>
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
