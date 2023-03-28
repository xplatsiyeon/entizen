import styled from '@emotion/styled';
import colors from 'styles/colors';
import { GuideData } from './infomation';

type Props = {
  data: GuideData[];
};

const Tab2 = ({ data }: Props) => {
  return (
    <Wrapper>
      {/* 1번째 테이블 */}
      {/* <Table shadow={true}>
        <Caption shadow={true}>선택요금제도</Caption>
        <colgroup>
          <col className="fisrt-col" />
        </colgroup>
        <TableHeader>
          <tr>
            <th className="row-one">구분</th>
            <th className="row-two" colSpan={3}>
              내용
            </th>
          </tr>
        </TableHeader>
        <TableBody shadow={true}>
          <tr>
            <th>선택 (Ⅰ)</th>
            <td colSpan={3} className="contents">
              기본요금이 낮고 전력량요금이 높으므로 전기사용시간 (설비가동률)이
              월 200시간 이하인 고객에게 유리
            </td>
          </tr>
          <tr>
            <th>선택 (Ⅱ)</th>
            <td colSpan={3} className="contents">
              전기사용시간 (설비가동률)이 월 200시간 초과 500시간 이하인
              고객에게 유리
            </td>
          </tr>
          <tr>
            <th>선택 (Ⅲ)</th>
            <td colSpan={3} className="contents">
              기본요금이 높고 전력량요금이 낮으므로 전기사용시간 (설비가동률)이
              월 500시간 초과인 고객에게 유리
            </td>
          </tr>
        </TableBody>
      </Table> */}
      {/* 2번째 테이블 */}
      {/* <Table>
        <Caption>전압구분</Caption>
        <TableHeader>
          <tr>
            <th className="row-one">구분</th>
            <th className="row-two" colSpan={3}>
              내용
            </th>
          </tr>
        </TableHeader>
        <TableBody>
          <tr>
            <th>저압</th>
            <td colSpan={3} className="second-table-contents ">
              표준전압 220 V, 380 V 고객
            </td>
          </tr>
          <tr>
            <th>고압A</th>
            <td colSpan={3} className="second-table-contents ">
              표준전압 3,300 V 이상 66,000 V 이하 고객
            </td>
          </tr>
          <tr>
            <th>고압B</th>
            <td colSpan={3} className="second-table-contents ">
              표준전압 154,000 V 고객
            </td>
          </tr>
          <tr>
            <th>고압C</th>
            <td colSpan={3} className="second-table-contents ">
              표준전압 345,000 V 이상 고객
            </td>
          </tr>
        </TableBody>
      </Table> */}
      {/* 3번째 테이블 */}
      {/* <Table layout={'inherit'}>
        <Caption>계절별 시간대별 구분</Caption>
        <TableHeader>
          <tr>
            <th className="row-one">구분</th>
            <th>
              여름철
              <br />
              (6월~8월)
            </th>
            <th>
              봄·가을철
              <br />
              (3~5월,9~10월)
            </th>
            <th className="row-two">
              겨울철
              <br />
              (11월~2월)
            </th>
          </tr>
        </TableHeader>
        <TableBody>
          <tr>
            <th>경부하</th>
            <td className="third-table-contents-1">23:00~09:00</td>
            <td className="third-table-contents-1">23:00~09:00</td>
            <td className="third-table-contents-1">23:00~09:00</td>
          </tr>
          <tr>
            <th>중간부하</th>
            <td className="third-table-contents">
              09:00~10:00
              <br /> 12:00~13:00 <br />
              17:00~23:00
            </td>
            <td className="third-table-contents">
              09:00~10:00
              <br />
              12:00~13:00
              <br />
              17:00~23:00
              <br />
            </td>
            <td className="third-table-contents">
              09:00~10:00
              <br />
              12:00~17:00
              <br />
              20:00~22:00
              <br />
            </td>
          </tr>
          <tr>
            <th>최대부하</th>
            <td className="third-table-contents">
              10:00~12:00
              <br />
              13:00~17:00
              <br />
            </td>
            <td className="third-table-contents">
              10:00~12:00
              <br />
              13:00~17:00
              <br />
            </td>
            <td className="third-table-contents">
              10:00~12:00
              <br />
              17:00~20:00
              <br />
              22:00~23:00
              <br />
            </td>
          </tr>
        </TableBody>
      </Table> */}
      {data !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: data![0]?.content }} />
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
const Table = styled.table<{ layout?: string; shadow?: boolean }>`
  width: 100%;
  margin-top: 12pt;
  border-collapse: unset !important;
  table-layout: ${({ layout }) => (layout ? layout : 'fixed')};
  .fisrt-col {
    border-right: 1.5pt solid ${colors.lightGray};
  }
  &:not(:nth-of-type(1)) {
    margin-top: 27pt;
  }
  //box-shadow: ${({ shadow }) => shadow && '0px 3px 5px rgba(0, 0, 0, 0.25)'};
`;
const Caption = styled.caption<{ shadow?: boolean }>`
  text-align: left;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-bottom: 12pt;
  /* filter: ${({ shadow }) =>
    shadow && `drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))`}; */
`;
const TableHeader = styled.thead`
  background: #f9f7ff;
  & tr {
    font-size: 10.5pt;
    text-align: center;
    vertical-align: middle;
  }
  & th {
    border-right: 0.75px solid ${colors.lightWhite};
    padding: 7.5pt 0;
    text-align: center;
    vertical-align: middle;
  }
  .row-one {
    border-radius: 6pt 0 0 6pt;
  }
  .row-two {
    border-radius: 0 6pt 6pt 0;
  }
  .season {
    padding: 13.5pt 0;
  }
`;
const TableBody = styled.tbody<{ shadow?: boolean }>`
  // box-shadow: ${({ shadow }) => shadow && '0px 3px 5px rgba(0, 0, 0, 0.25)'};
  & th,
  td {
    text-align: center;
    vertical-align: middle;
    font-weight: 400;
    font-size: 9pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    border-bottom: 0.75pt solid #e2e5ed;
  }
  .contents {
    padding: 9pt 3pt 9pt 9pt;
  }
  .second-table-contents {
    padding: 12pt 1.5pt 9pt 9pt;
  }
  .third-table-contents-1 {
    padding: 12pt 0;
  }
  .third-table-contents {
    padding: 9pt 0pt;
  }
`;
