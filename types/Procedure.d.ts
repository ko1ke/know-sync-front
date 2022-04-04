import { Pagination } from './Pagination';

export type ProcedureIndexItem = {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly updatedAt: Date;
};

export type ProcedureIndex = {
  readonly procedures: ProcedureIndexItem[];
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
