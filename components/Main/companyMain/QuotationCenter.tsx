import styled from '@emotion/styled';
import Image from 'next/image';
import lightning from 'public/images/lightning.png';
import clipboardText from 'public/images/ClipboardText.png';
import emptyClipboardText from 'public/images/EmptyClipboardText.png';

import React, { useState } from 'react';
import colors from 'styles/colors';
import { isTokenApi } from 'api';
import { useQuery } from 'react-query';
import Loader from 'components/Loader';
import { Router } from '@mui/icons-material';
import { useRouter } from 'next/router';

type Props = {};
const TAG = 'commponents/Main/companyMain/QuotationCenter';
const QuotationCenter = ({}: Props) => {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery('receivedRequest', () =>
    isTokenApi({
      endpoint: `/quotations/received-request?keyword=&sort=deadline`,
      method: 'GET',
    }),
  );

  if (isError) {
    alert('잠시 후 다시 시도해주세요.');
    router.push('/404');
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Wrapper>
      <ImgBox>
        <Image src={lightning} alt="lightning" />
      </ImgBox>

      {data?.data.receivedQuotationRequests.length! === 0 ? (
        <TopImgBox>
          <Image src={emptyClipboardText} alt="emptyClipboardText" />
        </TopImgBox>
      ) : (
        <TopImgBox>
          <CountCircle>
            {data?.data.receivedQuotationRequests.length}
          </CountCircle>
          <BlueIcon>
            <Image src={clipboardText} alt="clipboardText" />
          </BlueIcon>
        </TopImgBox>
      )}
      {data?.data.receivedQuotationRequests.length! >= 1 ? (
        <>
          <Reqeusts>
            {data?.data.receivedQuotationRequests.length}건의 견적 요청이
            있습니다!
          </Reqeusts>
          <RequestInfo>
            요청서를 확인하고 가견적서를 작성해
            <br />
            고객에게 제안해보세요!
          </RequestInfo>
        </>
      ) : (
        <>
          <NoReqeusts>아직 도착한 견적 요청이 없어요</NoReqeusts>
          <WhenNoRequest>조금만 더 기다려볼까요?</WhenNoRequest>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 39pt;
`;
const ImgBox = styled.div`
  position: absolute;
  z-index: -5;
  left: 50%;
  width: 143.25pt;
  height: 181.5pt;
  transform: translateX(-50%);
`;

const TopImgBox = styled.div`
  width: 45pt;
  height: 45pt;
  position: relative;
  margin: 0 auto;
`;
const BlueIcon = styled.div`
  & span {
    z-index: -1 !important;
  }
`;

const CountCircle = styled.div`
  font-family: Spoqa Han Sans Neo;
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: center;
  width: 18pt;
  height: 18pt;
  background-color: ${colors.main};
  color: #ffffff;
  border-radius: 50%;
  z-index: 100 !important;
`;

const Reqeusts = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  margin-top: 21pt;
  line-height: 15pt;
  letter-spacing: 0em;
  text-align: center;
  color: ${colors.main};
`;

const WhenNoRequest = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: 0em;
  text-align: center;
  color: #747780;
  margin-top: 12pt;
`;

const NoReqeusts = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  margin-top: 21pt;
  line-height: 15pt;
  letter-spacing: 0em;
  text-align: center;
  color: #747780;
`;

const RequestInfo = styled.div`
  font-family: Spoqa Han Sans Neo;
  margin-top: 12pt;
  font-size: 12pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: 0em;
  text-align: center;
  color: #747780;
`;

export default QuotationCenter;
