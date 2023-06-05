import styled from '@emotion/styled';
import { GuideData } from './infomation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PosterImage from 'components/PostImages';

type Props = {
  data: GuideData;
  getImg: (
    data: GuideData,
    setImgUrl: Dispatch<SetStateAction<string>>,
  ) => void;
  device: 'pc' | 'tablet' | 'mobile';
};

const monitoring = ({ data, getImg, device }: Props) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    getImg(data, setImgUrl);
  }, [data, device]);
  return (
    <Main>
      {imgUrl && (
        <ImageWrapper>
          <PosterImage src={imgUrl} />
        </ImageWrapper>
      )}

      <TextWrap>
        {data !== undefined ? (
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        ) : (
          <></>
        )}
      </TextWrap>
    </Main>
  );
};

export default monitoring;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  /* width: 100%; */
  margin-bottom: 30pt;
  max-width: 645pt;
  position: relative;
  & > span {
    position: unset !important;
  }
  @media (max-width: 899.25pt) {
    margin-bottom: 24pt;
  }
`;
const TextWrap = styled.div`
  max-width: 645pt;
`;
