import React from 'react';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { ProcedureFormProps } from '../../types/Procedure';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import FormikTextInput from '../common/FormikTextInput';
import FormikCheckBox from '../common/FormikCheckBox';
import Title from '../common/Title';
import MyProcedureStepImageInput from './MyProcedureStepImageInput';
import Tippy from '@tippyjs/react';
import * as Yup from 'yup';
import { FieldArray, Form, Formik } from 'formik';
import Button from '../common/Button';
import LoadingBar from '../common/LoadingBar';
import MyProcedurePreview from './ProcedurePreview';

type Props = {
  initialProcedure: ProcedureFormProps;
  createOrUpdateProcedure: (procedure: ProcedureFormProps) => void;
  isInitialized?: boolean;
};

const uploadImg = async (uploadName: string, img: File | undefined) => {
  if (!img) {
    return;
  } else {
    const imgPath = `stepImages/${uploadName}`;
    const storageRef = ref(storage, imgPath);
    const metadata = {
      contentType: img.type,
    };
    await uploadBytes(storageRef, img, metadata)
      .then((_snapshot) => {
        return;
      })
      .catch((error) => {
        return error;
      });
  }
};

const MyProcedureForm: React.FC<Props> = ({
  initialProcedure,
  createOrUpdateProcedure,
  isInitialized = true,
}) => {
  const handleSubmit = async (data: ProcedureFormProps) => {
    data.steps = data.steps.map((step) => {
      const { img } = step;
      if (img) {
        const uploadName = uuidv4() + extname(img.name);
        return { ...step, imgName: uploadName };
      } else {
        return step;
      }
    });
    for await (const step of data.steps) {
      await uploadImg(step.imgName, step.img);
    }
    const eyeCatchImgName = data.steps.find((s) => s.imgName)?.imgName || '';
    const steps = data.steps.map((step) => {
      const { content, imgName } = step;
      return { content, imgName };
    });
    createOrUpdateProcedure({
      title: data.title,
      content: data.content,
      publish: data.publish,
      eyeCatchImgName: eyeCatchImgName,
      steps: steps,
    });
  };

  return isInitialized ? (
    <div className="max-w-5xl w-full mx-auto z-10">
      <Formik
        enableReinitialize={true}
        initialValues={initialProcedure}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('???????????????????????????')
            .max(100, '??????100????????????'),
          content: Yup.string().max(1000, '??????1000????????????'),
          steps: Yup.array().of(
            Yup.object().shape({
              content: Yup.string().max(255, '??????255????????????'),
            })
          ),
        })}
        onSubmit={(values, submitProps) => {
          handleSubmit(values).finally(() => {
            submitProps.setSubmitting(false);
          });
        }}
      >
        {({ values, setValues, isValid, isSubmitting }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 md:divide-x-2 md:divide-dotted mb-4">
              <div>
                <div className="text-center">
                  <Title text="??????????????????" />
                </div>

                <FormikTextInput
                  labelText="????????????"
                  name="title"
                  type="text"
                  placeholder="??????# ???????????????????????????"
                />

                <FormikTextInput
                  as="textarea"
                  rows={4}
                  labelText="??????"
                  name="content"
                  type="text"
                  placeholder="?????????????????????????????????????????????????????????"
                />

                <FieldArray
                  name="steps"
                  render={(arrayHelpers) => {
                    const steps = values.steps;

                    return (
                      <div>
                        {steps && steps.length > 0 ? (
                          steps.map((step, index) => (
                            <div key={index} className="mb-3">
                              <div className="flex items-center justify-between mb-1">
                                <label className=" text-gray-700 text-sm font-bold mb-2">
                                  ?????? {index + 1}
                                </label>
                                <div>
                                  <Tippy content="???????????????">
                                    <button
                                      type="button"
                                      className="hover:text-gray-700 inline-block text-right"
                                      onClick={() =>
                                        arrayHelpers.insert(index + 1, {
                                          content: '',
                                          imgName: '',
                                          img: undefined,
                                          dataUrl: '',
                                          downloadUrl: '',
                                        })
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </Tippy>
                                  <Tippy content="???????????????">
                                    <button
                                      type="button"
                                      className="hover:text-gray-700 inline-block text-right"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </Tippy>
                                  {index !== 0 && (
                                    <Tippy content="?????????????????????">
                                      <button
                                        type="button"
                                        className="hover:text-gray-700 inline-block text-right"
                                        onClick={() =>
                                          arrayHelpers.swap(index, index - 1)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                    </Tippy>
                                  )}
                                  {index !== steps.length - 1 && (
                                    <Tippy content="?????????????????????">
                                      <button
                                        type="button"
                                        className="hover:text-gray-700 inline-block text-right"
                                        onClick={() =>
                                          arrayHelpers.swap(index, index + 1)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </button>
                                    </Tippy>
                                  )}
                                </div>
                              </div>

                              <div className="p-5 rounded border">
                                <div>
                                  <MyProcedureStepImageInput
                                    step={step}
                                    setValues={setValues}
                                    index={index}
                                  />
                                  <FormikTextInput
                                    as="textarea"
                                    placeholder="????????????????????????????????????"
                                    name={`steps.${index}.content`}
                                    rows={2}
                                    labelText="??????"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="mb-5">
                            <Button
                              fullWidth
                              color="green"
                              text="???????????????"
                              onClick={() => {
                                arrayHelpers.push({
                                  content: '',
                                  imgName: '',
                                  img: undefined,
                                  dataUrl: '',
                                  downloadUrl: '',
                                });
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                <FormikCheckBox name="publish" labelText="????????????" />
              </div>

              <div className="md:pl-6">
                <div className="text-center">
                  <Title text="???????????????" />
                </div>
                <MyProcedurePreview
                  title={values.title}
                  content={values.content}
                  steps={values.steps}
                />
              </div>
            </div>

            <Button
              fullWidth
              text={'??????'}
              color="blue"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <LoadingBar />
  );
};

export default MyProcedureForm;
