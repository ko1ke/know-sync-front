import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../../lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import Tippy from '@tippyjs/react';
import { ProcedureFormProps, Step } from '../../types/Procedure';
import imageCompression from 'browser-image-compression';

type Props = {
  setValues: (
    values: React.SetStateAction<ProcedureFormProps>,
    shouldValidate?: boolean | undefined
  ) => void;
  index: number;
  step: Step;
};

const MyProcedureStepImageInput: React.FC<Props> = ({
  setValues,
  step,
  index,
}) => {
  useEffect(() => {
    if (step.imgName) {
      const storageRef = ref(storage, `/stepImages/${step.imgName}`);
      getDownloadURL(storageRef)
        .then((url) => {
          setValues((prevValues) => {
            const { steps } = prevValues;
            steps[index]['downloadUrl'] = url;
            return { ...prevValues, steps: steps };
          });
        })
        .catch((error) => {
          console.log(error);
          setValues((prevValues) => {
            const { steps } = prevValues;
            steps[index]['downloadUrl'] = '';
            steps[index]['dataUrl'] = '';
            return { ...prevValues, steps: steps };
          });
        });
    } else {
      setValues((prevValues) => {
        const { steps } = prevValues;
        steps[index]['downloadUrl'] = '';
        steps[index]['dataUrl'] = '';
        return { ...prevValues, steps: steps };
      });
    }
  }, [step.imgName, index, setValues]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles[0]) return;

      const compressOption = {}; // use default values
      try {
        const compressFile = await imageCompression(
          acceptedFiles[0],
          compressOption
        );
        const url = await imageCompression.getDataUrlFromFile(compressFile);
        setValues((prevValues) => {
          const { steps } = prevValues;
          steps[index]['img'] = compressFile;
          steps[index]['dataUrl'] = url;
          steps[index]['downloadUrl'] = '';
          return { ...prevValues, steps: steps };
        });
      } catch (error) {
        alert(error);
      }
    },
    [index, setValues]
  );

  const onDropRejected = () => {
    alert('3MB以下の画像データ（jpeg/png/gif');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    accept: 'image/jpeg, image/png, image/gif',
    maxSize: 3 * 1024 ** 2, //3MB
  });

  const handleDeleteImage = () => {
    setValues((prevValues) => {
      const { steps } = prevValues;
      steps[index]['img'] = undefined;
      steps[index]['dataUrl'] = '';
      steps[index]['imgName'] = '';
      return { ...prevValues, steps: steps };
    });
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          画像
        </label>
        <Tippy content="画像を削除">
          <button
            type="button"
            className="hover:text-gray-700 inline-block text-right"
            onClick={handleDeleteImage}
          >
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
          </button>
        </Tippy>
      </div>
      <div
        {...getRootProps()}
        className="w-full border shadow py-8 px-3 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {step.dataUrl ? (
          <div>
            <div className="flex justify-center">
              <img src={step.dataUrl} className="max-h-80" alt="step-image" />
            </div>
          </div>
        ) : step.downloadUrl ? (
          <div className="flex justify-center">
            <img src={step.downloadUrl} className="max-h-80" alt="step-image" />
          </div>
        ) : (
          <div>
            <p>
              画像データをドラッグ・アンド・ドロップ or
              クリックして画像データを選択
            </p>
            <p className="inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                viewBox="0 0 18 18"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProcedureStepImageInput;
