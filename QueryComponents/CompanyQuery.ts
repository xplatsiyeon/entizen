import { gql } from '@apollo/client';

export interface InProgressProjects {
  badge: string;
  projectIdx: string;
  projectName: string;
}
export interface Response {
  inProgressProjects: InProgressProjects[];
}

export const GET_InProgressProjects = gql`
  query Query {
    inProgressProjects {
      projectIdx
      projectName
      badge
    }
  }
`;
