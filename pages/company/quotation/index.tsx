import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import BottomNavigation from 'components/BottomNavigation';
import Modal from 'components/Modal/Modal';
import History from 'componentsCompany/CompanyQuotation/History';
import RecieveRequest from 'componentsCompany/CompanyQuotation/RecieveRequest';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { redirectAction } from 'store/redirectUrlSlice';
import Header from '../../../componentsCompany/CompanyQuotation/Header';
import SentRequest from '../../../componentsCompany/CompanyQuotation/SentRequest';
import Tab from '../../../componentsCompany/CompanyQuotation/Tab';

type Props = { num?: number; now?: string };
interface QuotationRequest {
  changedDate: string;
  createdAt: string;
  etcRequest: string;
  expiredAt: string;
  installationAddress: string;
  installationLocation: string;
  installationPurpose: string;
  investRate: string;
  memberIdx: number;
  quotationRequestIdx: number;
  maskingInstallationAddress: string;
}

interface Components {
  [key: number]: JSX.Element;
}
export interface ReceivedQuotationRequests {
  badge: string;
  quotationRequest: QuotationRequest;
  companyMemberAdditionalInfo: [];
}
export interface ReceivedRequest {
  isSuccess: boolean;
  receivedQuotationRequests: ReceivedQuotationRequests[];
}

export type filterType = '마감일순 보기' | '상태순 보기' | '날짜순 보기';
// deadline: 마감일 | status: 상태순 | date: 날짜순
export const filterTypeEn = ['deadline', 'status', 'date'];

const TAG = 'company/quotation/index.tsx';
const CompanyQuotations = ({ num, now }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const [tabNumber, setTabNumber] = useState(0);
  const [searchWord, setSearchWord] = useState<string>('');
  // 현재 페이지 url이 /quotation boolean 판단
  const [nowUrl, setNowUrl] = useState<boolean>(false);
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');
  const keyword = useDebounce(searchWord, 2000);
  // 서브 카테고리 열렸는지 아닌지
  const [openSubLink, setOpenSubLink] = useState<boolean>(true);
  // 실시간 width 저장하는 state
  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);
  // 실시간으로 width 받아오는 함수
  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

  // api 호출
  const { data, isLoading, isError, error, refetch } =
    useQuery<ReceivedRequest>(
      'received-request',
      () =>
        isTokenGetApi(
          `/quotations/received-request?keyword=${keyword}&sort=${filterTypeEn[checkedFilterIndex]}`,
        ),
      {
        enabled: false,
      },
    );

  const components: Components = {
    0: (
      <RecieveRequest
        data={data!}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        checkedFilterIndex={checkedFilterIndex}
        setcheckedFilterIndex={setcheckedFilterIndex}
        checkedFilter={checkedFilter}
        setCheckedFilter={setCheckedFilter}
        keyword={keyword}
      />
    ),
    1: <SentRequest />,
    2: <History />,
  };

  // url에서 id 가져와서 tabNumber에 업데이트 해서 컴포넌트 바꿔줌
  useEffect(() => {
    if (router.query.id) {
      const num = Number(router.query.id);
      setTabNumber(num);
    } else if (router.pathname === `/company/quotation`) {
      setTabNumber(0);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    refetch();
  }, [checkedFilterIndex, keyword]);
  // 현재 페이지
  useEffect(() => {
    const now = router.route;
    if (now === `/company/quotation`) {
      setNowUrl(!nowUrl);
    }
  }, []);

  if (isError) {
    return (
      <Modal
        text="다시 시도해주세요"
        click={() => {
          router.push('/');
        }}
      />
    );
  }

  // console.log('🔥 api 데이터 확인 ~line  68 ' + TAG);
  // console.log(data);

  if (!accessToken && memberType !== 'COMPANY') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
    return (
      <WebBody>
        {/* 웹일때 보이는 헤더 */}
        <WebBox>
          <WebBuyerHeader
            setTabNumber={setTabNumber}
            tabNumber={tabNumber}
            num={num}
            now={now}
            openSubLink={openSubLink}
            setOpenSubLink={setOpenSubLink}
          />
          <Container>
            {/* 모바일탭  */}
            {nowWidth < 1200 && (
              <>
                <Header />
                <Tab tabNumber={tabNumber} setTabNumber={setTabNumber} />
              </>
            )}
            <CompanyRightMenu />
            <Mobile>{components[tabNumber]}</Mobile>
            {mobile && <BottomNavigation />}
          </Container>
        </WebBox>
        <WebFooter />
      </WebBody>
    );
  }
};

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-height: 350pt) {
    height: 100%;
    display: block;
  }
  @media (min-width: 900pt) {
    min-height: 100vh;
    justify-content: space-between;
  }
`;
const Container = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 350pt) {
    height: 500pt;
  }
  @media (min-width: 900pt) {
    padding: 0;
    margin-top: 60pt;
  }
`;
const WebBox = styled.div``;
const Mobile = styled.div`
  @media (max-width: 899.25pt) {
    padding: 0 15pt;
  }
`;

export default CompanyQuotations;
