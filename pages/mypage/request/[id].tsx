import styled from '@emotion/styled';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import EstimateContainer from 'components/mypage/request/estimateContainer';
import MypageHeader from 'components/mypage/request/header';
import SubscriptionProduct from 'components/mypage/request/subscriptionProduct';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import CommunicationBox from 'components/CommunicationBox';
import WebHeader from 'componentsWeb/WebHeader';
import WebFooter from 'componentsWeb/WebFooter';
import RequestMain from 'components/mypage/request/requestMain';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';

export interface Chargers {
  kind: string;
  standType: string;
  channel: string;
  count: number;
}
export interface PreQuotations {
  companyLogoImageUrl: string;
  companyName: string;
  preQuotationIdx: number;
  subscribePricePerMonth: string;
}
export interface QuotationRequests {
  quotationStatus: string;
  installationAddress: string;
  badge: string;
  subscribeProduct: string;
  subscribePeriod: number;
  investRate: string;
  chargers: Chargers[];
  installationLocation: string;
  installationPurpose: string;
  etcRequest: string;
  totalPreQuotationCount: number;
  preQuotations: PreQuotations[];
}
export interface QuotationRequestsResponse {
  isSuccess: boolean;
  receivedQuotationRequest: QuotationRequests;
}

const TAG = '/page/mypage/request/[id].tsx';
const Mypage1_3 = ({}: any) => {
  const router = useRouter();
  const routerId = router?.query?.id!;
  const { data, isError, isLoading, refetch } =
    useQuery<QuotationRequestsResponse>(
      'mypage/request/id',
      () => isTokenGetApi(`/quotations/received-request/${routerId}`),
      {
        enabled: router.isReady,
      },
    );
  // 모달 on / off
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 모달 왼쪽, 오른쪽 버튼 핸들러
  const backPage = () => router.back();
  const handleOnClick = () => setModalOpen(!modalOpen);

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
  if (isLoading) {
    return <Loader />;
  }

  console.log(TAG + '⭐️ ~line 53 ~ api data 확인');
  console.log(data);

  return (
    <>
      {/* 모달 */}
      {modalOpen && (
        <TwoBtnModal
          exit={handleOnClick}
          text="견적을 취소하시겠습니까?"
          leftBtnText="취소하기"
          leftBtnColor={colors.orange}
          rightBtnText="아니오"
          rightBtnColor={colors.main2}
          leftBtnControl={backPage}
          rightBtnControl={handleOnClick}
        />
      )}
      <Body>
        <WebHeader num={0} now={'mypage'} />
        <Inner>
          <FlexBox>
            <Wrap1>
              <RequestMain page={0} />
            </Wrap1>
            <Wrap2>
              <MypageHeader
                title="내 견적서"
                cancel="견적 취소"
                back={true}
                handleOnClick={handleOnClick}
              />
              {/* request 1-3 */}
              <EstimateContainer data={data!} />
              <SubscriptionProduct data={data!} />
              <TextBox>
                <div>선택하기 어려우신가요?</div>
                <CommunicationBox
                  text="엔티즌과 소통하기"
                  clickHandler={() => router.push('/chatting/1')}
                />
              </TextBox>
            </Wrap2>
          </FlexBox>
        </Inner>
        <WebFooter />
      </Body>

      {/* request 2-3 */}
      {/* <Mypage2_1 /> */}
    </>
  );
};

export default Mypage1_3;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 900pt;
  margin: 45.75pt auto;

  @media (max-width: 899pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0 auto;
  }
`;

const FlexBox = styled.div`
  display: flex;
  position: relative;
`;

const Wrap1 = styled.div`
  //width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 6pt;
  height: 100%;

  @media (max-width: 899pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899pt) {
    padding-left: 0pt;
  }
`;

const TextBox = styled.div`
  width: 100%;
  margin-bottom: 9pt;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    font-weight: 500;
    font-size: 12pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
  @media (max-width: 899pt) {
    padding-top: 75pt;
  }
`;
