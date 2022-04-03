import { Pagination } from './Pagination';

export type Procedure = {
  id: string;
  userId: string;
  title: string;
  content: string;
  updatedAt: Date;
  steps: [
    {
      content: string;
      imgName: string;
    }
  ];
};

export type ProcedureIndex = {
  readonly procedures: {
    readonly id: string;
    readonly title: string;
    readonly content: string;
    readonly updatedAt: Date;
  }[];
  readonly pagination: Pagination;
};

export type ProcedureFormProps = {
  title: string;
  content: string;
  steps: Step[];
};

export type Step = {
  content: string;
  imgName: string;
  readonly img?: File;
  readonly dataUrl?: string;
  readonly downloadUrl?: string;
};
