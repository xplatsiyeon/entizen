import { gql } from '@apollo/client';

export interface MyprojectList {
  projectIdx: string;
  badge: string;
  projectName: string;
  companyMember: {
    memberIdx: string;
    companyMemberAdditionalInfo: {
      companyName: string;
    };
  };
}

export interface MyprojectListResponse {
  uncompletedProjects: MyprojectList[];
}

export const myprojectList = gql`
  query Query {
    uncompletedProjects {
      projectIdx
      badge
      projectName
      companyMember {
        memberIdx
        companyMemberAdditionalInfo {
          companyName
        }
      }
    }
  }
`;
