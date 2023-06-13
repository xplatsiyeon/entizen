import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { SpotDataResponse } from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';
import { useMutation, useQuery } from 'react-query';
import { isTokenGetApi, isTokenPostApi } from 'api';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import BackImg from 'public/images/back-btn.svg';
import Image from 'next/image';

const Mypage2_3 = () => {
  const router = useRouter();
  const spotId = router?.query?.spotId;
  const quotationRequestIdx = router?.query?.quotationRequestIdx;
  const [tabNumber, setTabNumber] = useState<number>(-1);
  // 에러 모달
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
      enabled: router?.isReady,
    },
  );

  // --------- 날짜 제안 api -----------
  const { mutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('변경된 날짜를 요청하였습니다.');
    },
    onError: (error: any) => {
      setIsModal(true);
      setModalMessage('다시 시도해주세요');
    },
  });

  const onClickModal = () => {
    router.push('/');
  };

  // 수락하기 버튼
  const acceptModal = () => {
    // console.log(tabNumber);
    if (tabNumber === 0) {
      mutate({
        url: `/quotations/pre/${spotId}/spot-inspection`,
        data: {
          spotInspectionDates: [
            spotData?.data?.spotInspection?.spotInspectionDate[tabNumber],
          ],
          isReplacedPicture: false,
          isNewPropose: false,
          isConfirmed: true,
        },
      });
    }
    //? 수락할 날짜 선택하라는 메세지??
  };
  const anotherData = spotData?.data?.spotInspection.spotInspectionDate;
  const anotherData2 = spotData?.data?.spotInspection.createdAt;
  // console.log('72번째', anotherData);
  // 다른 날짜 제안 버튼
  const HandleDateChange = () =>
    router.push({
      pathname: '/mypage/request/changeDate',
      query: {
        request: true,
        quotationRequestIdx: quotationRequestIdx,
        spotId: spotId,
      },
    });
  // 해당 일자 요일 구하기
  function getDayOfWeek(target: string) {
    const date = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(target.replace(/-/g, '/')).getDay()];
    // console.log('요일확인 ', dayOfWeek )
    return dayOfWeek;
  }

  if (spotLoading || isLoading) {
    return <Loader />;
  }

  if (spotIsError) {
    // console.log('에러발생');
    // console.log(spotError);
  }

  // console.log('🔥 ~line 61 spotData 확인');

  // console.log(spotData);

  const handleOnClick = () => {
    router.back();
  };

  return (
    <React.Fragment>
      {isModal && <Modal click={onClickModal} text={modalMessage} />}
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <MypageHeader exitBtn={true} handleOnClick={handleOnClick} />
            <H1>
              일정 변경 요청을 <br />
              수락하시겠습니까?
            </H1>
            <Notice>변경하실 날짜를 선택해주세요.</Notice>
            <List>
              {spotData?.data?.spotInspection?.spotInspectionDate?.map(
                (date, index) => (
                  <Item
                    check={tabNumber.toString()}
                    idx={index.toString()}
                    key={index}
                    onClick={() => setTabNumber(index)}
                  >
                    <div className="date">{date}</div>
                    <div className="day">{getDayOfWeek(date)}요일</div>
                  </Item>
                ),
              )}
            </List>
            <Btn tabNumber={tabNumber}>
              <button className="left" onClick={HandleDateChange}>
                다른 날짜 제안
              </button>
              <button className="right" onClick={acceptModal}>
                수락하기
              </button>
            </Btn>
          </Wrapper>
        </Inner>
        <WebFooter />
      </Body>
    </React.Fragment>
  );
};

export default Mypage2_3;

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
  margin: 0 auto;
  width: 345pt;
  //width: 281.25pt;
  background: #ffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  margin: 45.75pt auto;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  margin: 0 31.875pt;
  //height: 434.25pt;
  padding-bottom: 87pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    // padding-bottom: 75pt;
    padding-bottom: 0;
    margin: 0;
  }
`;
const H1 = styled.h1`
  font-family: 'Spoqa Han Sans Neo';
  padding-left: 15pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Notice = styled.h3`
  font-family: 'Spoqa Han Sans Neo';
  padding-left: 15pt;
  padding-top: 45pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const List = styled.ul`
  padding: 0 15pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    padding-bottom: 90pt;
  }
`;
const Item = styled.li<{ idx: string; check: string }>`
  padding: 18.75pt 0;
  margin-top: 9pt;
  background: ${colors.lightWhite};
  border-style: solid;
  border-width: 0.75pt;
  border-color: ${({ check, idx }) =>
    check === idx ? colors.main : colors.gray};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4.5pt;
  .date {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 600;
    font-size: 15pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${({ check, idx }) =>
      check === idx ? colors.main : colors.lightGray2};
  }
  .day {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
  }
`;
const Btn = styled.div<{ tabNumber: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  cursor: pointer;
  font-family: 'Spoqa Han Sans Neo';
  @media (min-width: 900pt) {
    gap: 8.25pt;
  }
  & button {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    width: 100%;
    padding-top: 15pt;
    padding-bottom: 15pt;
    cursor: pointer;
    @media (min-width: 900pt) {
      width: 121.2525pt;
      border-radius: 6pt;
    }
  }
  .left {
    /* background: ${({ tabNumber }) =>
      tabNumber !== -1 ? colors.main : colors.gray}; */

    background-color: ${colors.gray};
    cursor: pointer;
    @media (max-width: 899.25pt) {
      padding-bottom: 39pt;
    }
  }
  .right {
    background: ${({ tabNumber }) =>
      tabNumber !== -1 ? colors.main : 'rgba(90, 45, 201, 0.5)'};
    /* background: rgba(90, 45, 201, 0.5); */
    @media (max-width: 899.25pt) {
      padding-bottom: 39pt;
    }
  }

  @media (max-width: 899.25pt) {
    position: fixed;
    left: 0;
    //padding-bottom: 39pt;
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
