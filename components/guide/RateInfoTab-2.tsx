import styled from '@emotion/styled';
import PosterImage from 'components/PostImages';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import { GuideData } from './infomation';

type Props = {
  data: GuideData[];
  getImg: (
    data: GuideData,
    setImgUrl: Dispatch<SetStateAction<string>>,
  ) => void;
  device: 'pc' | 'tablet' | 'mobile';
};

const Tab2 = ({ data, getImg, device }: Props) => {
  console.log('🔥 data : ', data);
  const [imgUrl1, setImgUrl1] = useState('');
  const [imgUrl2, setImgUrl2] = useState('');
  const [imgUrl3, setImgUrl3] = useState('');

  useEffect(() => {
    getImg(data[0], setImgUrl1);
    getImg(data[1], setImgUrl2);
    getImg(data[2], setImgUrl3);
  }, [data, device]);

  return (
    <Wrapper>
      <Label pt={device === 'pc' ? 18 : 6.75}>선택요금제도</Label>
      {imgUrl1 && (
        <ImageWrapper>
          <PosterImage src={imgUrl1} />
        </ImageWrapper>
      )}
      <Label pt={device === 'pc' ? 36 : 26.25}>전압구분</Label>
      {imgUrl2 && (
        <ImageWrapper>
          <PosterImage src={imgUrl2} />
        </ImageWrapper>
      )}
      <Label pt={device === 'pc' ? 36 : 33}>계절별 시간대별 구분</Label>
      {imgUrl3 && (
        <ImageWrapper className="last">
          <PosterImage src={imgUrl3} />
        </ImageWrapper>
      )}
      {data !== undefined ? (
        <BodyText dangerouslySetInnerHTML={{ __html: data[0]?.content }} />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default Tab2;

const Wrapper = styled.div`
  padding-bottom: 138.75pt;
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
const Label = styled.label<{ pt: number }>`
  display: block;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: ${({ pt }) => pt}pt;
  color: ${colors.main2};
  margin-bottom: 12pt;
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
