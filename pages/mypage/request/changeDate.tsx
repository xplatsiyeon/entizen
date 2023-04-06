import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import { useState } from 'react';
import Calendar from 'components/mypage/request/Calendar';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import colors from 'styles/colors';
import Image from 'next/image';
import Modal from 'components/Modal/Modal';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { isTokenGetApi, isTokenPostApi } from 'api';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Loader from 'components/Loader';
import BackImg from 'public/images/back-btn.svg';
import exDate from 'public/images/exDate.png';
import { SpotDataResponse } from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';

const changeDate = () => {
  const router = useRouter();
  const spotId = router.query.spotId;
  const isReqest = router.query.request;
  const [selectedDays, SetSelectedDays] = useState<string[]>([]); // 클릭 날짜
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const HandleModal = () => {
    router.push('/mypage');
  };

  const quotationRequestIdx = router?.query?.quotationRequestIdx;

  const handleOnClick = () => {
    router.push({
      pathname: '/mypage/request',
      query: {
        quotationRequestIdx: quotationRequestIdx,
      },
    });
  };
  // ---------- 현장 실사 날짜 api ------------
  const {
    data: spotData,
    isLoading: spotLoading,
    isError: spotIsError,
    error: spotError,
  } = useQuery<SpotDataResponse>(
    'spot-inspection',
    () => isTokenGetApi(`/quotations/pre/${spotId}/spot-inspection`),
    {
      enabled: router.query.preQuotation ? true : false,
      // enabled: false,
    },
  );

  // --------- 날짜 제안 api -----------
  const { mutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('변경 요청 되었습니다');
    },
    onError: (error: any) => {
      // console.log(error);
      setIsModal(true);
      setModalMessage('다시 시도해주세요');
    },
  });

  const onClicMutate = () => {
    if (selectedDays.length > 0) {
      mutate({
        url: `/quotations/pre/${spotId}/spot-inspection`,
        data: {
          spotInspectionDates: selectedDays,
          isReplacedPicture: false,
          isNewPropose: true,
          isConfirmed: false,
        },
      });
    } else {
      //모달???
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            {/* 모달 / 라우터 수정  */}
            {isModal && <Modal text={modalMessage} click={HandleModal} />}
            <MypageHeader
              title="다른 날짜 선택"
              exitBtn={true}
              back={true}
              handleOnClick={handleOnClick}
            />
            <WebSelectHeader>
              <BackImage className="back-img" onClick={() => router.back()}>
                <Image src={BackImg} alt="btn-icon" />
              </BackImage>
              {/* 고객이 일정 변경 요청할때 */}
              {/* 구매자가 현장실사 일정 변경하면 기존 일정 추가 필요 */}
              {/* 기업에서 다른날짜 제안했는데 구매자가 기업이 제안한 날짜말고 다른 날짜 선택하면 UI 달라짐!!! */}
              <SelectDate>일정 변경</SelectDate>
            </WebSelectHeader>
            <Title>
              {isReqest
                ? `가능한 날짜를 선택해주세요`
                : `현장실사 방문이 \n가능한 날짜를 선택해주세요`}
            </Title>
            {!isReqest && (
              <DateNotice>
                현장 검토 및 최종견적을 위해 담당자가 방문할 예정입니다.
              </DateNotice>
            )}
            {/* 달력 */}
            <Calendar
              selectedDays={selectedDays}
              SetSelectedDays={SetSelectedDays}
              selected={spotData?.data.spotInspection.spotInspectionDate}
              request={Boolean(isReqest)}
            />

            <NoticeP>
              * 일부 현장의 경우 현장사진으로 현장실사가 대체될 수 있으며,
              담당자로부터 현장사진을 요청받을 수 있습니다.
            </NoticeP>

            <UL className="ex-date">
              <ReSelectDate>기존 일정</ReSelectDate>
              {spotData?.data.spotInspection.spotInspectionDate.map(
                (day, index) => {
                  return (
                    <li className="ex-list" key={index}>
                      <div className="img-box">
                        <Image src={exDate} alt="img" layout="fill" />
                      </div>
                      <div className="due-date ex">
                        <div>현장실사 방문 예정일</div>
                        <div>{day}</div>
                      </div>
                    </li>
                  );
                },
              )}
            </UL>
            {selectedDays.length > 0 && (
              <UL>
                <ReSelectDate>재선택 일정</ReSelectDate>
                {selectedDays.map((day, index) => (
                  <li className="list" key={index}>
                    <div className="img-box">
                      <Image src={ScheduleIcon} alt="img" />
                    </div>
                    <div className="due-date">
                      <div>현장실사 방문 예정일</div>
                      <div>{day}</div>
                    </div>
                  </li>
                ))}
              </UL>
            )}
            <Btn
              onClick={onClicMutate}
              className={selectedDays.length > 0 ? 'on' : ''}
            >
              변경 요청
            </Btn>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default changeDate;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
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
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    padding: 0 0 70pt;
    box-shadow: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt 0;
  //height: 664.5pt;
  height: auto;

  @media (max-width: 899.25pt) {
    //height: 100%;
    height: 100vh;
    //padding-bottom: 225pt;
    padding-bottom: 0;
    margin: 0;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
  padding-top: 27pt;
  white-space: pre-wrap;
`;
const UL = styled.ul`
  padding: 0pt 15pt 25pt;

  @media (max-width: 899.25pt) {
    padding: 0pt 15pt 85pt;
  }

  &.ex-date {
    padding: 24pt 15pt 20pt;
    border-top: 0.75pt solid #e9eaee;

    @media (max-width: 899.25pt) {
      padding: 24pt 15pt 0pt;
    }
  }

  li {
    border-radius: 6pt;
    padding: 6pt;
    margin-bottom: 9pt;
    display: flex;
    gap: 12pt;

    &.list {
      background-color: rgba(90, 45, 201, 0.7);
      .img-box {
        width: 36pt;
        height: 36pt;
        position: relative;
      }
    }
    &.ex-list {
      background-color: #e2e5ed;

      .img-box {
        width: 36pt;
        height: 36pt;
        position: relative;
      }
    }
  }
  .due-date {
    font-weight: 500;
    font-size: 9pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    //padding-top: 2pt;
    color: ${colors.lightWhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    &.ex {
      color: #a6a9b0;
    }
  }

  @media (max-width: 899.25pt) {
    padding: 24pt 15pt 100pt;
  }
`;
const Btn = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding-top: 15pt;
  padding-bottom: 15pt;
  background: #e2e5ed;
  border-radius: 6pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    position: fixed;
    left: 0;
    padding-bottom: 39pt;
    border-radius: 0pt;
  }

  @media (min-width: 900pt) {
    position: relative;
    width: 251.25pt;
    margin-left: 18pt;
  }
  &.on {
    background: ${colors.main};
  }
`;

const ReSelectDate = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  text-align: left;
  padding-bottom: 24pt;
`;

const SelectDate = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  /* padding-left: 60.375pt; */
  padding-left: 80pt;
`;

const DateNotice = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #747780;
  padding-left: 15pt;
  padding-top: 9pt;
`;

const BackImage = styled.div`
  padding: 9pt 15pt;
  cursor: pointer;
  left: 7pt;
  padding: 5px;
`;
const WebSelectHeader = styled.div`
  width: 316.5pt;
  display: flex;
  align-items: center;
  padding-bottom: 23.25pt;
  margin: 0 auto;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

const NoticeP = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #a6a9b0;
  padding: 33pt 15pt 30pt;
  @media (max-width: 899.25pt) {
    padding: 18pt 15pt 18pt;
    font-weight: 400;
    font-size: 9pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
  }
`;
