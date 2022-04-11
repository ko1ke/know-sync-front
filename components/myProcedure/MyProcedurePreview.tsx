import React from 'react';
import { ProcedureFormProps } from '../../types/Procedure';
import MarkDownView from '../common/MarkDownView';
import styled from 'styled-components';

type Props = Omit<ProcedureFormProps, 'publish'>;

const StepTitle = styled.h4`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
  margin-bottom: 4px;

  &::after {
    content: '';
    flex: 1 1;
    border-bottom: 0.5px solid #a9a9a9;
    margin: auto 0.8em;
  }
`;
const ProcedurePreview: React.FC<Props> = ({ title, content, steps }) => {
  return (
    <>
      <MarkDownView str={title} />
      <MarkDownView str={content} />
      <div>
        {steps.map((step, index) => {
          return (
            <div key={index} className="my-10">
              <StepTitle>{`手順-${index + 1}`}</StepTitle>
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
