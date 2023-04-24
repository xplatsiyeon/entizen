import styled from '@emotion/styled';
import React, { useCallback, useEffect } from 'react';
import colors from 'styles/colors';
import { contractAction } from 'storeCompany/contract';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import check_circle_icon from 'public/companyContract/check_circle_icon.png';
import { useRouter } from 'next/router';

type Props = {};

export default function Complete(props: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const projectIdx = router.query.projectIdx;

  const onClickButton = useCallback(() => {
    dispatch(contractAction.reset());
    router.push({
      pathname: '/company/mypage/runningProgress',
      query: {
        projectIdx: projectIdx,
      },
    });
  }, []);

  useEffect(() => {
    console.log(projectIdx);
  }, [router.isReady]);

  return (
    <Wrap>
      <ImgBox>
        <Image src={check_circle_icon} alt="complete_icon" layout="fill" />
      </ImgBox>
      <Text>구독 계약서가 요청되었습니다</Text>
      <Notice>
        카카오톡을 통해 전달된 계약서를
        <br /> 검토 후 서명해주세요.
      </Notice>
      <Button onClick={onClickButton}>진행 프로젝트 바로가기</Button>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding-top: 18.375pt;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-left: 15pt;
  padding-right: 15pt;
  position: relative;
  min-height: calc(100vh - 48px);
  padding-bottom: 130pt;
`;

const ImgBox = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 62.63pt;
  width: 45pt;
  height: 45pt;
`;

const Text = styled.h1`
  padding-top: 29.625pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Notice = styled.div`
  border: 0.75pt solid ${colors.lightWhite5};
  border-radius: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray7};
  padding-top: 15pt;
  padding-bottom: 15pt;
  width: 100%;
  margin-top: 101.25pt;
`;
const Button = styled.button`
  margin-top: 24pt;
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
`;
