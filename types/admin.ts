export interface QuotationsLog {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  quotationStatusHistoryLogIdx: number;
  beforeQuotationRequestStatus: string;
  afterQuotationRequestStatus: string;
  quotationRequestIdx: number;
}

export interface QuotationsLogResponse {
  isSuccess: boolean;
  data: QuotationsLog[];
}

export interface ProjectLog {
  afterProjectStatus: string;
  beforeProjectStatus: string;
  createdAt: string;
  deletedAt: string | null;
  projectHistoryLogIdx: number;
  projectIdx: number;
  updatedAt: string;
}
export interface ProjectLogResponse {
  isSuccess: boolean;
  data: ProjectLog[];
}
