import styled from '@emotion/styled';
import PosterImage from 'components/PostImages';
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
        <ImageWrapper>
          <PosterImage src={imgUrl} />
        </ImageWrapper>
      )}
      {data !== undefined ? (
        <BodyText dangerouslySetInnerHTML={{ __html: data?.content }} />
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
const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  & > span {
    position: unset !important;
  }
`;
const BodyText = styled.div`
  margin-top: 45pt;
  @media (max-width: 899.25pt) {
    margin-top: 27pt;
  }
`;
