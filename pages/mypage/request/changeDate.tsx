import styled from '@emotion/styled';
import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useState } from 'react';
import colors from 'styles/colors';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { requestAction } from 'store/requestSlice';
import React from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { SpotDataResponse } from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';

const Mypage2_3 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state: RootState) => state.requestList);
  const [tabNumber, setTabNumber] = useState<number>(-1);
  // ---------- 현장 실사 날짜 api ------------
  const {
    data: spotData,
    isLoading: spotLoading,
    isError: spotIsError,
    error: spotError,
  } = useQuery<SpotDataResponse>(
    'spot-inspection',
    () =>
      isTokenGetApi(`/quotations/pre/${router?.query?.spotId}/spot-inspection`),
    {
      enabled: router?.isReady,
    },
  );

  // 수락하기 버튼
  const acceptModal = () => {
    dispatch(requestAction.addPick(selectedDate[tabNumber]));
    router.push('/mypage/request/2-1');
  };
  // 다른 날짜 제안 버튼
  const HandleDateChange = () => router.push('/mypage/request/2-4');
  // 해당 일자 요일 구하기
  function getDayOfWeek(target: string) {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(target).getDay()];
    return dayOfWeek;
  }

  if (spotLoading) {
    return <Loader />;
  }

  if (spotIsError) {
    console.log('에러발생');
    console.log(spotError);
  }

  console.log('🔥 ~line 61 spotData 확인');

  console.log(spotData);

  return (
    <React.Fragment>
      <Body>
        <WebHeader />
        <Inner>
          <Wrapper>
            <MypageHeader exitBtn={true} />
            <H1>
              일정 변경 요청을 <br />
              수락하시겠습니까?
            </H1>
            <Notice>변경하실 날짜를 선택해주세요.</Notice>
            <List>
              {selectedDate.map((date, index) => (
                <Item
                  check={tabNumber.toString()}
                  idx={index.toString()}
                  key={index}
                  onClick={() => setTabNumber(index)}
                >
                  <div className="date">{date}</div>
                  <div className="day">{getDayOfWeek(date)}요일</div>
                </Item>
              ))}
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

  @media (max-width: 899pt) {
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

  @media (max-width: 899pt) {
    height: 100%;
    // padding-bottom: 75pt;
    padding-bottom: 0;
    margin: 0;
  }
`;
const H1 = styled.h1`
  padding-left: 15pt;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Notice = styled.h3`
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
    font-weight: 600;
    font-size: 15pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${({ check, idx }) =>
      check === idx ? colors.main : colors.lightGray2};
  }
  .day {
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
  }
  .left {
    background: rgba(90, 45, 201, 0.5);

    @media (max-width: 899pt) {
      padding-bottom: 39pt;
    }
  }
  .right {
    background: ${({ tabNumber }) =>
      tabNumber !== -1 ? colors.main : colors.gray};
    @media (max-width: 899pt) {
      padding-bottom: 39pt;
    }
  }

  @media (max-width: 899pt) {
    position: fixed;
    left: 0;
    //padding-bottom: 39pt;
  }
`;
