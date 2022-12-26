export type UserData = {
  isSuccess: boolean;
  data: {
    members: UserMemberInfo[];
    totalCount: number;
  };
};

export type UserMemberInfo = {
  memberIdx: number;
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  deletedAt: null | string;
};

export type ComUserData = {
  isSuccess: boolean;
  data: {
    members: ComUserMemberInfo[];
    totalCount: number;
  };
};

export type ComUserMemberInfo = {
  memberIdx: number;
  id: string;
  name: string;
  phone: string;
  isAdminJoinApproved: boolean;
  createdAt: string;
  deletedAt: null | string;
  companyMemberAdditionalInfo: {
    companyMemberAdditionalInfoIdx: number;
    companyName: string;
    managerEmail: string;
  };
};

export type Quotations = {
  isSuccess: boolean;
  data: {
    totalCount: number;
    quotationRequests: QuotationRequest[];
  };
};

export type QuotationRequest = {
  quotationRequestIdx: number;
  quotationStatus: string;
  installationAddress: string;
  expiredAt: string;
  createdAt: string;
  member: {
    memberIdx: number;
    id: string;
  };
  badge: string;
};

export type ProjectList = {
  isSuccess: boolean;
  data: {
    totalCount: number;
    projects: Projects[];
  };
};

export type Projects = {
  projectIdx: number;
  projectNumber: string;
  projectName: string;
  createdAt: string;
  isCompletedContractStep: string;
  isCompletedReadyStep: boolean;
  isCompletedInstallationStep: boolean;
  isCompletedExamStep: boolean;
  isApprovedByAdmin: boolean;
  isCancel: boolean;
  companyMember: {
    memberIdx: number;
    id: string;
  };
  userMember: {
    memberIdx: number;
    id: string;
  };
  currentStep: string;
};

export interface CompanyPreQuotationResponse {
  isSuccess: true;
  data: {
    preQuotations: {
      preQuotationIdx: number;
      createdAt: string;
      member: {
        memberIdx: number;
        phone: string;
        id: string;
        name: string;
        companyMemberAdditionalInfo: {
          companyMemberAdditionalInfoIdx: number;
          companyName: string;
          managerEmail: string;
        };
      };
      // nullable
      finalQuotation: {
        finalQuotationIdx: number;
        // nullable
        project: {
          projectIdx: number;
          isCompletedContractStep: string;
        };
      };
    }[];
  };
}

export interface ASListResponse {
  isSuccess: true;
  data: {
    totalCount: number;

    afterSalesServices: {
      acceptanceDate: string;
      afterSalesServiceCompletionConsentStatus: string;
      afterSalesServiceIdx: number;
      afterSalesServiceResultDate: string;
      createdAt: string;
      currentStep: string;
      project: {
        projectIdx: number;
        projectNumber: string;
        projectName: string;
        companyMember: {
          memberIdx: number;
          id: string;
        };
        userMember: {
          memberIdx: number;
          id: string;
        };
      };
    }[];
  };
}

export interface UserChattingListResponse {
  isSuccess: true;
  data: {
    totalCount: number;
    chattingRooms: {
      userMember: {
        memberIdx: number;
        id: string;
      };
      companyMember: {
        memberIdx: number;
        id: string;
      };
      chattingRoom: {
        chattingRoomIdx: number;
        chattingLog: {
          chattingLogIdx: number;
          createdAt: string;
        };
      };
    }[];
  };
}

export interface EntizenLibraryResponse {
  isSuccess: true;
  data: {
    createdAt: string;
    libraryIdx: number;
    imageUrl: string;
    title: string;
    link: string;
  }[];
}

// 약관 리스트
export interface AdminTermsListResponse {
  isSuccess: true;
  data: {
    createdAt: string;
    title: string;
  }[];
}
