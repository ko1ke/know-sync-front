import { Pagination } from './Pagination';

export type ProcedureIndexItem = {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly updatedAt: string;
  readonly publish: boolean;
  readonly username: string;
  readonly eyeCatchImgName: string;
};

export type ProcedureIndex = {
  readonly procedures: ProcedureIndexItem[];
  readonly pagination: Pagination;
};

export type ProcedureFormProps = {
  title: string;
  content: string;
  publish: boolean;
  steps: Step[];
  eyeCatchImgName?: string;
};

export type Step = {
  content: string;
  imgName: string;
  img?: File;
  dataUrl?: string;
  downloadUrl?: string;
};
