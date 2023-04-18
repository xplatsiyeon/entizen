import styled from '@emotion/styled';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
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
      {/* <Table>
        <thead>
          <tr>
            <th className="left">상품</th>
            <th>전체구독</th>
            <th className="right">부분구독</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>구독범위</td>
            <td>
              충전기 <br />
              설치공사 <br />
              운영관리 <br />
              통신망 <br />
              A/S <br />
              한전불입금 <br />
              전기 기본요금
            </td>
            <td>
              운영관리 <br />
              통신망 <br />
              A/S <br />
              한전불입금 <br />
              전기 기본요금 <br />
            </td>
          </tr>
          <tr>
            <td>초기 투자금</td>
            <td>-</td>
            <td>
              충전기 구입 및 <br /> 설치공사 비용
            </td>
          </tr>
          <tr>
            <td>충전요금</td>
            <td colSpan={2} className="one-line">
              수익지분에 따라 협의
            </td>
          </tr>
          <tr>
            <td>A/S</td>
            <td>
              구독기간 <br />내 무상
            </td>
            <td>
              제품 보증기간 <br /> 내 무상
            </td>
          </tr>
        </tbody>
      </Table>
      <Notice>
        * 소비자 과실로 인한 A/S는 비용이 발생될 수 있습니다. <br />
        * 전체구독 종료 후 충전기 소유권은 구매자에게 있습니다. <br />* 한전
        요금 규정에 따라 전기 기본요금과 전력량 요금은 달라질 수 있습니다.
      </Notice>
      <InfoBox>
        <Label>전체구독</Label>
        <Contents>
          충전기 구입부터 설치, 운영까지의 모든 비용이 구독범위에 포함된
          상품입니다. 충전기, 설치공사, 운영관리 등 산개되어 있는 상품들을
          하나로 묶어서 제공합니다.
        </Contents>

        <Label>부분구독</Label>
        <Contents>
          충전기 운영을 위한 서비스 구독 상품입니다. 구독범위에 충전기 및
          설치공사가 제외되어있어 구독료가 저렴합니다.
        </Contents>
        <Notice>
          *충전기가 없을 경우, 충전기 구입 및 설치를 위한 초기 투자금이
          필요합니다.
        </Notice>

        <Label>충전요금</Label>
        <Contents>
          수익지분에 따라 CaaS 사업자와 협의 가능하며, 추후 최대의 매출을 위한
          최적의 충전요금 진단 서비스가 런칭될 예정입니다.
        </Contents>
      </InfoBox> */}

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  tr {
    border-bottom: 0.75pt solid ${colors.borderColor};
  }
  th {
    width: 33.3%;
    border-right: 0.75pt solid ${colors.lightWhite};
    padding: 8.25pt 16.5pt 8.93pt 16.5pt;
    background-color: #f8f7fe;
    text-align: center;
    vertical-align: middle;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .left {
    border-radius: 6pt 0 0 6pt;
  }
  .right {
    border-radius: 0 6pt 6pt 0;
  }
  td {
    padding: 9pt 0;
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 15pt;
    text-align: center;
    vertical-align: middle;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .one-line {
    padding: 12pt 0;
  }
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 9pt;
  color: ${colors.gray2};
`;
const InfoBox = styled.div`
  padding-top: 45pt;
`;
const Label = styled.h3`
  font-weight: 700;
  font-size: 12pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  :not(:nth-of-type(1)) {
    padding-top: 27pt;
  }
`;
const Contents = styled.p`
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 12pt;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  min-height: 240px;
  border-radius: 12pt;
  overflow: hidden;
  margin-bottom: 30pt;
`;
