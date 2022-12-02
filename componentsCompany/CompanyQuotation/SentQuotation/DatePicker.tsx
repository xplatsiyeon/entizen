import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import WebHeader from 'componentsWeb/WebHeader';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { requestAction } from 'store/requestSlice';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyCalendar from './CompanyCalendar';
import Modal from 'components/Modal/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { isTokenGetApi, isTokenPostApi } from 'api';
import Loader from 'components/Loader';
import { SpotDataResponse } from './SentProvisionalQuoatation';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import UserRightMenu from 'components/UserRightMenu';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import BackImg from 'public/images/back-btn.svg';

type Props = {};
const TAG = 'componentsCompany/CompanyQuotation/SentQuotation/DatePicker.tsx';
const DatePicker = ({}: Props) => {
  const router = useRouter();
  console.log('~line 23 router.query.preQuotation ');
  console.log(router.query.preQuotation);
  const memberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);

  const [selectedDays, SetSelectedDays] = useState<string>(''); // 클릭 날짜
  const [isValid, SetIsValid] = useState(false); // 버튼 유효성 검사
  const [isModal, setIsModal] = useState(false); // 모달 on/off
  const [modalMessage, setModalMessage] = useState(''); // 모달 메세지
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

  // 일정 확정하기 POST API
  const { data, mutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: (data) => {
      console.log(data);
      setModalMessage('확정되었습니다.');
      setIsModal((prev) => !prev);
      router.back();
    },
    onError: (error: any) => {
      const {
        response: { data },
      } = error;
      if (data) {
        setModalMessage(data.message);
        setIsModal(true);
      } else {
        setModalMessage('다시 시도해주세요');
        setIsModal(true);
        router.push('/');
      }
    },
  });

  // 확정하기 버튼 클릭
  const onClickConfirmBtn = () => {
    if (selectedDays) {
      console.log('온클릭 됐나요?');
      const newDay = selectedDays?.replaceAll('.', '-');
      console.log(newDay);
      mutate({
        url: `/quotations/pre/${router.query.preQuotation}/spot-inspection`,
        data: {
          spotInspectionDates: [newDay],
          isReplacedPicture: false,
          isNewPropose: false,
          isConfirmed: true,
        },
      });
    }
  };
  // 모달 확인 버튼 클릭
  const HandleModal = () => {
    console.log('온클릭');
    setIsModal((prev) => !prev);
    // router.push('/mypage');
    // dispatch(requestAction.addDate(selectedDays));
  };

  useEffect(() => {
    if (selectedDays) {
      SetIsValid(true);
    } else {
      SetIsValid(false);
    }
  }, [selectedDays]);

  if (spotLoading && isLoading) {
    return <Loader />;
  }
  if (spotIsError) {
    console.log(TAG + '🔥 ~line 42 에러 코드');
    console.log(spotError);
  }

  const { spotInspectionDate } = spotData?.data?.spotInspection!;
  const days = spotInspectionDate?.map((date) => date?.replaceAll('-', '.'));
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [tabNumber, setTabNumber] = useState<number>(7);
  const [componentId, setComponentId] = useState<number>();

  return (
    <React.Fragment>
      {isModal && <Modal click={HandleModal} text={modalMessage} />}
      <Body>
        {memberType !== 'COMPANY' ? (
          <WebHeader />
        ) : (
          <WebBuyerHeader
            setTabNumber={setTabNumber}
            tabNumber={tabNumber!}
            componentId={componentId}
            openSubLink={openSubLink}
            setOpenSubLink={setOpenSubLink}
          />
        )}
        <Inner>
          {memberType !== 'COMPANY' ? <UserRightMenu /> : <CompanyRightMenu />}
          <Wrapper>
            <MypageHeader title="날짜 선택" back={true} />
            <WebSelectHeader>
              <BackImage className="back-img" onClick={() => router.back()}>
                <Image src={BackImg} alt="btn-icon" />
              </BackImage>
              <SelectDate>날짜 선택</SelectDate>
            </WebSelectHeader>
            <H1>
              현장실사 방문이
              <br /> 가능한 날짜를 선택해주세요
            </H1>
            <P
              onClick={() =>
                router.push({
                  pathname: '/company/suggestChange',
                  query: {
                    preQuotation: router.query.preQuotation,
                  },
                })
              }
            >
              다른 일정 제안
            </P>

            {/* 달력 */}
            <CompanyCalendar
              selectedDays={selectedDays}
              SetSelectedDays={SetSelectedDays}
              days={days!.sort()}
              types={'customer'}
            />
            {memberType !== 'COMPANy' && (
              <Explanation>
                * 일부 현장의 경우 현장사진으로 현장실사가 대체될 수 있으며,
                <br />
                담당자로부터 현장사진을 요청받을 수 있습니다.
              </Explanation>
            )}
            <Line />
            <Schedule>
              <h3 className="name">선택된 일정</h3>
              <UL>
                {days?.sort().map((day, index) => (
                  <>
                    {selectedDays !== '' && day == selectedDays ? (
                      <li className="list selected" key={index}>
                        <div className="img-box">
                          <Image src={ScheduleIcon} alt="img" />
                        </div>
                        <div className="due-date">
                          <div>현장실사 방문 예정일</div>
                          <div>{day}</div>
                        </div>
                      </li>
                    ) : (
                      <li className="list" key={index}>
                        <div className="img-box">
                          <Image src={ScheduleIcon} alt="img" />
                        </div>
                        <div className="due-date">
                          <div>현장실사 방문 예정일</div>
                          <div>{day}</div>
                        </div>
                      </li>
                    )}
                  </>
                ))}
              </UL>
            </Schedule>
            <Btn isValid={isValid} onClick={onClickConfirmBtn}>
              일정 확정하기
            </Btn>
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
  //height: 667.5pt;

  @media (max-width: 899.25pt) {
    height: 100%;
  }

  @media (min-width: 900pt) {
    padding-bottom: 0pt;
  }
`;
const H1 = styled.h1`
  padding-top: 27pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
  @media (min-width: 900pt) {
    padding-left: 47.25pt;
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
  cursor: pointer;
  @media (min-width: 900pt) {
    margin-left: 47.25pt;
  }
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

  @media (min-width: 900pt) {
    margin-left: 51pt;
  }
`;

const Line = styled.div`
  border-bottom: 0.75pt solid #e9eaee;
  width: 252.25pt;
  margin: 0 auto;
`;
const Schedule = styled.div`
  padding: 18pt 15pt 70pt 15pt;

  .name {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    color: ${colors.main2};
  }
  @media (min-width: 900pt) {
    padding: 18pt 47.25pt 70pt 47.25pt;
  }
`;
const UL = styled.ul`
  padding-top: 24pt;
  .list {
    background-color: #e2e5ed;
    border-radius: 6pt;
    padding: 6pt;
    margin-bottom: 9pt;
    display: flex;
    gap: 12pt;
  }
  .due-date {
    font-weight: 500;
    font-size: 9pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    padding-top: 2pt;
    color: ${colors.lightWhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6pt;
  }
  .selected {
    background-color: ${colors.main};
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
  color: ${colors.lightWhite};
  cursor: pointer;
  @media (max-width: 899.25pt) {
    position: fixed;
    left: 0;
    padding-bottom: 39pt;
  }

  @media (min-width: 900pt) {
    position: relative;
    border-radius: 8px;
    width: 251.25pt;
    margin-left: 47.25pt;
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
  padding-bottom: 23.25pt;
  margin: 0 auto;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
export default DatePicker;
