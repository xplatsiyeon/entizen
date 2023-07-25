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
  birthDate: null | string;
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
  projectCompletionAgreementDate?: string;
  isCancel: boolean;
  subscribeStartDate?: string;
  subscribeEndDate?: string;
  companyMember: {
    memberIdx: number;
    id: string;
  };
  userMember: {
    memberIdx: number;
    id: string;
  };
  currentStep: string;
  subscribeLeftDays?: number;
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
    terms: {
      createdAt: string;
      termIdx: number;
      type: string;
      content: string;
    }[];
  };
}
export type PartnerProductData = {
  isSuccess: boolean;
  data: {
    totalCount: number;
    products: PartnerProducts[];
  };
};

// 가이드 리스트
export interface AdminGuideListResponse {
  isSuccess: true;
  data: {
    guides: {
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      guideIdx: number;
      guideKind: string;
      title: string;
      content: string;
    }[];
  };
}

export type PartnerProducts = {
  chargerProductIdx: number;
  manufacturer: string;
  kind: string;
  method: string[];
  channel: string;
  createdAt: string;
  member: {
    memberIdx: number;
    name: string;
    phone: string;
    companyMemberAdditionalInfo: {
      companyMemberAdditionalInfoIdx: number;
      companyName: string;
    };
  };
  chargerProductFiles: [
    {
      chargerProductFileIdx: number;
      url: string;
    },
  ];
};

// 공지사항
export interface AdminNoticeListResponse {
  isSuccess: boolean;
  data: {
    totalCount: number;
    notices: {
      createdAt: string;
      noticeIdx: number;
      title: string;
      content: string;
      isVisible: boolean;
    }[];
  };
}

// 배너리스트

export interface AdminBannerListResponse {
  isSuccess: boolean;
  data: {
    banners: {
      bannerIdx: number;
      title: string;
      isVisible: boolean;
      createdAt: string;
    }[];
  };
}
export interface AdminBannerDetailResponse {
  isSuccess: boolean;
  data: {
    banner: {
      bannerIdx: number;
      targetMemberType: string;
      title: string;
      url: string;
      isVisible: boolean;
      bannerImages: {
        createdAt: string;
        bannerImageIdx: number;
        imageSizeType: string;
        originalName: string;
        url: string;
        size: number;
      }[];
    };
  };
}

// faq 리스트 조회
export interface AdminFAQListResponse {
  isSuccess: boolean;
  data: {
    faqs: {
      createdAt: string;
      faqIdx: number;
      faqKind: string;
      question: string;
      answer: string;
      isVisible: boolean;
      visibleTarget: string;
    }[];

    totalCount: number;
  };
}

// 1:1채팅 조회
export interface OneOnOneChatResponse {
  isSuccess: boolean;
  data: {
    consultations: {
      memberType: string;
      memberIdx: number;
      memberId: string;
      consultStatus: string;
      chattingRoomIdx: number;
      wasRead: number;
      isUnread: boolean;
      unreadCount: number;
    }[];
    totalCount: number;
  };
}
// 관리자 리스트 조회
export interface AdminAccountList {
  isSuccess: boolean;
  data: {
    totalCount: number;
    managers: {
      managerIdx: number;
      id: string;
      name: string;
      phone: string;
      email: string;
      isRepresentativeAdmin: boolean;
    }[];
  };
}

// 프로젝트 현황 리스트 조회
export interface ProjectListSituation {
  isSuccess: boolean;
  data: {
    totalCount: number;
    projects: {
      projectIdx: number;
      projectNumber: string;
      projectName: string;
      createdAt: string;
      isCompletedContractStep: string;
      isCompletedReadyStep: boolean;
      isCompletedInstallationStep: boolean;
      isCompletedExamStep: boolean;
      isApprovedByAdmin: boolean;
      subscribeStartDate: string;
      isCancel: boolean;
      companyMember: {
        memberIdx: number;
        id: string;
      };
      userMember: {
        memberIdx: number;
        id: string;
      };
      badge: string;
    }[];
  };
}

// 역경매 현황 리스트 조회
export interface ReverseAuctionSituation {
  isSuccess: boolean;
  data: {
    totalCount: number;
    quotationRequests: {
      quotationRequestIdx: number;
      createdAt: string;
      expiredAt: string;
      installationAddress: string;
      quotationStatus: string;
      member: {
        memberIdx: number;
        name: string;
      };
      quotationStatusHistories: {
        quotationStatusHistoryIdx: number;
        quotationRequestStatus: string;
      }[];
      badge: string;
    }[];
  };
}

// as 현황 리스트 조회
export interface ASListSitutation {
  isSuccess: boolean;
  data: {
    totalCount: number;
    afterSalesServices: {
      afterSalesServiceIdx: number;
      createdAt: string;
      afterSalesServiceCompletionConsentStatus: boolean;
      afterSalesServiceResultDate: string;
      acceptanceDate: string;
      project: {
        projectIdx: number;
        projectName: string;
        companyMember: {
          memberIdx: number;
          id: string;
          companyMemberAdditionalInfo: {
            companyMemberAdditionalInfoIdx: number;
            companyName: string;
          };
        };
        userMember: {
          memberIdx: number;
          id: string;
        };
      };
      badge: string;
    }[];
  };
}
