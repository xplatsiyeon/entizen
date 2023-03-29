import styled from '@emotion/styled';
import Image from 'next/image';
import ChargeInfo from 'public/guide/charge-info-img.png';
import Icon from 'public/guide/img-icon.svg';
import { GuideData } from './infomation';

type Props = {
  data: GuideData[];
};

const Tab1 = ({ data }: Props) => {
  return (
    <Container>
      {/* <Image src={ChargeInfo} alt="charging-img" /> */}
      {/* 앱 심사로 인해 일시적으로 주석 처리 */}
      {/* <Message>
        <p>표를 확대하시면 더 자세히 볼 수 있습니다.</p>
        <Image src={Icon} alt="icon" />
      </Message> */}
      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data![0]?.content }} />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Tab1;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8.25pt;

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
const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 15pt;
  & p {
    font-weight: 500;
    font-size: 9pt;
    line-height: 9pt;
    text-align: center;
    letter-spacing: -0.18pt;
    color: #a6a9b0;
  }
`;
