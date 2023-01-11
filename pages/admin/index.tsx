import styled from '@emotion/styled';
import CompanyManagement from 'componentsAdmin/Member/CompanyManagement';
import UserManagement from 'componentsAdmin/Member/UserManagement';
import Workspace from 'componentsAdmin/workspace';
import React, { useCallback, useEffect, useState } from 'react';
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
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {};

const index = (props: Props) => {
  // 리덕스로 페이지값 관리
  const { isAdminPage } = useSelector(
    (state: RootState) => state.adminPageNumber,
  );

  console.log('💔 isAdminPage 🎀', isAdminPage);

  // 관리자 계정 초기 세팅값
  const [number, setNumber] = useState(isAdminPage);

  const [isDetail, setIsDetail] = useState(false);

  const [nowHeight, setNowHeight] = useState<number>();

  const sessionNumber = sessionStorage.getItem('number');

  const router = useRouter();

  console.log('🎀 인덱스임 number 🎀', number);
  // console.log('🎀 인덱스임 sessionNumber 🎀', sessionNumber);

  const accessToken = sessionStorage.getItem('ADMIN_ACCESS_TOKEN');

  useEffect(() => {
    if (!accessToken) {
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    if (isAdminPage) {
      setNumber(isAdminPage);
      setNowHeight(window.document.documentElement.scrollHeight);
      // unmount 됐을때 초기값 넣어줌
      // return () => {
      //   sessionStorage.setItem('number', '4');
      //   setNowHeight(window.document.documentElement.scrollHeight);
      // };
    }
  }, [isAdminPage]);

  return (
    <Background>
      <Workspace setNumber={setNumber} nowHeight={nowHeight} />
      {number === 1 && (
        <AddAdminAccount setNowHeight={setNowHeight} setNumber={setNumber} />
      )}
      {number === 2 && <AdminAccountList setNowHeight={setNowHeight} />}
      {number === 3 && <ProjectSituation setNowHeight={setNowHeight} />}
      {number === 4 && <Statistics setNowHeight={setNowHeight} />}
      {number === 5 && <UserManagement setNowHeight={setNowHeight} />}
      {number === 6 && <CompanyManagement setNowHeight={setNowHeight} />}
      {number === 7 && <ReverseAuctionList setNowHeight={setNowHeight} />}
      {number === 8 && <ProjectList setNowHeight={setNowHeight} />}
      {number === 9 && <ASDetail setNowHeight={setNowHeight} />}
      {number === 10 && <CommunicationList setNowHeight={setNowHeight} />}
      {number === 11 && <OneOnOneQuestion setNowHeight={setNowHeight} />}
      {number === 12 && <EntizenLibrary setNowHeight={setNowHeight} />}
      {number === 13 && <PartnerProductsList setNowHeight={setNowHeight} />}
      {number === 14 && (
        <AdminTermsList setNowHeight={setNowHeight} setNumber={setNumber} />
      )}
      {number === 15 && (
        <AdminNoticeList setNowHeight={setNowHeight} setNumber={setNumber} />
      )}
      {number === 16 && (
        <AdminBannerLIst setNowHeight={setNowHeight} setNumber={setNumber} />
      )}
      {number === 17 && <AdminGuideList setNowHeight={setNowHeight} />}
      {number === 18 && (
        <AdminFAQList setNowHeight={setNowHeight} setNumber={setNumber} />
      )}
      {number === 23 && <AdminElseList setNowHeight={setNowHeight} />}
      {number === 24 && <ReverseAuctionSituation setNowHeight={setNowHeight} />}
      {number === 25 && <ASSituation setNowHeight={setNowHeight} />}
    </Background>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
  height: max-content;
`;
