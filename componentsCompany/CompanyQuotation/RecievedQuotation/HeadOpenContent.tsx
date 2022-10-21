import React, { useEffect } from 'react';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import UpArrow from 'public/guide/up_arrow.svg';
import DownArrow from 'public/guide/down_arrow.svg';
import Image from 'next/image';
import { useState } from 'react';
import colors from 'styles/colors';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import MypageHeader from 'components/SignUp/header';
import CommonBtns from 'components/mypage/as/CommonBtns';
import Btn from 'components/SignUp/button';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useMutation, useQuery } from 'react-query';
import { isTokenApi } from 'api';
import { GetServerSideProps } from 'next';
import { type } from 'os';
import { convertKo, HandleColor } from 'utils/changeValue';
import { QuotationsDetail, quotationsDetail } from 'api/company/quotations';
import {
  InstallationPurposeType,
  InstallationPurposeTypeEn,
  location,
  locationEn,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';

type Props = {};
interface Components {
  [key: number]: JSX.Element;
}
export interface reviewType {
  productImg: any;
  createDt: number;
}

interface Response {
  data: QuotationsDetail;
}
type ChargeType = '' | '구매자 자율' | '운영사업자 입력';
type ManufacturingCompany =
  | ''
  | 'LECS-007ADE'
  | 'LECS-006ADE'
  | 'LECS-005ADE'
  | 'LECS-004ADE';
export interface Chargers {
  chargeType: ChargeType;
  fee: number;
  manufacturingCompany: ManufacturingCompany;
  chargeFeatures: string;
  chargeImage: [
    {
      url: string;
      size: number;
      originalName: string;
    },
  ];
  chargeFile: [
    {
      url: string;
      size: number;
      originalName: string;
    },
  ];
}
// 임시값
const target = 3;
const TAG =
  'componentsCompany/CompanyQuotation/RecivedQuotation/HeadOpenContent';
const HeadOpenContent = ({}: Props) => {
  const router = useRouter();
  const routerId = router?.query?.id!;
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  // step 숫자
  const [tabNumber, setTabNumber] = useState<number>(-1);
  // button on off
  const [canNext, SetCanNext] = useState<boolean>(false);
  // 첫스탭 상태값
  const [monthlySubscribePrice, setMonthleSubscribePrice] =
    useState<string>('');
  const [constructionPeriod, setConstructionPeriod] = useState<string>('');
  const [firstPageTextArea, setFirstPageTextArea] = useState<string>('');
  // 모달
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  //  api 요청
  const { data, isError, isLoading, refetch } = useQuery<Response>(
    'receivedRequest/id',
    () => quotationsDetail(routerId),
    // () =>
    //   isTokenApi({
    //     method: 'GET',
    //     endpoint: `/quotations/received-request/${routerId}`,
    //   }),

    {
      enabled: router.isReady,
    },
  );

  // const {
  //   receivedQuotationRequest: {
  //     badge,
  //     chargers, // 영->한 변환 필요
  //     etcRequest,
  //     installationAddress,
  //     installationLocation, // 영->한 변환 필요
  //     installationPurpose, // 영->한 변환 필요
  //     investRate, // 곱하기 100
  //     subscribePeriod,
  //     subscribeProduct, // 영->한 변환 필요
  //   },
  // } = data?.data.receivedQuotationRequest;

  // step별 컴포넌트
  const components: Components = {
    // 기본
    0: (
      <FirstStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        monthlySubscribePrice={monthlySubscribePrice}
        setMonthleSubscribePrice={setMonthleSubscribePrice}
        constructionPeriod={constructionPeriod}
        setConstructionPeriod={setConstructionPeriod}
        firstPageTextArea={firstPageTextArea}
        setFirstPageTextArea={setFirstPageTextArea}
        canNext={canNext}
        SetCanNext={SetCanNext}
      />
    ),
    // 스텝 2
    1: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        StepIndex={0}
        maxIndex={target}
      />
    ),
    // 스텝 3
    2: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        StepIndex={1}
        maxIndex={target}
      />
    ),
    // 스텝 4
    3: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        StepIndex={2}
        maxIndex={target}
      />
    ),
    // 스텝 5
    4: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        StepIndex={3}
        maxIndex={target}
      />
    ),
    // 스텝 6
    5: (
      <SecondStep
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        canNext={canNext}
        SetCanNext={SetCanNext}
        StepIndex={4}
        maxIndex={target}
      />
    ),
  };
  const handleClick = () => setOpen(!open);
  const handleBackClick = () => router.back();
  const changeRequest = () => setTabNumber(tabNumber + 1);
  const handleModalOpen = () => setModalOpen(true);

  useEffect(() => {
    if (router.pathname.includes('1-1')) setText('접수요청 D-3');
    if (router.pathname.includes('asGoReview')) setText('완료대기');
    if (router.pathname.includes('asReviewEnd')) setText('A/S완료');
  }, [router]);

  return (
    <>
      {modalOpen && (
        <TwoBtnModal
          text={
            '지금 나가시면\n작성하신 내용이 삭제됩니다.\n그래도 괜찮으시겠습니까?'
          }
          leftBtnText={'그만하기'}
          rightBtnText={'계속 작성하기'}
          leftBtnColor={'#A6A9B0'}
          rightBtnColor={'#5221CB'}
          leftBtnControl={() => router.back()}
          rightBtnControl={() => setModalOpen(false)}
          exit={() => setModalOpen(false)}
        />
      )}
      {tabNumber === -1 && (
        <MypageHeader
          back={true}
          title={'받은 요청'}
          handleBackClick={handleBackClick}
        />
      )}
      {tabNumber >= 0 && (
        <MypageHeader
          back={true}
          title={'가견적 작성'}
          handleBackClick={handleModalOpen}
        />
      )}
      <Wrapper>
        <ItemButton onClick={handleClick}>
          <StoreName>
            <CommonBtns
              text={data?.data.receivedQuotationRequest.badge!}
              backgroundColor={HandleColor(
                data?.data.receivedQuotationRequest.badge!,
              )}
            />
            <div>
              <h1>
                {data?.data.receivedQuotationRequest.installationAddress!}
              </h1>
              {open ? (
                <ArrowImg>
                  <Image src={DownArrow} alt="down_arrow" layout="fill" />
                </ArrowImg>
              ) : (
                <ArrowImg>
                  <Image src={UpArrow} alt="up_arrow" layout="fill" />
                </ArrowImg>
              )}
            </div>
          </StoreName>
        </ItemButton>
        {/* Open */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Contents>
              <div className="text-box">
                <span className="name">구독상품</span>
                <span className="text">
                  {data &&
                    convertKo(
                      subscribeType,
                      subscribeTypeEn,
                      data?.data.receivedQuotationRequest.subscribeProduct!,
                    )}
                </span>
              </div>
              <div className="text-box">
                <span className="name">구독기간</span>
                <span className="text">
                  {data?.data.receivedQuotationRequest.subscribePeriod!}개월
                </span>
              </div>
              <div className="text-box">
                <span className="name">수익지분</span>
                <span className="text">
                  {Number(data?.data.receivedQuotationRequest.investRate!) *
                    100}{' '}
                  %
                </span>
              </div>
              {data?.data.receivedQuotationRequest.chargers!?.map((e, i) => (
                <div className="text-box">
                  <span className="name">충전기 종류 및 수량</span>
                  <span className="text">
                    100 kW 충전기
                    <br />
                    :벽걸이, 싱글, 3 대
                  </span>
                </div>
              ))}

              <div className="text-box">
                <span className="name">충전기 설치 위치</span>
                <span className="text">
                  {data &&
                    convertKo(
                      location,
                      locationEn,
                      data?.data.receivedQuotationRequest.installationLocation!,
                    )}
                </span>
              </div>
              <div className="text-box">
                <span className="name">충전기 설치 목적</span>
                <span className="text">
                  {data &&
                    convertKo(
                      InstallationPurposeType,
                      InstallationPurposeTypeEn,
                      data?.data.receivedQuotationRequest.installationPurpose!,
                    )}
                </span>
              </div>
              <div className="text-box">
                <span className="name">기타 요청사항</span>
                <span className="text">
                  {data?.data.receivedQuotationRequest.etcRequest}
                </span>
              </div>
            </Contents>
          </List>
        </Collapse>
      </Wrapper>
      {/* 가견적 작성하기 부분 */}
      {tabNumber === -1 && (
        <Btn
          isClick={true}
          handleClick={changeRequest}
          text={'가견적 작성하기'}
          paddingOn={true}
        />
      )}
      {tabNumber >= 0 && (
        <>
          <TabBox>
            {Object.keys(components).map((tab, index) => (
              <React.Fragment key={index}>
                {index <= target && (
                  <TabLine
                    idx={index.toString()}
                    num={tabNumber.toString()}
                    key={tab}
                    // 테스트용
                    // onClick={() => setTabNumber(index)}
                  />
                )}
              </React.Fragment>
            ))}
          </TabBox>
          {components[tabNumber]}
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: block;
  box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
  padding-left: 15pt;
  padding-right: 15pt;
  @media (max-width: 899pt) {
    display: flex;
    flex-direction: column;
  }
`;

const Badge = styled.span`
  background: ${colors.orange};
  color: ${colors.lightWhite};
  border-radius: 12pt;
  padding: 4.5pt 7.5pt;
  font-weight: 500;
  font-size: 9pt;
  line-height: 9pt;
`;

const ItemButton = styled(ListItemButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  & div {
    margin: 0;
  }
`;
const StoreName = styled(ListItemText)`
  padding-top: 16.5pt;
  padding-bottom: 16.5pt;
  margin-top: 4.5pt;
  & div {
    margin-top: 12pt;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }
  & div > h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & div > img {
    display: flex;
    align-items: center;
  }
  & p {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const ArrowImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 6.5pt;
  width: 18pt;
  height: 18pt;
`;
const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 21pt;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }
`;

const TabBox = styled.div`
  z-index: 1;
  //display:flex;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 30pt;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 0;

  @media (max-width: 899pt) {
    display: flex;
    position: relative;
    gap: 0.2pt;
  }
`;
const TabLine = styled.div<{ idx: string; num: string }>`
  border-style: solid;
  border-bottom-width: 3pt;
  border-color: ${({ idx, num }) => (idx <= num ? colors.main : colors.gray4)};
  border-radius: 2px;

  width: calc((100% - 15pt) / 6);
  display: inline-block;
  margin-right: 3pt;
  &:nth-last-of-type(1) {
    margin-right: 0;
  }

  @media (max-width: 899pt) {
    display: block;
    width: 100%;
  }
`;

export default HeadOpenContent;
