import styled from '@emotion/styled';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';
import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import RequestMain from 'components/mypage/request/requestMain';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
export interface File {
  createdAt: string;
  afterSalesServiceRequestFileIdx: number;
  originalName: string;
  url: string;
  size: number;
  afterSalesServiceIdx: number;
}
export interface AsDetailReseponse {
  isSuccess: true;
  data: {
    afterSalesService: {
      afterSalesService: {
        createdAt: string;
        afterSalesServiceIdx: number;
        requestTitle: string;
        requestContent: string;
        acceptanceContent: string | null;
        acceptanceDate: string | null;
        afterSalesServiceResultContent: string | null;
        afterSalesServiceResultDate: string | null;
        afterSalesServiceCompletionConsentStatus: boolean;
        projectIdx: number;
        project: {
          projectIdx: number;
          finalQuotation: {
            finalQuotationIdx: number;
            preQuotation: {
              preQuotationIdx: number;
              member: {
                memberIdx: number;
                name: string;
                phone: string;
                companyMemberAdditionalInfo: {
                  companyMemberAdditionalInfoIdx: number;
                  companyName: string;
                  managerEmail: string;
                };
              };
              quotationRequest: {
                quotationRequestIdx: number;
                installationAddress: string;
              };
            };
          };
        };
        afterSalesServiceReview: boolean;
        afterSalesServiceRequestFiles: File[];
        afterSalesServiceCompletionFiles: [];
      };
      badge: string;
    };
  };
}

const TAG = 'pages/mypage/as/index.tsx';
const asNumber = () => {
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;
  const { data, isLoading, isError, error } = useQuery<AsDetailReseponse>(
    'as-detail',
    () => isTokenGetApi(`/after-sales-services/${routerId}`),
    {
      enabled: router.isReady,
    },
  );

  const handleClick = (st: string) => {
    // router.push(`/mypage/as/${st}`);
    router.push({
      pathname: `/mypage/as/${st}`,
      query: {
        afterSalesServiceIdx:
          data?.data?.afterSalesService?.afterSalesService
            ?.afterSalesServiceIdx,
      },
    });
  };

  // 버튼 태크
  const makeBtn = (text: string, query: string, className?: string) => {
    return (
      <Btn
        className={className ? className : undefined}
        onClick={() => handleClick(query)}
      >
        <span>{text}</span>
      </Btn>
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    console.log(error);
  }
  console.log('🔥 as 상세페이지 데이터 확인 ~line 134 ' + TAG);
  console.log(data);

  return (
    <Body>
      {/* 피그마 마이페이지/A/S/4. 마이페이지 링크바 A/S 부분을 표시하기 위해서 num={2}를 넘긴다. (내 견적서는 0).
          const components: Components = {
          0: <WebEstimate/>,  
          2: <AsIndex />,
          }; num, page는 이 부분의 인덱스 넘버.
        */}
      <WebHeader num={2} now={'mypage'} />
      <Inner>
        <FlexBox>
          <Wrap1>
            {/* 회원 메뉴에 A/S 카테고리를 펼치기 위해 page={2}를 넘긴다. (내 견적서는 0).
                [id].tsx에서 리스트 호출하고 그 리스트를 RequestMain 컴포넌트에 넘겨줘야함,
              */}
            <RequestMain page={2} />
          </Wrap1>
          <Wrap2>
            {/* AS 상단 부분 */}
            <AsRequest data={data!} />
            {/* 하단 부분 내용 */}
            <AsRequestPartner data={data!} />
            <Wrap3>
              <AsRequestFooter />
              {/* {btnTag} */}
              {makeBtn('수정하기', 'requestAS')}
              {/* {makeBtn('A/S 완료하기', 'writeReview', 'as')} */}
              {/* {makeBtn('리뷰보기', 'myReview', 'as')} */}
            </Wrap3>
          </Wrap2>
        </FlexBox>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default asNumber;

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
  width: 255pt;
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

const Wrap3 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  @media (max-width: 899pt) {
    flex-direction: column;
    height: auto;
  }
`;

const Btn = styled.button`
  position: relative;
  padding: 15pt 0;
  margin-top: 40pt;
  margin-bottom: 15pt;
  margin-left: 15pt;
  margin-right: 15pt;
  color: #a6a9b0;
  border-radius: 6pt;
  border: 1px solid #e2e5ed;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  background: none;

  &.as {
    color: white;
    background-color: #5221cb;
    border: none;
  }

  @media (max-width: 899pt) {
    margin-top: 45pt;
    margin-bottom: 36pt;
  }
`;
