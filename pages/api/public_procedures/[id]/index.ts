import { NextApiRequest, NextApiResponse } from 'next';
import '../../../../lib/firebase_admin';
import { storage } from 'firebase-admin';
import { ProcedureFormProps } from '../../../../types/Procedure';

const bucket = storage().bucket();
const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json() as Promise<ProcedureFormProps>);

const getPublicProcedure = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.id as string;
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/public_procedures/${id}`
  );

  await (async () => {
    for await (let step of data.steps) {
      if (step.imgName) {
        const file = bucket.file(`stepImages/${step.imgName}`);
        const url = await file.getSignedUrl({
          action: 'read',
          expires: '01-01-2100',
        });
        step.downloadUrl = url ? url.toString() : '';
      } else {
        step.downloadUrl = undefined;
      }
    }
  })();

  await res.status(200).json({ procedure: data });
};

export default getPublicProcedure;
