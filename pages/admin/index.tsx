import styled from '@emotion/styled';
import CompanyManagement from 'componentsAdmin/Member/CompanyManagement';
import UserManagement from 'componentsAdmin/Member/UserManagement';
import Workspace from 'componentsAdmin/workspace';
import React, { useEffect, useState } from 'react';
import ProjectList from 'componentsAdmin/ProjectList/ProjectList';
import ReverseAuctionList from 'componentsAdmin/RverseAuction/ReverseAuctionList';
import ASDetail from 'componentsAdmin/AllAs/ASDetail';
import CommunicationList from 'componentsAdmin/Communication/CommunicationList';
import OneOnOneQuestion from 'componentsAdmin/Communication/OneOnOneQuestion';
import EntizenLibrary from 'componentsAdmin/EntizenLibrary/EntizenLibrary';
import PartnerProductsList from 'componentsAdmin/PartnerProducts/PartnerProductsList';
import Statistics from 'componentsAdmin/MainDashboard/Statistics';
import AdminElseList from 'componentsAdmin/AdminElse/AdminElseList';

import AdminAccountList from 'componentsAdmin/AdminAccount/AdminAccountList';
import ReverseAuctionSituation from 'componentsAdmin/MainDashboard/ReverseAuctionSituation/ReverseAuctionSituation';
import ASSituation from 'componentsAdmin/MainDashboard/ASSituation/ASSituation';
import ProjectSituation from 'componentsAdmin/MainDashboard/ProjectSituation/ProjectSituation';
import AdminTermsList from 'componentsAdmin/AdminInformationNotify/Adminterms/AdminTermsList';
import AdminNoticeList from 'componentsAdmin/AdminInformationNotify/AdminNotice/AdminNoticeList';
import AdminBannerLIst from 'componentsAdmin/AdminInformationNotify/AdminBanner/AdminBannerList';
import AdminGuideList from 'componentsAdmin/AdminInformationNotify/AdminGuide/AdminGuideList';
import AdminFAQList from 'componentsAdmin/AdminInformationNotify/AdminFAQ/AdminFAQList';
import AddAdminAccount from 'componentsAdmin/AdminAccount/AddAdminAccount';

type Props = {};

const index = (props: Props) => {
  // 관리자 계정 초기 세팅값
  const [number, setNumber] = useState(4);

  const [isDetail, setIsDetail] = useState(false);

  const localNumber = localStorage.getItem('number');

  useEffect(() => {
    if (localNumber) {
      setNumber(Number(localNumber));
    }
  }, []);

  return (
    <Background>
      <Workspace setNumber={setNumber} />
      {number === 1 && <AddAdminAccount />}
      {number === 2 && <AdminAccountList />}
      {number === 3 && <ProjectSituation />}
      {number === 4 && <Statistics />}
      {number === 5 && <UserManagement />}
      {number === 6 && <CompanyManagement />}
      {number === 7 && <ReverseAuctionList />}
      {number === 8 && <ProjectList />}
      {number === 9 && <ASDetail />}
      {number === 10 && <CommunicationList />}
      {number === 11 && <OneOnOneQuestion />}
      {number === 12 && <EntizenLibrary />}
      {number === 13 && <PartnerProductsList />}
      {number === 14 && <AdminTermsList />}
      {number === 15 && <AdminNoticeList />}
      {number === 16 && <AdminBannerLIst />}
      {number === 17 && <AdminGuideList />}
      {number === 18 && <AdminFAQList />}
      {number === 23 && <AdminElseList />}
      {number === 24 && <ReverseAuctionSituation />}
      {number === 25 && <ASSituation />}
    </Background>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
`;
