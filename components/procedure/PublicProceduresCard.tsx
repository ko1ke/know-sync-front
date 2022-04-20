import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { ProcedureIndexItem } from '../../types/Procedure';
import Button from '../common/Button';
import { TwitterShareButton } from 'react-share';
import TwitterButton from '../common/TwitterButton';
import { noteImageBase64 } from '../../lib/base64img';
import Tippy from '@tippyjs/react';
import DateFormatter from '../common/DateFormatter';
import { storage } from '../../lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

type Props = ProcedureIndexItem;

const PublicProcedureCard: React.FC<Props> = ({
  id,
  title,
  content,
  publish,
  updatedAt,
  username,
  eyeCatchImgName,
}) => {
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    if (eyeCatchImgName) {
      const storageRef = ref(storage, `/stepImages/${eyeCatchImgName}`);
      getDownloadURL(storageRef).then((url) => {
        setDownloadUrl(url);
      });
    }
  }, [eyeCatchImgName, setDownloadUrl]);

  return (
    <div className="max-w-5xl w-full mx-auto z-10">
      <div className="flex flex-col">
        <div className="bg-white border border-white shadow-lg  rounded-3xl p-4 m-4">
          <div className="flex-none sm:flex">
            <div className=" relative h-32 w-32  sm:mb-0 mb-3">
              {downloadUrl ? (
                <img
                  src={downloadUrl}
                  alt="eye-catch-img"
                  className=" w-32 h-32 object-cover "
                />
              ) : (
                <img
                  src={noteImageBase64}
                  alt="alt-eye-catch-img"
                  className=" w-32 h-32 object-cover "
                />
              )}
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
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>{username}</p>
                </div>

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
                  <p>
                    <DateFormatter dateString={updatedAt} />
                    更新
                  </p>
                </div>
                <div className="flex-1 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <p>{publish ? '公開中' : '非公開'}</p>
                </div>
              </div>
              <div className="flex-inline space-x-4 pt-2 text-sm text-gray-500 mb-1">
                <Link href={`/public_procedures/${id}`}>
                  <a>
                    <div className="flex-1 inline-flex items-center">
                      <Button text="閲覧" color="blue" />
                    </div>
                  </a>
                </Link>
                {publish && (
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
                )}
              </div>
              <div className="flex-inline space-x-4 pt-2 text-sm text-gray-500 mb-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProcedureCard;
