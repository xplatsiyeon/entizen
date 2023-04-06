import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import WebHeader from 'componentsWeb/WebHeader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import WebFooter from 'componentsWeb/WebFooter';
import Modal from 'components/Modal/Modal';
import CompanyCalendar from './CompanyCalendar';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPostApi } from 'api';
import Loader from 'components/Loader';
import { SpotDataResponse } from './SentProvisionalQuoatation';
import BackImg from 'public/images/back-btn.svg';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import { type } from 'os';

type Props = {};

const AnotherSuggest = (props: Props) => {
  const router = useRouter();
  const [selectedDays, SetSelectedDays] = useState<string>(''); // 클릭 날짜
  const [selectedDaysArr, setSelectedDaysArr] = useState<string[]>([]);
  const [isModal, setIsModal] = useState(false); // 모달
  const [isValid, SetIsValid] = useState(false); // 버튼 유효성 검사
  const {
    mutate: postMutate,
    isLoading,
    isError,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal((prev) => !prev);
    },
    onError: (error: any) => {
      // console.log('포스트 실패');
      // console.log(error);
      setIsModal((prev) => !prev);
    },
  });
  // ---------- 현장 실사 날짜 api ------------
  const {
    data: spotData,
    isLoading: spotLoading,
    isError: spotIsError,
    error: spotError,
  } = useQuery<SpotDataResponse>(
    'spot-inspection',
    () =>
      isTokenGetApi(
        `/quotations/pre/${router.query.preQuotation}/spot-inspection`,
      ),
    {
      enabled: router.query.preQuotation ? true : false,
      // enabled: false,
    },
  );
  // 보내기 클릭 이벤트
  const onClickBtn = () => {
    const spotInspectionDates = selectedDaysArr.map((e) =>
      e.replaceAll('.', '-'),
    );
    // 변경 mutation api
    postMutate({
      url: `/quotations/pre/${router.query.preQuotation}/spot-inspection`,
      data: {
        spotInspectionDates: spotInspectionDates,
        isReplacedPicture: false,
        isNewPropose: true,
        isConfirmed: false,
      },
    });
  };
  // console.log(router.query.preQuotation, 'id 값만 가져오면 댐');

  // 닫기 버튼 url로 변경
  const handleOnClick = () => {
    router.push({
      pathname: '/company/sentProvisionalQuotation',
      query: {
        preQuotationIdx: router.query.preQuotation,
      },
    });
  };
  if (isLoading && spotLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <Modal
        text={'전송 실패했습니다.\n다시 시도해주세요.'}
        click={() => router.push('/company/quotation')}
      />
    );
  }

  useEffect(() => {
    if (selectedDaysArr.length > 0) {
      SetIsValid(true);
    } else {
      SetIsValid(false);
    }
  }, [selectedDaysArr]);

  // useEffect(() => {}, [selectedDaysArr]);

  if (spotIsError) {
    // console.log('🔥 ~line 42 에러 코드');
    // console.log(spotError);
  }

  const spotInspectionDate = spotData?.data?.spotInspection.spotInspectionDate!;
  const days = spotInspectionDate?.map((date) => date.replaceAll('-', '.'));

  return (
    <React.Fragment>
      {isModal && (
        <Modal
          text={'전송이 완료되었습니다.'}
          click={() => router.push('/company/quotation')}
        />
      )}
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <MypageHeader
              title="날짜 선택"
              exitBtn={true}
              handleOnClick={handleOnClick}
            />
            <WebSelectHeader>
              <BackImage className="back-img" onClick={() => router.back()}>
                <Image src={BackImg} alt="btn-icon" />
              </BackImage>
            </WebSelectHeader>
            <H1>
              고객에게 가능한 날짜를
              <br /> 제안해보세요
            </H1>

            {/* 달력 */}
            <CompanyCalendar
              selectedDays={selectedDays}
              SetSelectedDays={SetSelectedDays}
              selectedDaysArr={selectedDaysArr}
              setSelectedDaysArr={setSelectedDaysArr}
              days={days?.sort()}
              types={'company'}
            />
            <Schedule>
              {days?.length > 0 && <h3 className="name">재선택 일정</h3>}
              <UL>
                {selectedDaysArr?.sort().map((day, index) => (
                  <>
                    <li className="list" key={index}>
                      <div className="img-box">
                        <Image src={ScheduleIcon} alt="img" />
                      </div>
                      <div className="due-date">
                        <div>현장실사 방문 예정일</div>
                        <div>{day}</div>
                      </div>
                    </li>
                  </>
                ))}
                <Btn isValid={isValid} onClick={onClickBtn}>
                  다른 일정 제안하기
                </Btn>
              </UL>
            </Schedule>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
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
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
    overflow-y: scroll;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 225pt;
  /* margin: 0 31.875pt; */
  height: 667.5pt;

  @media (min-width: 899.25pt) {
    height: 100%;
    padding-bottom: 0;
  }

  @media (max-width: 899.25pt) {
    height: 100%;
  }
`;

const H1 = styled.h1`
  font-family: 'Spoqa Han Sans Neo';
  padding-top: 27pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
  @media (min-width: 900pt) {
    padding-left: 48pt;
    font-weight: 500;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const P = styled.p`
  margin-top: 10.5pt;
  box-sizing: border-box;
  margin-left: 15pt;
  padding: 6pt 9pt;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  border-radius: 12pt;
  color: ${colors.main};
  display: inline-block;
  border: 1px solid ${colors.main};
`;
const Explanation = styled.p`
  margin: 0 15pt;
  padding-top: 33pt;
  padding-bottom: 18pt;
  font-weight: 400;
  font-size: 9pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  border-bottom: 1px solid #e9eaee;
`;
const Schedule = styled.div`
  padding: 18pt 15pt 70pt 15pt;
  font-family: 'Spoqa Han Sans Neo';
  .name {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    color: ${colors.main2};
  }
  @media (min-width: 900pt) {
    padding: 18pt 47.25pt 0 47.25pt;
  }
`;
const UL = styled.ul`
  padding-top: 24pt;
  font-family: 'Spoqa Han Sans Neo';
  .list {
    font-family: 'Spoqa Han Sans Neo';
    /* background-color: #e2e5ed; */
    background: rgba(90, 45, 201, 0.7);
    border-radius: 6pt;
    padding: 6pt;
    margin-bottom: 9pt;
    display: flex;
    gap: 12pt;
  }
  .img-box {
    height: 36pt;
  }
  .due-date {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 9pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6pt;
  }
`;
const Btn = styled.button<{ isValid: boolean }>`
  position: absolute;
  bottom: 0;
  background-color: ${({ isValid }) => (isValid ? colors.main : colors.gray)};
  width: 100%;
  text-align: center;
  padding-top: 15pt;
  padding-bottom: 15pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: ${colors.lightWhite};
  cursor: pointer;
  @media (max-width: 899.25pt) {
    position: fixed;
    left: 0;
    padding-bottom: 39pt;
  }

  @media (min-width: 900pt) {
    border-radius: 8px;
    width: 251.25pt;
    position: relative;
    margin-top: 50pt;
  }
`;

const SelectDate = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  padding-left: 102pt;
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

  margin: 0 auto;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;

export default AnotherSuggest;
