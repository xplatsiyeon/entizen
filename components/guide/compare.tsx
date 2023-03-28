import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import CompareImg from 'public/guide/Compare.png';
import CompareImg2 from 'public/guide/guide1-2.png';
import { GuideData } from './infomation';

type Props = {
  data: GuideData[];
};

const Contract = ({ data }: Props) => {
  return (
    <Main>
      {/* <ImageWrap>
        <Image src={CompareImg} alt="info" />
      </ImageWrap>
      <ImageWrap>
        <Image src={CompareImg2} alt="info" />
      </ImageWrap>
      <TextBox>
        <li className="text-item">
          파트너들에게서 온 맞춤 견적들을 <span className="accent">내 견적서</span>에서 꼼꼼하게 비교해보세요.
        </li>
        <li className="text-item">
          <span className="accent">소통하기</span>에서 파트너 담당자 혹은
          entizen 전문가에게 문의할수도 있습니다!
        </li>
        <li className="text-item">
          꼭 맞는 상품을 찾으셨다면 설치장소 확인 후 최종 견적을 받을 수 있어요.
        </li>
        <li className="text-item">
          상품이 만족스러우시면 함께 할 파트너를 확정해주세요.
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

export default Contract;

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
  width: 645pt;
  &:nth-of-type(1) {
    display: none;
  }
  @media (max-width: 899.25pt) {
    width: auto;
    &:nth-of-type(1) {
      display: block;
    }
    &:nth-of-type(2) {
      display: none;
    }
  }
`;

const TextBox = styled(Box)`
  margin: 30pt auto 0pt;
  width: 645pt;
  padding: 0 10px;
  list-style-type: disc;

  .text-item {
    // padding-bottom: 15pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 30pt;
    letter-spacing: -0.02em;
  }
  .accent {
    color: ${colors.main};
  }

  @media (max-width: 899.25pt) {
    width: 100%;
    margin: 24pt auto 0;
    .text-item {
      font-size: 10.5pt;
      line-height: 16.5pt;
    }
  }
`;
