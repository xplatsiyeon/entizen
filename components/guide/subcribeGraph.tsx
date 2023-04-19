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

const SubcribeGraph = ({ data, getImg, device }: Props) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    getImg(data, setImgUrl);
  }, [data, device]);

  return (
    <Wrapper>
      {imgUrl && (
        <ImageWrapper>
          <PosterImage src={imgUrl} />
        </ImageWrapper>
      )}

      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default SubcribeGraph;

const Wrapper = styled.div`
  @media (max-width: 899.25pt) {
    padding-bottom: 180.75pt;
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
  width: 100%;
  position: relative;
  margin-bottom: 27pt;
  & > span {
    position: unset !important;
  }
  @media (max-width: 899.25pt) {
    margin-bottom: 9pt;
  }
`;
