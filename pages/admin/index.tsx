import styled from '@emotion/styled';
import CompanyManagement from 'componentsAdmin/Member/CompanyManagement';
import UserManagement from 'componentsAdmin/Member/UserManagement';
import Workspace from 'componentsAdmin/workspace';
import React, { useState } from 'react';
import ProjectList from 'componentsAdmin/ProjectList/ProjectList';
import ReverseAuctionList from 'componentsAdmin/RverseAuction/ReverseAuctionList';
import ProjectDetail from 'componentsAdmin/ProjectList/ProjectDetail';
import ASDetail from 'componentsAdmin/AllAs/ASDetail';

type Props = {};

const index = (props: Props) => {
  const [number, setNumber] = useState(0);

  const [isDetail, setIsDetail] = useState(false);
  return (
    <Background>
      <Workspace setNumber={setNumber} />
      {number === 1 && <UserManagement />}
      {number === 2 && <CompanyManagement />}
      {number === 3 && <ReverseAuctionList />}
      {number === 4 && <ProjectList />}
      {number === 5 && <ASDetail />}
      {/* {number === 4 && (
        <ProjectDetail setIsDetail={setIsDetail} projectIdx={25} />
      )} */}
    </Background>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
`;
