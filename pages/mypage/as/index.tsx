import styled from '@emotion/styled';
import { isTokenGetApi, isTokenPostApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import AsRequest from 'components/mypage/as/AsRequest';
import AsRequestFooter from 'components/mypage/as/AsRequestFooter';
import AsRequestPartner from 'components/mypage/as/AsRequestPartner';
import AsWriteReview from 'components/mypage/as/AsWriteReview';
import RequestMain from 'components/mypage/request/requestMain';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { redirectAction } from 'store/redirectUrlSlice';
import colors from 'styles/colors';
export interface File {
  createdAt: string;
  afterSalesServiceRequestFileIdx: number;
  originalName: string;
  url: string;
  size: number;
  afterSalesServiceIdx: number;
}
export interface AfterSalesServiceReview {
  afterSalesServiceReviewIdx: number;
  attentivenessPoint: number;
  quicknessPoint: number;
  professionalismPoint: number;
  satisfactionPoint: number;
  averagePoint: string;
  opinion: string;
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
                member: {
                  memberIdx: number;
                  name: string;
                  phone: string;
                };
              };
            };
          };
        };
        afterSalesServiceReview: AfterSalesServiceReview;
        afterSalesServiceRequestFiles: File[];
        afterSalesServiceCompletionFiles: File[];
      };
      badge: string;
    };
  };
}

const asNumber = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const routerId = router?.query?.afterSalesServiceIdx;
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);
  const [isReview, setIsReview] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  console.log(routerId);
  // --------------------- AS detail API ------------------------------
  const { data, isLoading, isError, error, refetch } =
    useQuery<AsDetailReseponse>(
      'as-detail',
      () => isTokenGetApi(`/after-sales-services/${routerId}`),
      {
        onSuccess: (res) => {
          console.log('???????', res);
        },
        onError: (res) => {
          console.log('???????', res);
        },
        enabled: router.isReady && accessToken ? true : false,
      },
    );

  useEffect(() => {
    console.log('?????????', routerId);
    if (routerId) {
      refetch();
    }
  }, [routerId]);

  const {
    mutate: completeMutate,
    isLoading: completeIsLoading,
    isError: completeIsError,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('AS 완료 되었습니다.');
    },
    onError: () => {
      setIsModal(true);
      setModalMessage('완료가 실패했습니다. 다시 시도해주세요.');
    },
  });
  // 모달 온클릭
  const handleModal = () => {
    if (modalMessage === 'AS 완료 되었습니다.') {
      setIsReview(true);
      setIsModal(false);
    } else if (modalMessage === '소중한 의견 감사합니다.') {
      setIsModal(false);
      router.replace({
        pathname: '/mypage',
        query: {
          id: '2',
        },
      });
    } else {
      setIsModal(false);
    }
  };

  const handleClick = (st: string) => {
    router.push({
      pathname: `/mypage/as/${st}`,
      query: {
        afterSalesServiceIdx:
          data?.data?.afterSalesService?.afterSalesService
            ?.afterSalesServiceIdx,
      },
    });
  };
  // 완료하기 클릭
  const onClickCompleteBtn = () => {
    completeMutate({
      url: `/after-sales-services/${routerId}/agreement`,
      data: {},
    });
  };

  if (isLoading || completeIsLoading) {
    return <Loader />;
  }
  if (isError || completeIsError) {
    // console.log(error);
  }
  //  // console.log('🔥 as 상세페이지 데이터 확인 ~line 134 ' + TAG);
  // console.log(data);

  // console.log('rofsdfsd', router);
  // console.log('isReview==>', isReview);
  // console.log('mobile==>', mobile);

  if (!accessToken && memberType !== 'USER') {
    dispatch(redirectAction.addUrl(router.asPath));
    router.push('/signin');
  } else {
    return (
      <Body>
        {isModal && <Modal text={modalMessage} click={handleModal} />}
        {/* 피그마 마이페이지/A/S/4. 마이페이지 링크바 A/S 부분을 표시하기 위해서 num={2}를 넘긴다. (내 견적서는 0).
          const components: Components = {
          0: <WebEstimate/>,  
          2: <AsIndex />,
          }; num, page는 이 부분의 인덱스 넘버.
        */}
        <WebHeader num={2} now={'mypage'} sub={'mypage'} />
        <Inner>
          <FlexBox>
            <Wrap1 isReview={isReview}>
              {/* 회원 메뉴에 A/S 카테고리를 펼치기 위해 page={2}를 넘긴다. (내 견적서는 0).
                [id].tsx에서 리스트 호출하고 그 리스트를 RequestMain 컴포넌트에 넘겨줘야함,
              */}
              {!isReview && <RequestMain page={2} />}
            </Wrap1>
            <Wrap2>
              {/* AS 상단 부분 */}
              {!isReview && !mobile && <AsRequest data={data!} />}
              {mobile && <AsRequest data={data!} />}

              {/* 하단 부분 내용 */}
              {isReview ? (
                <AsWriteReview
                  id={routerId}
                  setIsModal={setIsModal}
                  setModalMessage={setModalMessage}
                />
              ) : (
                <AsRequestPartner data={data!} />
              )}
              <Wrap3>
                {/* 파트너와 소통하기 문구 */}
                {!isReview && (
                  <Footer>
                    <AsRequestFooter
                      id={
                        data?.data?.afterSalesService?.afterSalesService
                          ?.project?.finalQuotation?.preQuotation?.member
                          .memberIdx!
                      }
                    />
                  </Footer>
                )}
                {/* 수정하기 */}
                {!isReview &&
                  data?.data.afterSalesService.badge.includes('요청') && (
                    <Btn onClick={() => handleClick('requestAS')}>
                      <span>수정하기</span>
                    </Btn>
                  )}
                {/* A/S 완료하기 */}
                {!isReview &&
                  data?.data.afterSalesService.badge.includes('대기') && (
                    <BtnBox onClick={onClickCompleteBtn}>
                      <p className="text">A/S 완료하기</p>
                    </BtnBox>
                  )}
                {/* 리뷰 작성 */}
                {!isReview &&
                  data?.data.afterSalesService.badge.includes('A/S') &&
                  !data?.data.afterSalesService.afterSalesService
                    .afterSalesServiceReview && (
                    <Btn
                      className="isColor"
                      onClick={() => {
                        setIsReview(true);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <span>A/S 리뷰하기</span>
                    </Btn>
                  )}
                {/* 내 리뷰 보기 */}
                {!isReview &&
                  data?.data.afterSalesService.badge.includes('A/S') &&
                  data?.data.afterSalesService.afterSalesService
                    .afterSalesServiceReview && (
                    <Btn
                      className="review"
                      onClick={() => handleClick('myReview')}
                    >
                      <span>내 리뷰 보기</span>
                    </Btn>
                  )}
              </Wrap3>
            </Wrap2>
          </FlexBox>
        </Inner>
        <WebFooter />
      </Body>
    );
  }
};

export default asNumber;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
  margin: 0 auto;
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

  margin: 60pt auto 91.5pt auto;

  @media (max-width: 899.25pt) {
    width: 100%;
    position: relative;
    margin: 0 auto;
  }
`;
const FlexBox = styled.div`
  display: flex;
  position: relative;
`;
const Wrap1 = styled.div<{ isReview: boolean }>`
  display: ${({ isReview }) => isReview && 'none'};
  width: 255pt;
  border: 1px solid #e9eaee;
  border-radius: 12pt;
  height: 100%;

  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Wrap2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 60pt;

  @media (max-width: 899.25pt) {
    padding-left: 0pt;
  }
`;
const Wrap3 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  @media (max-width: 899.25pt) {
    flex-direction: column;
    height: auto;
  }
`;
const Btn = styled.button`
  position: relative;
  padding: 15pt 0;
  margin-top: 30pt;
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
  cursor: pointer;
  &.review {
    cursor: pointer;
  }
  &.isColor {
    cursor: pointer;
    color: white;
    background-color: #5221cb;
    border: none;
  }

  @media (max-width: 899.25pt) {
    margin-top: 45pt;
    margin-bottom: 36pt;
  }
`;
const Footer = styled.div`
  padding-top: 45pt;
`;
const BtnBox = styled.button`
  width: 100%;
  margin-top: 30pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  background-color: ${colors.main1};
  border-radius: 6pt;
  cursor: pointer;
  .text {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
  }
  @media (max-width: 899.25pt) {
    padding-bottom: 39pt;
    border-radius: 0pt;
  }
`;
