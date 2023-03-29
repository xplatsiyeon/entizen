import styled from '@emotion/styled';
import colors from 'styles/colors';
import Image from 'next/image';
import React from 'react';
import BackImg from 'public/images/back-btn.svg';
import { Box, Switch } from '@mui/material';
import { useQuery } from 'react-query';
import { getApi, isTokenGetApi } from 'api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import term1 from 'public/images/term1.png';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};

const PersonalDataPolicy = ({ setTabNumber }: Props) => {
  const router = useRouter();

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

  const {
    data: term,
    isLoading: termLoading,
    isError: termError,
    refetch: termRefetch,
  } = useQuery<any>('faq-list', () => getApi(`/terms/personal-info`));

  console.log('term', term);

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
          <span className="text">개인정보처리방침</span>
        </Header>
      )}

      {/* <Wrapper>
 
        <Title>
          <span>엔티즌 플랫폼 개인정보처리방침</span>
        </Title>
        <Content>
          <Line />
          <ul>
            <li>1. 개인정보처리방침</li>
            <li>2. 개인정보 수집 및 이용</li>
            <li>3. 개인정보 제공</li>
            <li>4. 개인정보 파기</li>
            <li>5. 개인정보 자동수집 장치의 설치•운영 및 거부에 관한 사항</li>
            <li>6. 기타사항</li>
            <li>7. 개인정보처리방침 변경</li>
          </ul>
          <Line />
        </Content>
        <Subtitle>
          <span>1. 개인정보처리방침</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 개인정보처리방침의  목적'}`}</span>
        </SubSubtitle>
        <Content>
          엘에스일렉트릭(주)(이하 “회사”라고 합니다)는 여러분의 개인정보를
          수집할 때 반 드시 동의를 받고 수집합니다. 이용자 분들 한 분, 한 분의
          권리를 적극적으로 보장하기 위하여 본 개인정보처리방침을 마련하여 모든
          임직원이 준수하고 있 습니다. 회사는 여러분의 개인정보를 소중히 다루며,
          이용자 모두가 안심하고 서비스를 이용할 수 있도록 최선의 노력을 다할
          것을 약속드립니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 회사의 노력'}`}</span>
        </SubSubtitle>
        <Content>
          구체적으로 회사는 개인정보 처리와 관련하여 다음의 노력을 하고
          있습니다.
          <br />• 이용자의 개인정보를 암호화하여 저장합니다. <br />• 해킹이나
          컴퓨터 바이러스로부터 보호하기 위하여 방어 시스템을 갖추고 있 습니다.
          <br />• 회사 직원 중에서도 최소한의 인원만이 이용자의 개인정보에
          접근할 수 있 습니다. <br />• 개인정보에 접근할 수 있는 임직원에게 관련
          교육을 정기적으로 실시하고 있습니다. <br />• 인정보보호 및 방법에 대해
          국내 및 국제 인증 규격을 충족하고 있습니다.
        </Content>
        <Subtitle>
          <span>2. 개인정보 수집 및 이용</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 수집항목'}`}</span>
        </SubSubtitle>
        <Content>
          회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 어플리케이션을
          통해 아래와 같은 서비스를 제공하기 위하여 필요한 최소한의 개인 정보를
          수집하고 있습니다.
          <ImgBox src="/images/term1.png" alt="1" />
          <ImgBox src="/images/term2.png" alt="2" />
        </Content>
        <SubSubtitle>
          <span>{`${'나) 수집  방법'}`}</span>
        </SubSubtitle>
        <Content>
          회사는 다음과 같은 방법을 통해 개인정보를 수집합니다.
          <br />• 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해
          동 의를 하고 직접 정보를 입력하는 경우 <br />• 제휴 서비스 또는
          단체로부터 개인정보를 제공받은 경우
        </Content>
        <SubSubtitle>
          <span>{`${'다) 보존 기간'}`}</span>
        </SubSubtitle>
        <Content>
          회사는 이용자의 서비스 마지막 이용일 / 회원 탈퇴 후 1년이 되는 시점
          또는 법령에 따른 보존 기간이 경과되는 시점에 보관하던 해당 이용자의
          모든 개인정 보를 삭제합니다.
        </Content>
        <Subtitle>
          <span>3. 개인정보 제공</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 위탁업체  제공 '}`}</span>
        </SubSubtitle>
        <Content>
          회사의 서비스 제공을 위해 협력하는 외부 위탁업체에게 회사는 업무
          수행을 위하여 필요한 범위내에서 개인정보 처리를 위탁하고 있습니다.
          <ImgBox src="/images/term3.png" alt="3" />
          회사는 서비스 제공의 안정성과 최신 기술을 이용자에게 제공하기 위해
          국외에 개인정보를 위탁하고 있으며, 이용자로부터 취득 또는 생성한
          개인정보를 AWS (Amazon Web Services Inc.)가 보유하고 있는
          데이터베이스(물리적 저장 장소: 일 본)에 저장합니다. AWS는 해당 서버의
          물리적인 관리만을 행하고, 이용자의 개 인정보에 접근할 수 없습니다.
          <ImgBox src="/images/term4.png" alt="4" />
        </Content>
        <SubSubtitle>
          <span>{`${'나) 제3자  제공 '}`}</span>
        </SubSubtitle>
        <Content>
          회사는 제3자에게 개인정보를 제공하지 않습니다. 다만, 이용자에게 별도
          동의 를 받은 경우 또는 법령에 규정된 경우에는 제공할 수 있습니다.
        </Content>
        <Subtitle>
          <span>4. 개인정보 파기</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 이용목적  달성시  파기'}`}</span>
        </SubSubtitle>
        <Content>
          개인정보는 수집 및 이용목적이 달성되면 지체없이 파기합니다. 전자적
          파일 형 태로 보관하던 개인정보는 복구 및 재생되지 않도록 안전하게
          삭제하고, 그 밖 에 기록물, 인쇄물, 서면 등의 경우 분쇄하거나
          소각합니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 법령에 따른 보관'}`}</span>
        </SubSubtitle>
        <Content>
          법령에 따라 일정 기간 보관해야 하는 개인정보 및 해당 법령은 아래 표와
          같 습니다.
          <ImgBox src="/images/term5.png" alt="5" />
        </Content>
        <Subtitle>
          <span>5. 개인정보 자동수집 장치의 설치•운영 및 거부에 관한 사항</span>
        </Subtitle>
        <Content>
          회사는 이용자에게 특화된 맞춤서비스를 제공하기 위해서 이용자들의
          정보를 수시로 저장하고 불 러오는 '쿠키(cookie)'를 운용하는 경우가
          있습니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버 가 이용자의
          브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터
          하드디스크에 저장됩니다.
        </Content>
        <SubSubtitle>
          <span>{`${'가) 사용  목적'}`}</span>
        </SubSubtitle>
        <Content>
          이용자가 회사 웹사이트에 방문할 경우 웹사이트 서버는 이용자의
          디바이스에 저장되어 있는 쿠키의 내용을 읽어 이용자의 환경설정을
          유지하고 맞춤화된 서 비스를 제공하게 됩니다. 물론 이용자는 쿠키 설치에
          대한 선택권을 가지고 있습니다. 이용자는 웹브라우 저에서 옵션을
          설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확 인을
          거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 쿠키  설정  거부  방법'}`}</span>
        </SubSubtitle>
        <Content>
          쿠키 설정을 거부하는 방법으로는 이용자가 사용하는 웹 브라우저의 옵션을
          선 택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을
          거치거나, 모 든 쿠키의 저장을 거부하는 방법이 있습니다.
          <br />
          <HowTo style={{ paddingTop: '10pt' }}> [설정방법의 예]</HowTo>
          <HowToTitle>{`${'1) Chrome의  경우'}`}</HowToTitle>
          <HowTo>{`웹  브라우저  우측의  설정  메뉴  >  화면  하단의  고급  설정  표시  >  개인정보
의  콘텐츠  설정  버튼  >  쿠키`}</HowTo>
          <HowToTitle>{`${'2) firefox의  경우'}`}</HowToTitle>
          <HowTo>{`옵션  메뉴  >  개인정보    방문기록-사용자  정의  설정  >  쿠키수준  설정`}</HowTo>
          <HowToTitle>{`${'3) safari의  경우'}`}</HowToTitle>
          <HowTo>{`환경설정  메뉴  >  개인정보  탭  >  쿠키  및  웹  사이트  데이터  수준  설정`}</HowTo>
          단, 쿠키 설치를 거부하였을 경우 로그인이 필요한 일부 서비스 이용에
          어려움 이 있을 수 있습니다.
        </Content>
        <Subtitle>
          <span>6. 가명정보 처리에 관한 사항</span>
        </Subtitle>
        <Content>
          회사는 수집한 개인정보의 일부를 삭제하거나 일부 또는 전부를 대체하는
          등의 방법으로 추가 정 보가 없이는 특정 개인을 알아볼 수 없도록
          가명처리하여 이용하는 경우, 원래의 상태로 복원하 기 위한 추가 정보를
          별도로 분리하여 보관ᆞ관리하는 등 해당 정보가 분실ᆞ도난ᆞ유출ᆞ위조ᆞ 변조
          또는 훼손되지 않도록 안전성 확보에 필요한 기술적ᆞ관리적 및 물리적
          조치를 취하고 있습니다.
        </Content>

        <Subtitle>
          <span>7. 기타사항</span>
        </Subtitle>
        <SubSubtitle>
          <span>{`${'가) 이용자의  권리'}`}</span>
        </SubSubtitle>
        <Content>
          이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며,
          수집・이 용에 대한 동의 철회 또는 가입 해지를 요청할 수 있습니다.
        </Content>
        <SubSubtitle>
          <span>{`${'나) 개인정보  수정  및  삭제  요청'}`}</span>
        </SubSubtitle>
        <Content>
          이용자는 자신의 개인정보에 대한 수정 및 삭제를 요청할 수 있습니다.
          수정의 경우 회사는 수정 완료 전까지 해당 개인정보의 이용을 중지하며,
          삭제의 경우 요청 즉시 개인정보를 삭제합니다.
        </Content>
        <SubSubtitle>
          <span>{`${'다) 개인정보  보호책임자'}`}</span>
        </SubSubtitle>
        <Content>
          • 책임자: 이름 (직책) <br />• 담당부서
          <br />• 연락처: 전화번호, 이메일 <br />
          <br />
          개인정보가 침해되어 이에 대한 신고나 상담이 필요하신 경우에는 아래
          기관에 문의하셔서 도움 을 받으실 수 있습니다.
        </Content>
        <SubSubtitle>
          <span>{`${'개인정보침해  신고센터'}`}</span>
        </SubSubtitle>
        <Content>
          • (국번없이)118 <br />
          <a href="https://privacy.kisa.or.kr/main.do">
            {`• https://privacy.kisa.or.kr/main.do`}
          </a>
        </Content>
        <SubSubtitle>
          <span>{`${'대검찰청  사이버수사과'}`}</span>
        </SubSubtitle>
        <Content>
          • (국번없이)1301 <br />
          <a href="cid@spo.go.kr">{`• cid@spo.go.kr`}</a>
        </Content>
        <SubSubtitle>
          <span>{`${'경찰청  사이버안전국'}`}</span>
        </SubSubtitle>
        <Content>
          • (국번없이)182 <br />
          <a href="https://cyberbureau.police.go.kr">{`• https://cyberbureau.police.go.kr`}</a>
        </Content>
        <Subtitle>
          <span>8. 개인정보처리방침 변경</span>
        </Subtitle>
        <Content>
          회사는 법률이나 서비스의 변경에 따라 개인정보처리방침을 개정할 수
          있습니다. 개인정보처리방 침을 개정하는 경우 웹사이트 공지사항(또는
          개별공지)을 통하여 공지할 것입니다.
          <br />
          <br /> 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이
          이용자 권리의 중대한 변경이 발생 할 때에는 최소 30일 전에 미리
          알려드리겠습니다.
          <br />
          <br />• 공고 일자:
          <br />
          <br />• 시행 일자:
        </Content>

      </Wrapper> */}
      <Wrapper>
        <div dangerouslySetInnerHTML={{ __html: term }} />
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
  div {
    white-space: pre;
  }
  img {
    width: 100%;
  }
  ul {
    /* list-style: circle !important; */
    /* padding: 10px; */
    /* list-style-position: initial; */
    list-style-position: outside !important;
    li {
      display: flex;
    }
    li::before {
      content: '•';
      border-radius: 50%;
      padding-inline: 5px;
      text-align: center;

      /* margin-inline-end: 5px; */
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
  }
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
`;

const Title = styled.div`
  margin-top: 21pt;
  & span {
    font-family: 'Spoqa Han Sans Neo';
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
    font-family: 'Spoqa Han Sans Neo';
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
    font-family: 'Spoqa Han Sans Neo';
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

export default PersonalDataPolicy;
