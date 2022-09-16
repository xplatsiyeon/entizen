import styled from '@emotion/styled';
import colors from 'styles/colors';

const Tab2 = () => {
  return (
    <Container>
      <Label>선택요금제도</Label>
      <Table>
        <ShadowHeader>
          <tr className="shadow">
            <th className="left">구분</th>
            <th className="right">내용</th>
          </tr>
        </ShadowHeader>
        <ShadowBody>
          <div className="row">
            <span className="left">선택 (Ⅰ)</span>
            <span className="right">
              <p>
                기본요금이 낮고 전력량요금이 높으므로 <br /> 전기사용시간
                (설비가동률)이 월200시간 <br /> 이하인 고객에게 유리
              </p>
            </span>
          </div>
          <div className="row">
            <span className="left">선택 (Ⅱ)</span>
            <span className="right">
              <p>
                전기사용시간 (설비가동률)이 월 200시간
                <br />
                초과 500시간 이하인 고객에게 유리
              </p>
            </span>
          </div>
          <div className="row">
            <span className="left">선택 (Ⅲ)</span>
            <span className="right">
              <p>
                기본요금이 높고 전력량요금이 낮으므로 <br /> 전기사용시간
                (설비가동률)이 월 500시간 <br />
                초과인 고객에게 유리
              </p>
            </span>
          </div>
        </ShadowBody>
      </Table>

      <Label>전압구분</Label>
      <Table>
        <Header>
          <tr>
            <th className="left">구분</th>
            <th className="right">내용</th>
          </tr>
        </Header>
        <Body>
          <div className="row">
            <span className="left">저압</span>
            <span className="right">
              <p>표준전압 220 V, 380 V 고객</p>
            </span>
          </div>
          <div className="row">
            <span className="left">고압A</span>
            <span className="right">
              <p>표준전압 3,300 V 이상 66,000 V 이하 고객</p>
            </span>
          </div>
          <div className="row">
            <span className="left">고압B</span>
            <span className="right">
              <p>표준전압 154,000 V 고객</p>
            </span>
          </div>
          <div className="row">
            <span className="left">고압C</span>
            <span className="right">
              <p>표준전압 345,000 V 이상 고객</p>
            </span>
          </div>
        </Body>
      </Table>

      <Label>계절별 시간대별 구분</Label>
      <Table3>
        <Header3>
          <tr>
            <th className="start">구분</th>
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
            <th className="last">
              겨울철
              <br />
              (11월~2월)
            </th>
          </tr>
        </Header3>
        <Body3>
          <Row>
            <th>경부하</th>
            <td>23:00~09:00</td>
            <td>23:00~09:00</td>
            <td>23:00~09:00</td>
          </Row>
          <Row>
            <th>중간부하</th>
            <td>
              09:00~10:00
              <br /> 12:00~13:00 <br />
              17:00~23:00
            </td>
            <td>
              09:00~10:00
              <br />
              12:00~13:00
              <br />
              17:00~23:00
              <br />
            </td>
            <td>
              09:00~10:00
              <br />
              12:00~17:00
              <br />
              20:00~22:00
              <br />
            </td>
          </Row>
          <Row>
            <th>최대부하</th>
            <td>
              10:00~12:00
              <br />
              13:00~17:00
              <br />
            </td>
            <td>
              10:00~12:00
              <br />
              13:00~17:00
              <br />
            </td>
            <td>
              10:00~12:00
              <br />
              17:00~20:00
              <br />
              22:00~23:00
              <br />
            </td>
          </Row>
        </Body3>
      </Table3>
    </Container>
  );
};

export default Tab2;

const Container = styled.div`
  padding-bottom: 138.75pt;
`;
const Label = styled.div`
  display: block;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  letter-spacing: -0.02em;
  :not(:nth-child(1)) {
    margin-top: 27pt;
  }
  .shadow {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;
const Table = styled.table`
  width: 100%;
  margin-top: 12pt;
`;
const Header = styled.thead`
  display: flex;
  align-items: center;
  & tr {
    display: flex;
    width: 100%;
    gap: 0.75pt;
  }
  .left {
    width: 20%;
    padding: 7.5pt 11.25pt;
    border-radius: 6pt 0 0 6pt;
    background-color: #f8f7fe;
  }
  .right {
    width: 85%;
    background-color: #f8f7fe;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 6pt 6pt 0;
  }
`;

const Body = styled.tbody`
  .row {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.75pt solid ${colors.borderColor};
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 20pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 17.25pt 11.25pt;
    width: 20%;
  }
  .right {
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 15pt;
    font-size: 10.5pt;
  }
`;

const ShadowHeader = styled(Header)`
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  .left {
    border-right: 2pt solid ${colors.borderColor};
  }
`;
const ShadowBody = styled(Body)`
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  .left {
    border-right: 2pt solid ${colors.borderColor};
  }
`;
const Table3 = styled.table`
  margin-top: 12pt;
  width: 100%;
`;
const Header3 = styled.thead`
  & th {
    border-right: 0.75pt solid ${colors.lightWhite};
    background-color: #f8f7fe;
    text-align: center;
    vertical-align: middle;
    padding: 13.5pt 0;
  }
  .start {
    border-radius: 6pt 0 0 6pt;
  }
  .last {
    border-radius: 0 6pt 6pt 0;
  }
`;
const Body3 = styled.tbody``;
const Row = styled.tr`
  border-bottom: 0.75pt solid ${colors.borderColor};
  text-align: center;
  & th,
  td {
    font-weight: 400;
    font-size: 9pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    text-align: center;
    vertical-align: middle;
  }
  & td {
    padding: 12pt 0;
  }
`;
