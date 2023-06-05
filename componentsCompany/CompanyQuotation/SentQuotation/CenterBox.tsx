import styled from '@emotion/styled';
import QuotationModal from 'components/Modal/QuotationModal';
import ReplacePhotoModal from 'components/Modal/ReplacePhotoModal';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import React, { useState } from 'react';
import colors from 'styles/colors';
import {
  SentRequestResponse,
  SpotDataResponse,
} from './SentProvisionalQuoatation';

type Props = {
  spotData: SpotDataResponse;
  data: SentRequestResponse;
};

const TAG = 'componentsCompany/CompanyQuotation/SentQuotation/CenterBox.tsx';
// 날짜 정하기
const CenterBox = ({ spotData, data }: Props) => {
  // console.log(TAG + '🔥 ~line 33 data 확인');
  // console.log(spotData);

  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [checkFlow, setCheckFlow] = useState<boolean>(true);

  return (
    <>
      {modalOpen && (
        <ReplacePhotoModal
          isModal={modalOpen}
          setIsModal={setModalOpen}
          spotData={spotData}
        />
      )}
      <Wrapper>
        <DownArrowBox>
          <Image src={DoubleArrow} alt="double-arrow" />
        </DownArrowBox>

        {/* ------------- 현장실사 가능 날짜 도착 알람 -------------*/}
        {spotData?.data?.hasReceivedSpotInspectionDates === true &&
          spotData?.data?.spotInspection?.isNewPropose === false &&
          spotData?.data?.spotInspection?.isConfirmed === false && (
            <>
              <ReservationDate>
                <div className="text">현장실사 가능 날짜가 도착했습니다.</div>
                <div className="btnBox">
                  <div
                    className="btn right"
                    onClick={() =>
                      router.push({
                        pathname: '/company/datePick',
                        query: {
                          preQuotation:
                            spotData.data.spotInspection.preQuotationIdx,
                        },
                      })
                    }
                  >
                    달력으로 확인하기
                  </div>
                  <div className="btn left" onClick={() => setModalOpen(true)}>
                    사진으로 대체하기
                  </div>
                </div>
              </ReservationDate>
              <SecondTitle>보낸 가견적서</SecondTitle>
            </>
          )}

        {/* ------------ 일정변경 요청 -------------- */}
        {spotData?.data?.hasReceivedSpotInspectionDates === true &&
          spotData?.data?.spotInspection?.isNewPropose === true &&
          spotData?.data?.spotInspection?.isConfirmed === false && (
            <>
              <ReservationDateCheck>
                <div className="text">일정 변경 요청이 들어왔습니다</div>
                <div className="btnBox">
                  <div
                    className="checkBtn"
                    onClick={() =>
                      router.push({
                        pathname: '/company/datePick',
                        query: {
                          preQuotation:
                            spotData.data.spotInspection.preQuotationIdx,
                        },
                      })
                    }
                  >
                    확인하기
                  </div>
                </div>
              </ReservationDateCheck>
              <SecondTitle>보낸 가견적서</SecondTitle>
            </>
          )}

        {/* ----------- 현장실사 일정 확정 -------------- */}
        {spotData?.data?.hasReceivedSpotInspectionDates === false &&
          spotData?.data?.spotInspection?.isNewPropose === false &&
          spotData?.data?.spotInspection?.isConfirmed === true &&
          data?.sendQuotationRequest?.badge === '현장실사 예약 완료' && (
            <>
              <ConfirmedReservation>
                <div className="text">현장실사 일정이 확정되었습니다.</div>
                <div className="date">
                  {spotData?.data?.spotInspection?.spotInspectionDate[0]?.replaceAll(
                    '-',
                    '.',
                  )}
                </div>
              </ConfirmedReservation>

              <SecondTitle>보낸 가견적서</SecondTitle>
            </>
          )}
        {/* ----------- 현장실사 완료 -------------- */}
        {spotData?.data?.hasReceivedSpotInspectionDates === false &&
          spotData?.data?.spotInspection?.isNewPropose === false &&
          spotData?.data?.spotInspection?.isConfirmed === true &&
          data?.sendQuotationRequest?.badge === '최종견적 입력 중' && (
            <>
              <ConfirmedReservation>
                <div className="text">현장실사 완료</div>
                <div className="date">
                  {spotData?.data?.spotInspection?.spotInspectionDate[0]?.replaceAll(
                    '-',
                    '.',
                  )}
                </div>
              </ConfirmedReservation>

              <SecondTitle>보낸 가견적서</SecondTitle>
            </>
          )}
        {/* 최종견적 작성 후 */}
        {data?.sendQuotationRequest?.preQuotation?.finalQuotation &&
          (data?.sendQuotationRequest?.badge === '낙찰대기 중' ||
            data?.sendQuotationRequest?.badge === '최종대기 중' ||
            data?.sendQuotationRequest?.badge === '견적취소' ||
            data?.sendQuotationRequest?.badge === '낙찰성공' ||
            data?.sendQuotationRequest?.badge === '낙찰실패') && (
            <SecondTitle>최종 견적서</SecondTitle>
          )}
        {data?.sendQuotationRequest?.badge === '선택대기' && (
          <SecondTitle>보낸 가견적서</SecondTitle>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-top: 21pt;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 15pt;
  border-bottom: 1px solid #e2e5ed;
  @media (min-width: 900pt) {
    border-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 21pt;
  }
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
`;

// 보낸 가견적서
const SecondTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  margin-top: 30pt;
  color: ${colors.main};
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  @media (min-width: 900pt) {
    margin-top: 60pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 18pt;
    font-weight: 700;
    line-height: 18.75pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const ReservationDate = styled.div`
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  margin-top: 30pt;
  border-radius: 6pt;
  padding: 30.75pt 24.75pt;

  .text {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: #747780;
  }
  .btnBox {
    display: flex;
    justify-content: center;
    gap: 9pt;
    margin-top: 21pt;
    .right {
      background-color: ${colors.main};
      color: #eeeeee;
      cursor: pointer;
    }
    .left {
      border: 1px solid #222222;
      color: #222222;
      cursor: pointer;
    }
  }
  .btnBox > .btn {
    max-height: 33pt;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12pt 25.875pt;
    border-radius: 67.5pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  @media (max-width: 899.25pt) {
    padding: 18pt 24.75pt;
    margin-top: 15pt;

    .text {
      font-size: 12pt;
    }
    .btnBox {
      margin-top: 15pt;
    }
    .btnBox > .box {
      border-radius: 12pt;
      padding: 6pt 9pt;
      font-size: 10pt;
    }
  }
`;
const ReservationDateCheck = styled.div`
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  margin-top: 30pt;
  border-radius: 6pt;
  padding: 30pt 24.75pt;

  .text {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 700;

    font-size: 15pt;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${colors.main};
  }
  .btnBox {
    display: flex;
    justify-content: center;
  }
  .checkBtn {
    display: inline-block;
    box-sizing: border-box;
    margin-top: 18pt;
    padding: 12pt 39pt;
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    letter-spacing: -0.02em;
    text-align: left;
    border-radius: 67.5pt;
    border: 0.75pt solid ${colors.main};
    color: ${colors.main};
    cursor: pointer;
    font-size: 12pt;
    line-height: 9pt;
  }

  @media (max-width: 899.25pt) {
    margin-top: 15pt;
    padding: 18pt 24.75pt;
    .text {
      font-weight: 500;
      font-size: 12pt;
      line-height: 12pt;
    }
    .checkBtn {
      font-size: 10pt;
      line-height: 12pt;
      padding: 6pt 9pt;
      border-radius: 12pt;
    }
  }
`;

const ConfirmedReservation = styled.div`
  padding: 30.75pt 45.75pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  margin-top: 30pt;
  border-radius: 6pt;

  .text {
    font-family: 'Spoqa Han Sans Neo';
    color: #747780;
    margin-bottom: 18pt;
    font-size: 15pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
  .date {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 21pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
  @media (max-width: 899.25pt) {
    padding: 18pt 45.75pt;
    margin-top: 15pt;
    .text {
      font-size: 12pt;
      margin-bottom: 12pt;
    }
    .date {
      font-size: 15pt;
    }
  }
`;

export default CenterBox;
