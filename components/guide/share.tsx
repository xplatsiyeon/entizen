import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import BannerIcon from 'public/guide/guide-1-4-banner-icon.png';
import { GuideData } from './infomation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
      {/* <BannerBox>
        <Banner>
          <div className="text-box">
            <h1 className="title">수익지분이란?</h1>
            <p className="text">
              충전기 운영을 통해 발생하는 수익 중 본인이 <br />
              가지게 되는 지분을 말하며, 본인의 투자 비중에 <br />
              비례하여 CaaS 사업자와 수익을 나누게 됩니다.
            </p>
          </div>
          <div className="banner-icon">
            <Image src={BannerIcon} alt="banner-icon" />
          </div>
        </Banner>
      </BannerBox>

      <ContentsBox>
        <Wrap>
          <Label>1. 수익지분: 0%</Label>
          <Contents>
            <p>
              충전기 설치비 최저! <br />
              충전사업 수익은 CaaS 사업자 소유
            </p>
            <label>추전대상:</label>
            <ul className="list" style={{ listStyleType: 'disc' }}>
              <li>설치 목적이 편의, 복지 등일 경우</li>
              <li>수익 Simul 결과가 안좋을 경우</li>
              <li>회사, 아파트, 오피스텔 등</li>
            </ul>
          </Contents>
        </Wrap>
        <Wrap>
          <Label>2. 수익지분: 1~99%</Label>
          <Contents>
            <label>추전대상:</label>
            <ul className="list" style={{ listStyleType: 'disc' }}>
              <li>본인 투자금이 부담스러울 경우</li>
              <li>수익 Simul 결과가 만족스럽지 못할 경우</li>
              <li>카페,세차장,쇼핑몰,영화관 등</li>
            </ul>
          </Contents>
        </Wrap>
        <Wrap>
          <Label>3. 수익지분: 100%</Label>
          <Contents>
            <p>
              충전기 구입 및 설치 모두 본인 부담 <br />
              하지만, 충전사업 수익은 모두 본인 소유!!
            </p>
            <label>추전대상:</label>
            <ul className="list" style={{ listStyleType: 'disc' }}>
              <li>설치 목적이 전기차 충전사업일 경우</li>
              <li>수익 Simul 결과가 만족스러울 경우</li>
              <li>주유소, 충전소, 휴게소 등</li>
            </ul>
          </Contents>
        </Wrap>
      </ContentsBox>
      <Notice>
        * 홈 충전기는 수익지분과 무관한 상품입니다. <br />
      </Notice> */}
      {imgUrl && (
        <ImageBox>
          <Image
            src={imgUrl}
            alt={'guideImg'}
            priority={true}
            unoptimized={true}
            layout={'fill'}
          />
        </ImageBox>
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
const ContentsBox = styled.div`
  padding-top: 49.5pt;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 30pt;
  @media (max-width: 899.25pt) {
    display: block;
    padding-top: 7.5pt;
  }
`;
const Label = styled.label`
  flex: 1;
  display: block;
  font-weight: 700;
  font-size: 13.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  //margin-top: 27pt;
  @media (max-width: 899.25pt) {
    display: block;
    font-size: 12pt;
    margin-top: 27pt;
  }
`;
const Contents = styled.div`
  flex: 2;
  //padding-top: 12pt;
  font-weight: 400;
  font-size: 16px;
  line-height: 19.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  .list {
    list-style-type: disc;
    padding-left: 15pt;
  }
  @media (max-width: 899.25pt) {
    font-size: 10.5pt;
    padding-top: 12pt;
  }
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 64.5pt;
  text-align: end;
  color: ${colors.gray2};
  @media (max-width: 899.25pt) {
    padding-top: 27pt;
    text-align: start;
    font-size: 9pt;
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
