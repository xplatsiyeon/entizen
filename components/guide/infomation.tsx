import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import InfoImg from 'public/guide/Information.png';
import InfoImg2 from 'public/guide/info2.png';

export type GuideData = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  guideIdx: number;
  guideKind: string;
  title: string;
  content: string;
};

type Props = {
  data: GuideData[];
};

const infomation = ({ data }: Props) => {
  return (
    <Main>
      {/* <ImageWrap>
        <Image src={InfoImg} alt="info" />
      </ImageWrap>
      <ImageWrap2>
        <Image src={InfoImg2} alt="info" />
      </ImageWrap2>
      <TextBox>
        <li className="text-item">
          <span className="accent">엔티즌 도서관</span>에서 전기차와 충전기에
          대해 쉽고 간단하게 알려드려요.
        </li>
        <li className="text-item">
          나에게 딱 맞는 충전기와 구독 모델을{' '}
          <span className="accent">가이드</span>에서 확인 해보세요.
        </li>
        <li className="text-item">
          내가 받을 수 있는 보조금 또한 <span className="accent">가이드</span>
          에서 확인 할 수 있어요.
        </li>
        <li className="text-item">
          설치할 장소의 예상 수익을 <span className="accent">홈</span>에서
          확인해보는 것도 잊지마세요!
        </li>
        <li className="text-item">
          <span className="accent">간편견적</span>에서 몇번의 클릭만으로
          예상견적을 확인하고, 연결된 파트너들에게 맞춤 상품을 요청하세요.
        </li>
      </TextBox> */}
      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data![0]?.content }} />
      ) : (
        <></>
      )}
    </Main>
  );
};

export default infomation;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* padding: 45pt 15pt 0 15pt; */
  padding: 45pt 200pt 0 200pt;

  @media (max-width: 899.25pt) {
    padding: 27pt 15pt 0 15pt;
  }

  div {
    width: 100%;
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
    display: inline-block;
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
`;
const ImageWrap = styled.div`
  display: none;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;
const ImageWrap2 = styled.div`
  display: block;
  width: 645pt;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const TextBox = styled(Box)`
  margin: 30pt auto 0pt;
  width: 645pt;
  padding: 0 10px;
  list-style-type: disc;
  font-family: 'Spoqa Han Sans Neo';

  .text-item {
    //padding-bottom: 15pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 30pt;
    letter-spacing: -0.02em;
  }

  @media (max-width: 899.25pt) {
    width: 100%;
    margin: 24pt auto 0;
    .text-item {
      font-size: 10.5pt;
      line-height: 16.5pt;
    }
  }

  .accent {
    color: ${colors.main};
  }
`;
