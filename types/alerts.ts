export interface Alerts {
  mypageAlertsEn: any;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  unreadPointsIdx: number;
  memberType: string;
  memberIdx: number;

  wasReadUserQuotation: boolean;
  wasReadUserProject: boolean;
  wasReadUserAfterSalesService: boolean;
  wasReadUserChargingStation: boolean;
  wasReadCompanyReceivedQuotation: boolean;
  wasReadCompanySentQuotation: boolean;
  wasReadCompanyQuotationHistory: boolean;
  wasReadCompanyNewAfterSalesService: boolean;
  wasReadCompanyAfterSalesServiceHistory: boolean;
  wasReadCompanyInProgressProject: boolean;
  wasReadCompanyCompletedProject: boolean;
  wasReadChatting: boolean;
  wasReadAlertBell: boolean;
  unreadChatLogsCount: number;
  unreadQuotationRequestsCount: number;

  [key: string]: string | null | number | boolean;
}

export interface AlertsResponse {
  isSuccess: true;
  data: Alerts;
}
