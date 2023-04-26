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
