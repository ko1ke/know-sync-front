import React from 'react';
import { ProcedureFormProps } from '../../types/Procedure';
import MarkDownView from '../common/MarkDownView';

type Props = Omit<ProcedureFormProps, 'publish' | 'eyeCatchImgName'>;

const ProcedurePreview: React.FC<Props> = ({ title, content, steps }) => {
  return (
    <>
      <MarkDownView str={title} />
      <MarkDownView str={content} />
      <div>
        {steps.map((step, index) => {
          return (
            <div key={index} className="my-10">
              <h4 className="flex my-1 after:contents-[''] after:flex-auto after:border-b after:border-gray-300 after:my-auto after:ml-2">{`手順-${
                index + 1
              }`}</h4>
              {step.dataUrl ? (
                <div>
                  <div className="flex justify-center">
                    <img src={step.dataUrl} className="max-h-80 m-5" />
                  </div>
                </div>
              ) : step.downloadUrl ? (
                <div className="flex justify-center">
                  <img src={step.downloadUrl} className="max-h-80 m-5" />
                </div>
              ) : (
                <div></div>
              )}
              <MarkDownView str={step.content} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProcedurePreview;
