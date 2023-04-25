import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import colors from 'styles/colors';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import check_circle_icon from 'public/companyContract/check_circle_icon.png';
import { useRouter } from 'next/router';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import { useMediaQuery } from 'react-responsive';

type Props = {};

export default function Complete(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const projectIdx = router.query.projectIdx;
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const onClickButton = useCallback(() => {
    dispatch(contractAction.reset());
    router.push({
      pathname: '/company/mypage/runningProgress',
      query: {
        projectIdx: projectIdx,
      },
    });
  }, []);

  return (
    <WebBody>
      <WebBuyerHeader
        tabNumber={tabNumber}
        setTabNumber={setTabNumber}
        openSubLink={openSubLink}
        setOpenSubLink={setOpenSubLink}
      />
      <Container>
        <Wrap>
          <ImgBox>
            <Image src={check_circle_icon} alt="complete_icon" layout="fill" />
          </ImgBox>
          <Text>구독 계약서가 요청되었습니다</Text>
          {mobile ? (
            <>
              <Notice>
                카카오톡을 통해 전달된 계약서를
                <br /> 검토 후 서명해주세요.
              </Notice>
              <Button onClick={onClickButton}>진행 프로젝트 바로가기</Button>
            </>
          ) : (
            <>
              <Button onClick={onClickButton}>진행 프로젝트 바로가기</Button>
              <Notice>
                카카오톡을 통해 전달된 계약서를 검토 후 서명해주세요.
              </Notice>
            </>
          )}
        </Wrap>
      </Container>
      <WebFooter />
    </WebBody>
  );
}
const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  @media (max-height: 500pt) {
    height: 100%;
    display: block;
  }
`;
const Container = styled.div`
  display: block;
  position: relative;
  border-radius: 12pt;
  /* width: 345pt; */
  /* margin-top: 58.5pt; */

  background: white;

  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0%;
    transform: none;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }
  @media (max-height: 400pt) {
    height: 100%;
    background: white;
  }
  @media (min-width: 900pt) {
    margin: 0 auto;
    /* padding-top: 54pt; */
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
  padding-top: 97.5pt;
  padding-bottom: 90pt;

  @media (max-width: 899.25pt) {
    min-height: calc(100vh - 48px);
    padding-top: 24pt;
    padding-left: 15pt;
    padding-right: 15pt;
    padding-bottom: 130pt;
  }
`;
const ImgBox = styled.div`
  position: relative;
  display: inline-block;

  width: 49.5pt;
  height: 49.5pt;
  @media (max-width: 899.25pt) {
    margin-top: 62.63pt;
    width: 45pt;
    height: 45pt;
  }
`;

const Text = styled.h1`
  padding-top: 23.25pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 25.5pt;
  line-height: 37.5pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};

  @media (max-width: 899.25pt) {
    padding-top: 29.625pt;
    font-size: 18pt;
    line-height: 24pt;
  }
`;
const Notice = styled.div`
  border: 0.75pt solid ${colors.lightWhite5};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray7};
  padding-top: 18pt;
  padding-bottom: 18pt;
  width: 100%;
  margin-top: 60pt;
  @media (max-width: 899.25pt) {
    margin-top: 101.25pt;
    font-size: 10.5pt;
    line-height: 15pt;
    padding-top: 15pt;
    padding-bottom: 15pt;
  }
`;
const Button = styled.button`
  margin-top: 45pt;
  background: ${colors.main1};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  cursor: pointer;
  padding: 15pt 0;
  width: 100%;
  @media (max-width: 899.25pt) {
    margin-top: 24pt;
  }
`;
