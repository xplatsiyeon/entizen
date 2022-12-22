import styled from '@emotion/styled';
import CompanyManagement from 'componentsAdmin/Member/CompanyManagement';
import UserManagement from 'componentsAdmin/Member/UserManagement';
import Workspace from 'componentsAdmin/workspace';
import React, { useState } from 'react';
import ProjectList from 'componentsAdmin/ProjectList/ProjectList';
import ReverseAuctionList from 'componentsAdmin/RverseAuction/ReverseAuctionList';
import ASDetail from 'componentsAdmin/AllAs/ASDetail';
import CommunicationList from 'componentsAdmin/Communication/CommunicationList';
import OneOnOneQuestion from 'componentsAdmin/Communication/OneOnOneQuestion';

type Props = {};

const index = (props: Props) => {
  const [number, setNumber] = useState(0);

  const [isDetail, setIsDetail] = useState(false);
  console.log('number', number);
  return (
    <Background>
      <Workspace setNumber={setNumber} />
      {number === 1 && <UserManagement />}
      {number === 2 && <CompanyManagement />}
      {number === 3 && <ReverseAuctionList />}
      {number === 4 && <ProjectList />}
      {number === 5 && <ASDetail />}
      {number === 6 && <CommunicationList />}
      {number === 7 && <OneOnOneQuestion />}
    </Background>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
`;
