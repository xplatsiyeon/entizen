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
import EntizenLibrary from 'componentsAdmin/EntizenLibrary/EntizenLibrary';
import PartnerProductsList from 'componentsAdmin/PartnerProducts/PartnerProductsList';

type Props = {};

const index = (props: Props) => {
  const [number, setNumber] = useState(0);

  const [isDetail, setIsDetail] = useState(false);
  console.log('number', number);
  return (
    <Background>
      <Workspace setNumber={setNumber} />
      {number === 1 && <div>관리자 등록</div>}
      {number === 2 && <div>관리자 리스트 조회</div>}
      {number === 3 && <div>프로젝트 현황</div>}
      {number === 4 && <div>통계</div>}
      {number === 5 && <UserManagement />}
      {number === 6 && <CompanyManagement />}
      {number === 7 && <ReverseAuctionList />}
      {number === 8 && <ProjectList />}
      {number === 9 && <ASDetail />}
      {number === 10 && <CommunicationList />}
      {number === 11 && <OneOnOneQuestion />}
      {number === 12 && <EntizenLibrary />}
    </Background>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
`;
