import styled from '@emotion/styled';
import { GuideImages } from 'pages/guide/platform';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PosterImage from 'components/PostImages';

export type GuideData = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  guideIdx: number;
  guideKind: string;
  title: string;
  content: string;
  guideImages: GuideImages[];
};

type Props = {
  data: GuideData;
  getImg: (
    data: GuideData,
    setImgUrl: Dispatch<SetStateAction<string>>,
  ) => void;
  device: 'pc' | 'tablet' | 'mobile';
};

const infomation = ({ data, getImg, device }: Props) => {
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

      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
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
  margin-bottom: 30pt;
  & > span {
    position: unset !important;
  }
  @media (max-width: 899.25pt) {
    margin-bottom: 24pt;
  }
`;
