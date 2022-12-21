import styled from '@emotion/styled';
import CompanyManagement from 'componentsAdmin/Member/CompanyManagement';
import UserDetail from 'componentsAdmin/Member/CommonDetail';
import UserManagement from 'componentsAdmin/Member/UserManagement';
import Workspace from 'componentsAdmin/workspace';
import React, { useState } from 'react';
import ProjectList from 'componentsAdmin/ProjectList/ProjectList';
import DetailQuotation from 'componentsAdmin/RverseAuction/DetailQuotation';

type Props = {};

const index = (props: Props) => {
  const [number, setNumber] = useState(0);
  // 지금 당장 리스트에서 모달창 못 띄워서 임으로 만든 state임 나중에 지워야 함
  const [isDetail, setIsDetail] = useState<boolean>(false);

  return (
    <Background>
      <Workspace setNumber={setNumber} />
      {number === 1 && <UserManagement />}
      {number === 2 && <CompanyManagement />}
      {number === 4 && <ProjectList />}
      {number === 3 && <DetailQuotation setIsDetail={setIsDetail} />}
    </Background>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
`;
