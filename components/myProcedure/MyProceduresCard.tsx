import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import type { ProcedureIndexItem } from '../../types/Procedure';
import Button from '../common/Button';
import { TwitterShareButton } from 'react-share';
import TwitterButton from '../common/TwitterButton';
import { noteImageBase64 } from '../../lib/base64img';
import Tippy from '@tippyjs/react';

type Props = ProcedureIndexItem & { deleteProcedure: (id: number) => void };

const ProcedureCard: React.FC<Props> = ({
  id,
  title,
  content,
  updatedAt,
  deleteProcedure,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    deleteProcedure(id);
    closeModal();
  };

  return (
    <div className="max-w-5xl w-full mx-auto z-10">
      <div className="flex flex-col">
        <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
          <div className="flex-none sm:flex">
            <div className=" relative h-32 w-32  sm:mb-0 mb-3">
              <img
                src={noteImageBase64}
                alt=""
                className=" w-32 h-32 object-cover "
              />
            </div>
            <div className="flex-auto sm:ml-5 justify-evenly">
              <div className="flex items-center justify-between sm:mt-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="w-full flex-none text-lg text-gray-800 font-bold leading-none">
                      {title}
                    </div>
                    <div className="flex-auto  my-1">{content}</div>
                  </div>
                </div>
              </div>
              <div className="flex-inline space-x-4 pt-2 text-sm text-gray-500 mb-1">
                <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{updatedAt} 更新</p>
                </div>
                {/* <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <p className="">{publish ? '公開中' : '非公開'}</p>
                </div> */}
              </div>
              <div className="flex-inline space-x-4 pt-2 text-sm text-gray-500 mb-1">
                <Link href={`/my_procedures/${id}`}>
                  <a>
                    <div className="flex-1 inline-flex items-center">
                      <Button
                        text="編集"
                        color="blue"
                        Icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        }
                      />
                    </div>
                  </a>
                </Link>
                <div className="flex-1 inline-flex items-center">
                  <Button
                    text="削除"
                    color="pink"
                    Icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    }
                    onClick={openModal}
                  />
                </div>
                {/* {publish && ( */}
                <div className="flex-1 inline-flex items-center">
                  <Tippy content="twitterでシェア">
                    <TwitterShareButton
                      title={title}
                      url={`${process.env.NEXT_PUBLIC_API_DOMAIN}/public_procedures/${id}`}
                    >
                      <TwitterButton />
                    </TwitterShareButton>
                  </Tippy>
                </div>
                {/* )} */}
              </div>
              <div className="flex-inline space-x-4 pt-2 text-sm text-gray-500 mb-1"></div>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0  bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  手順削除
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    「{title}」を削除しますか？
                  </p>
                </div>

                <div className="mt-4 flex justify-evenly">
                  <Button
                    color="gray"
                    text="いいえ"
                    type="button"
                    onClick={closeModal}
                  />
                  <Button
                    color="pink"
                    text="はい"
                    type="button"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProcedureCard;
