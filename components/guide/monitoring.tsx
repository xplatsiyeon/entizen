import styled from '@emotion/styled';
import { Box } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import Monitoring from 'public/guide/monitoring.png';
import Monitoring2 from 'public/guide/guide1-3.png';
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

const monitoring = ({ data, getImg, device }: Props) => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    getImg(data, setImgUrl);
  }, [data, device]);
  return (
    <Main>
      {/* <ImageWrap>
        <Image src={Monitoring} alt="info" />
      </ImageWrap>
      <ImageWrap>
        <Image src={Monitoring2} alt="info" />
      </ImageWrap>
      <TextBox>
        <li className="text-item">
          <span className="accent">내 프로젝트</span>에서 계약과 설치 프로세스
          모니터링을 할 수 있습니다.
        </li>
        <li className="text-item">앤티즌 안에서 안전한 계약을 진행하세요.</li>
        <li className="text-item">
          계약서에 상품내용이 잘 반영 되었는지 검토해주세요!
        </li>
        <li className="text-item">
          프로젝트는 계약, 준비, 설치, 검수, 완료 단계로 진행됩니다.
        </li>
        <li className="text-item">
          현재 진행중인 단계 및 각 단계별 내용과 완료 예정일을 확인 할 수
          있습니다.
        </li>
        <li className="text-item">
          완료 단계에 오면 현장에서 제품 상태를 확인하시고 프로젝트 완료에
          동의해주세요.
        </li>
        <li className="text-item">
          엔티즌에서 최종 확인 후, 프로젝트가 완료 됩니다.
        </li>
      </TextBox> */}
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
    </Main>
  );
};

export default monitoring;

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
    //padding-bottom: 15pt;
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

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 240px;
  border-radius: 12pt;
  overflow: hidden;
  margin-bottom: 30pt;
`;
