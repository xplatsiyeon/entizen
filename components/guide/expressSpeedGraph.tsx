import styled from '@emotion/styled';
import colors from 'styles/colors';
import { GuideData } from './infomation';

type Props = {
  data: GuideData[];
};

const ExpressSpeedGraph = ({ data }: Props) => {
  return (
    <Wrapper>
      {/* <Table>
        <thead>
          <tr>
            <th className="left">충전기 용량</th>
            <th>
              충전 시간
              <br />
              (10 → 80%)
            </th>
            <th className="right">
              5분 충전 <br /> 주행거리
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>400 kW</td>
            <td>18분</td>
            <td>74 km</td>
          </tr>
          <tr>
            <td>350 kW</td>
            <td>18분</td>
            <td>74 km</td>
          </tr>
          <tr>
            <td>200 kW</td>
            <td>18분</td>
            <td>74 km</td>
          </tr>
          <tr>
            <td>100 kW</td>
            <td>33분</td>
            <td>42 km</td>
          </tr>
          <tr>
            <td>50 kW</td>
            <td>65분</td>
            <td>21 km</td>
          </tr>
        </tbody>
      </Table>
      <Notice>다음 조건을 기준으로 제공되는 정보입니다.</Notice>
      <Contents>
        <ol>아이오닉5 배터리 77.4 kWh 기준</ol>
        <ol>아이오닉5 연비 5.1km/kWh 기준</ol>
        <ol>배터리 충전량: 10% → 80%</ol>
        <ol>단일 충전 기준</ol>
        <br />
        <p>
          주 1) 충전시간은 사용환경에 따라 달라질 수 있으니 참고용으로
          활용바랍니다.
        </p>
        <br />
        <p>
          주 2) 전기차 스펙으로 인해 초급속 충전을 이용하더라도 평균 175 kW의
          전력으로 충전됩니다.
        </p>
      </Contents> */}
      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data![0]?.content }} />
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

export default ExpressSpeedGraph;

const Wrapper = styled.div`
  padding-top: 27pt;
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
    display: inline-block;
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
    border-bottom: 0.75pt solid #e2e5ed;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  th {
    width: 33.4%;
    border-right: 0.75pt solid ${colors.lightWhite};
    padding: 7.5pt 16.5pt 7.5pt 16.5pt;
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
  .two-line {
    padding: 6pt 0;
  }
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 45pt;
  color: ${colors.gray2};
`;
const Contents = styled.ul`
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 12pt;
  list-style-type: decimal;
  & li {
    margin-left: 20px;
  }
`;
