import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import React, { useLayoutEffect } from 'react';
import BackImg from 'public/images/back-btn.svg';
import { Box } from '@mui/material';
import { getApi } from 'api';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';

type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Term = ({ setTabNumber }: Props) => {
  const router = useRouter();
  const memberType = JSON.parse(sessionStorage?.getItem('MEMBER_TYPE')!);
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  const onClickBack = () => {
    const {
      query: { userType },
    } = router;
    if (userType === 'SNS') {
      router.replace('signUp/SnsTerms');
    } else {
      if (router.query.setting && router.query.setting === 'true') {
        router.replace({
          pathname: 'signUp/Terms',
          query: {
            setting: 'true',
            userType: userType,
          },
        });
        // 다이렉트로 페이지 이동은 router.back()
      } else if (router.query.direct && router.query.direct === 'true') {
        router.back();
        // 설정페이지에서 이동
      } else {
        setTabNumber(0);
      }
    }
  };

  // 유저 약관동의
  const { data: userTerm } = useQuery<any>('user-term', () =>
    getApi(`/terms/service-for-user`),
  );
  // 파트너 약관동의
  const { data: companyTerm } = useQuery<any>('company-term', () =>
    getApi(`/terms/service-for-company`),
  );

  useLayoutEffect(() => {
    window.scrollBy(0, -window.innerHeight);
  }, []);

  // ①②③④⑤⑥⑦⑧⑨⑩
  return (
    <WebRapper>
      {mobile && (
        <Header>
          <div className="img-item" onClick={onClickBack}>
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
          <span className="text">이용 약관</span>
        </Header>
      )}

      <Wrapper>
        {/* 이용 약관 */}
        {memberType === 'COMPANY' ? (
          <div dangerouslySetInnerHTML={{ __html: companyTerm }} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: userTerm }} />
        )}
      </Wrapper>
    </WebRapper>
  );
};

const WebRapper = styled.div`
  @media (min-width: 900pt) {
    padding-top: 42pt;
    padding-bottom: 132pt;
    width: 580.5pt;
    box-shadow: 0pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
    border-radius: 12pt;
  }
`;

const Wrapper = styled.div`
  white-space: pre;
  width: 100%;
  position: relative;

  div {
    width: 100%;
    white-space: pre;
  }
  img {
    width: 100%;
  }
  ul {
    list-style-position: outside !important;
    li {
      display: flex;
    }
    li::before {
      content: '•';
      border-radius: 50%;
      padding-inline: 5px;
      text-align: center;
    }
  }
  ol {
    list-style-type: decimal !important;
    padding: 10px;
  }
  /* :focus {
      border: none;
    } */
  em {
    font-style: italic;
  }
  p {
    width: 100%;
    position: relative;
    word-break: break-all;
    white-space: pre-line;
    span {
      width: 100%;
      display: inline-block;
      word-break: break-all;
      white-space: pre-line;
    }
  }
  span {
    width: 100%;
    display: inline-block;
  }
  padding-left: 15pt;
  padding-right: 15pt;
  @media (min-width: 900pt) {
    padding: 0 38.25pt;
    max-height: 468.75pt;
    overflow-y: scroll;
    /* img {
      width: 150px;
    } */
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  position: sticky;
  top: 0;
  background-color: ${colors.lightWhite};
  z-index: 99999;
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
`;

const Title = styled.div`
  margin-top: 21pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 18pt;
    font-weight: 700;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Subtitle = styled.div`
  margin-top: 34pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 700;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const SubSubtitle = styled.div`
  margin-top: 24pt;
  & span {
    font-family: Spoqa Han Sans Neo;
    font-size: 12pt;
    font-weight: 400;
    line-height: 15pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const Content = styled.div`
  margin-top: 15pt;
  padding-left: 29.25pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #111111;
  & li {
    :first-child {
      padding-top: 10pt;
    }
    padding-bottom: 5pt;
  }
  .boldText {
    font-weight: 600;
  }
`;

const HowTo = styled.div`
  margin-top: 15pt;
  padding-left: 29.25pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #111111;
`;

const HowToTitle = styled.div`
  margin-top: 15pt;
  padding-left: 29.25pt;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 10.5pt;
  font-weight: 600;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #111111;
`;

const ImgBox = styled.img`
  width: 100%;
`;

const Line = styled.div`
  width: 100%;
  border-top: 0.75pt solid black;
`;

const Contents = styled.div``;

const FlexWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15pt;
`;

const FlexWrap2 = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10pt;
`;

export default Term;
