import styled from '@emotion/styled';
import Calendar from 'components/mypage/request/Calendar';
import MypageHeader from 'components/mypage/request/header';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import colors from 'styles/colors';
import ScheduleIcon from 'public/mypage/schedule-icon.svg';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { requestAction } from 'store/requestSlice';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';
import { AxiosError } from 'axios';
import ExitImg from '../../../../public/images/X.svg';
import BackImg from 'public/images/back-btn.svg';
import { useMediaQuery } from 'react-responsive';

interface Mutation {
  isSuccess: boolean;
}

const Mypage1_5 = () => {
  const router = useRouter();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  // const routerId = router.query.id;
  const routerId = router?.query?.preQuotationIdx;
  const dispatch = useDispatch();
  const [selectedDays, SetSelectedDays] = useState<string[]>([]); // 클릭 날짜
  const [isModal, setIsModal] = useState(false); // 모달
  const [modalMessage, setModalMessage] = useState(''); // 모달 메세지
  const [isValid, setIsValid] = useState(false);

  const { mutate: spotMutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('전송이 완료되었습니다.');
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setModalMessage(error.response.data.message);
        setIsModal(true);
      } else {
        setModalMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });

  const onClickBtn = () => {
    if (isValid) {
      const postData = selectedDays.map((e) => e.replaceAll('.', '-'));
      spotMutate({
        url: `/quotations/pre/${routerId}/spot-inspection`,
        data: {
          spotInspectionDates: postData,
          isReplacedPicture: false,
          isConfirmed: false,
          isNewPropose: false,
        },
      });
    }
  };
  // 리덕스
  const HandleModal = () => {
    dispatch(requestAction.addDate(selectedDays)); // 필요없으면 나중에 삭제

    setIsModal(false);
    router.push('/mypage');
  };

  // 버튼 유효성 검사
  useEffect(() => {
    selectedDays.length > 0 ? setIsValid(true) : setIsValid(false);
  }, [selectedDays]);

  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <SelectDate>
            <IconWrap onClick={() => router.back()}>
              <Image src={BackImg} alt="exit" style={{ cursor: 'pointer' }} />
            </IconWrap>
            <SelectDateText>날짜선택</SelectDateText>
          </SelectDate>
          <Wrapper>
            {/* 모달 */}
            {isModal && (
              <Modal click={HandleModal} text={modalMessage} color="red" />
            )}
            <MypageHeader title="날짜 선택" back={true} />
            <H1>
              현장실사 방문이
              <br /> 가능한 날짜를 선택해주세요
            </H1>
            {mobile && (
              <P>
                현장 검토 및 최종견적을 위해
                <br /> 담당자가 방문할 예정입니다.
              </P>
            )}
            {!mobile && (
              <P>현장 검토 및 최종견적을 위해 담당자가 방문할 예정입니다.</P>
            )}
            {/* 달력 */}
            <Calendar
              selectedDays={selectedDays}
              SetSelectedDays={SetSelectedDays}
            />
            <Explanation>
              * 일부 현장의 경우 현장사진으로 현장실사가 대체될 수 있으며,
              <br />
              담당자로부터 현장사진을 요청받을 수 있습니다.
            </Explanation>
            <Schedule>
              {selectedDays?.length > 0 && (
                <h3 className="name">선택된 일정</h3>
              )}
              <UL>
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
            </Schedule>
            <Btn isValid={isValid} onClick={onClickBtn}>
              보내기
            </Btn>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default Mypage1_5;

const SelectDate = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
  @media (min-width: 900pt) {
    display: flex;
  }
`;

const IconWrap = styled.div`
  @media (max-width: 899.25pt) {
    display: none;
  }
  @media (min-width: 900pt) {
    padding-left: 29pt;
  }
`;

const SelectDateText = styled.div`
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 18pt;
    font-weight: 700;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: center;
    margin: 0 auto;
    padding-right: 58pt;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
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
    border-radius: 0;
  }
  @media (max-height: 500pt) {
    height: 100%;
  }
  @media (min-width: 900pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  height: 667.5pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
  @media (min-width: 900pt) {
    padding-bottom: 0;
    height: auto;
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
    padding-top: 50.25pt;
  }
`;
const P = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  padding-top: 9pt;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-left: 15pt;
`;
const Explanation = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  margin: 0 15pt;
  padding-top: 33pt;
  padding-bottom: 18pt;
  font-weight: 400;
  font-size: 9pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  border-bottom: 1px solid #e9eaee;
  @media (min-width: 900pt) {
    width: 100%;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Schedule = styled.div`
  padding: 18pt 15pt 20pt 15pt;
  .name {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    color: ${colors.main2};
  }
  @media (max-width: 899.25pt) {
    padding: 18pt 15pt 80pt 15pt;
  }
`;
const UL = styled.ul`
  padding-top: 24pt;
  .list {
    background-color: rgba(90, 45, 201, 0.7);
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
    gap: 8px;
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

  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'default')};
  @media (max-width: 899.25pt) {
    position: fixed;
    left: 0;
    padding-bottom: 39pt;
  }

  @media (min-width: 900pt) {
    border-radius: 6pt;
    position: relative;
  }
`;
