export interface HistoryAlertTypeV1 {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  alertHistoryIdx: number;
  title: string;
  body: string;
  link: string;
  memberIdx: number;
  alertResult: string;
  wasRead: boolean;
}
export interface HistoryAlertTypeV1Response {
  isSuccess: boolean;
  data: {
    alertHistories: HistoryAlertTypeV1[];
  };
}
