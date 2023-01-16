import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { isTokenGetApi } from 'api';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackImg from 'public/images/back-btn.svg';
import { useState } from 'react';
import { useQuery } from 'react-query';
import colors from 'styles/colors';
import { adminDateFomat } from 'utils/calculatePackage';

type NoticeResponse = {
  isSuccess: boolean;
  data: {
    createdAt: string;
    noticeIdx: number;
    title: string;
    content: string;
  };
};

const Alam1_3 = () => {
  // /notices/:noticeIdx
  const router = useRouter();
  const routerID = router.query.noticesIdx;

  const memberType = JSON.parse(sessionStorage.getItem('MEMBER_TYPE')!);

  const {
    data: notice,
    isLoading: noticeIsLoading,
    isError: noticeIsError,
    refetch: noticeIsRefetch,
  } = useQuery<NoticeResponse>('noticesList', () =>
    isTokenGetApi(`/notices/${routerID}`),
  );

  const [openSubLink, setOpenSubLink] = useState<boolean>(false);
  const [tabNumber, setTabNumber] = useState<number>(7);

  return (
    <WebBody>
      {memberType === 'COMPANY' ? (
        <WebBuyerHeader
          setOpenSubLink={setOpenSubLink}
          setTabNumber={setTabNumber}
          tabNumber={7}
          openSubLink={openSubLink}
        />
      ) : (
        <WebHeader />
      )}
      <Inner>
        <Wrapper>
          <Header>
            <div
              className="img-item"
              onClick={() => {
                router.back();
              }}
            >
              <Image
                style={{
                  cursor: 'pointer',
                  width: '18pt',
                  height: '18pt',
                }}
                src={BackImg}
                alt="btn"
              />
            </div>
            <span className="text">공지 사항</span>
          </Header>
          <Title>{notice?.data?.title}</Title>
          <Date>{adminDateFomat(notice?.data?.createdAt!)}</Date>
          <Line></Line>
          <BodyContainer>
            {/* <h3 className="name">1. 충전기 종류</h3> */}
            <p className="contents">{notice?.data?.content}</p>
          </BodyContainer>
        </Wrapper>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

export default Alam1_3;
const WebBody = styled.div`
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
  width: 900pt;
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
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
  @media (max-height: 500pt) {
    height: 100%;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 20pt;
`;
const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }

  @media (min-width: 900pt) {
    display: none;
  }
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 13.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  padding-top: 25.5pt;
  color: ${colors.main2};
`;
const Date = styled.div`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-left: 15pt;
  padding-top: 9pt;
  color: #caccd1;
`;
const Line = styled.div`
  padding-top: 18pt;
  border-bottom: 1px solid #e2e5ed;
  transform: rotate(0deg);
`;
const BodyContainer = styled(Box)`
  padding: 30pt 15pt 0 15pt;
  .name {
    font-weight: 700;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .contents {
    font-weight: 400;
    font-size: 12pt;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    padding-top: 9pt;
    color: ${colors.main2};
  }
`;
