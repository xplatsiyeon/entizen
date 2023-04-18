import styled from '@emotion/styled';
import Image from 'next/image';
import ChargeInfo from 'public/guide/charge-info-img.png';
import Icon from 'public/guide/img-icon.svg';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GuideData } from './infomation';

type Props = {
  data: GuideData;
  getImg: (
    data: GuideData,
    setImgUrl: Dispatch<SetStateAction<string>>,
  ) => void;
  device: 'pc' | 'tablet' | 'mobile';
};

const Tab1 = ({ data, getImg, device }: Props) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    getImg(data, setImgUrl);
  }, [data, device]);
  return (
    <Container>
      {/* <Image src={ChargeInfo} alt="charging-img" /> */}
      {/* 앱 심사로 인해 일시적으로 주석 처리 */}
      {/* <Message>
        <p>표를 확대하시면 더 자세히 볼 수 있습니다.</p>
        <Image src={Icon} alt="icon" />
      </Message> */}
      {imgUrl && (
        <ImageBox>
          <Image
            src={imgUrl}
            alt={'guideImg'}
            priority={true}
            unoptimized={true}
            layout={'fill'}
            height={'100%'}
          />
        </ImageBox>
      )}
      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
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

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 240px;
  border-radius: 12pt;
  overflow: hidden;
  margin-bottom: 30pt;
`;
