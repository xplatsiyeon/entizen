import styled from '@emotion/styled';
import CompanyManagement from 'componentsAdmin/Member/CompanyManagement';
import UserManagement from 'componentsAdmin/Member/UserManagement';
import Workspace from 'componentsAdmin/workspace';
import React, { useEffect, useLayoutEffect, useState } from 'react';
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
import AdminFAQList from 'componentsAdmin/AdminInformationNotify/AdminFAQ/AdminFAQList';
import AddAdminAccount from 'componentsAdmin/AdminAccount/AddAdminAccount';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import IncomeSimul from 'componentsAdmin/AdminDataDownload/IncomeSimul/IncomeSimul';
import Subsidy from 'componentsAdmin/AdminDataDownload/Subsidy/Subsidy';
import PreQuotationExel from 'componentsAdmin/AdminDataDownload/PreQuotationExel/PreQuotationExel';
import ProjectCompleteList from 'componentsAdmin/ProjectList/ProjectCompleteList';
import AdminDataExcel from 'componentsAdmin/AdminDataDownload/AdminDataExcel/AdminDataExcel';
import AdminAllAlarm from 'componentsAdmin/AdminAllAlarm/AdminAllAlarm';
import OutstandingWork from 'componentsAdmin/MainDashboard/OutstandingWork/OutstandingWork';
import ChargerGuideList from 'componentsAdmin/AdminGuideNotify/ChargerGuide/ChargerGuideList';
import PlatformGuideList from 'componentsAdmin/AdminGuideNotify/PlatformGuide/PlatformGuideList';
import PriceInformationList from 'componentsAdmin/AdminGuideNotify/PriceInformation/PriceInformationList';
import SubscribeGuideList from 'componentsAdmin/AdminGuideNotify/SubscribeGuide/SubscribeGuideList';
import Loader from 'components/Loader';

type Props = {};

const index = (props: Props) => {
  const router = useRouter();
  const accessToken = sessionStorage.getItem('ADMIN_ACCESS_TOKEN');
  // 리덕스로 페이지값 관리
  const { isAdminPage } = useSelector(
    (state: RootState) => state.adminPageNumber,
  );

  // 관리자 계정 초기 세팅값
  const [number, setNumber] = useState(isAdminPage);
  const [nowHeight, setNowHeight] = useState<number>();

  useEffect(() => {
    if (!accessToken) {
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    if (isAdminPage) {
      setNumber(isAdminPage);
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, [isAdminPage]);

  return (
    <>
      {accessToken && (
        <>
          <Background>
            <Workspace setNumber={setNumber} nowHeight={nowHeight} />
            {number === 1 && (
              <AddAdminAccount
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {number === 2 && <AdminAccountList setNowHeight={setNowHeight} />}
            {number === 3 && <ProjectSituation setNowHeight={setNowHeight} />}
            {number === 4 && <Statistics setNowHeight={setNowHeight} />}
            {number === 5 && <UserManagement setNowHeight={setNowHeight} />}
            {number === 6 && <CompanyManagement setNowHeight={setNowHeight} />}
            {number === 7 && <ReverseAuctionList setNowHeight={setNowHeight} />}
            {number === 8 && <ProjectList setNowHeight={setNowHeight} />}
            {number === 28 && (
              <ProjectCompleteList setNowHeight={setNowHeight} />
            )}
            {number === 9 && <ASDetail setNowHeight={setNowHeight} />}
            {number === 10 && <CommunicationList setNowHeight={setNowHeight} />}
            {number === 11 && <OneOnOneQuestion setNowHeight={setNowHeight} />}
            {number === 12 && <EntizenLibrary setNowHeight={setNowHeight} />}
            {number === 13 && (
              <PartnerProductsList setNowHeight={setNowHeight} />
            )}
            {number === 14 && (
              <AdminTermsList
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {number === 15 && (
              <AdminNoticeList
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {number === 16 && (
              <AdminBannerLIst
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {/* {number === 17 && <AdminGuideList setNowHeight={setNowHeight} />} */}
            {number === 18 && (
              <AdminFAQList setNowHeight={setNowHeight} setNumber={setNumber} />
            )}
            {number === 23 && <AdminElseList setNowHeight={setNowHeight} />}
            {number === 24 && (
              <ReverseAuctionSituation setNowHeight={setNowHeight} />
            )}
            {number === 25 && <ASSituation setNowHeight={setNowHeight} />}
            {number === 22 && (
              <IncomeSimul setNowHeight={setNowHeight} setNumber={setNumber} />
            )}
            {number === 26 && (
              <Subsidy setNowHeight={setNowHeight} setNumber={setNumber} />
            )}
            {number === 27 && (
              <PreQuotationExel
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {number === 29 && <AdminDataExcel setNowHeight={setNowHeight} />}
            {number === 30 && <OutstandingWork />}
            {number === 20 && <AdminAllAlarm setNowHeight={setNowHeight} />}
            {number === 31 && (
              <PlatformGuideList
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {number === 32 && (
              <SubscribeGuideList
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {number === 33 && (
              <ChargerGuideList
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
            {number === 34 && (
              <PriceInformationList
                setNowHeight={setNowHeight}
                setNumber={setNumber}
              />
            )}
          </Background>
        </>
      )}
    </>
  );
};

export default index;

const Background = styled.div`
  display: flex;
  justify-content: start;
  height: max-content;
`;
