import styled from '@emotion/styled';
import colors from 'styles/colors';
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

const Share = ({ data, getImg, device }: Props) => {
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

export default Share;

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
const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  @media (max-width: 899.25pt) {
    display: block;
  }
`;
const BannerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Banner = styled.div`
  width: 100%;
  background-color: ${colors.main1};
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text-box {
    padding-left: 36.75pt;
    padding-top: 56px;
    padding-bottom: 56px;
  }
  .title {
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    font-size: 18pt;
    line-height: 22.5pt;
  }
  .text {
    padding-top: 18pt;
    font-weight: 400;
    font-size: 12pt;
    line-height: 19.5pt;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    opacity: 0.8;
  }
  .banner-icon {
    position: absolute;
    width: 269.25pt;
    right: 9pt;
  }
  @media (max-width: 899.25pt) {
    height: 282pt;
    flex-direction: column;
    .text-box {
      padding-top: 0;
      padding-bottom: 0;
    }
    .title {
      padding-top: 33pt;
      text-align: center;
      font-size: 15pt;
      line-height: 12pt;
    }
    .text {
      text-align: center;
      font-size: 10.5pt;
      line-height: 16.5pt;
    }
    .banner-icon {
      right: auto;
      bottom: -4px; // 배너 아이콘 위치 수정
    }
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  margin-bottom: 45pt;
  & > span {
    position: unset !important;
  }
  @media (max-width: 899.25pt) {
    margin-bottom: 36pt;
  }
`;
