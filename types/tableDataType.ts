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
    }
  };