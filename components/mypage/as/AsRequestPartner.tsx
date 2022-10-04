import Image from 'next/image';
import colors from 'styles/colors';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import tempCar from 'public/images/temp-car.jpg';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import { css } from '@emotion/react';
import { useCallback } from 'react';

interface Props {
  pb?: number;
}

const AsRequestPartner = ({ pb }: Props) => {
  // 파일 다운로드 함수
  const DownloadFile = useCallback(() => {
    let fileName = 'Charge Point 카탈로그_7 KW';
    let content = 'Charge Point 카탈로그_7 KW 테스트';
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
    window.URL.revokeObjectURL(url);
  }, []);

  return (
    <Wrapper>
      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>
      <Title>Charge Point</Title>
      <List>
        <Item>
          <span className="name">회사명</span>
          <span className="value">Charge Point</span>
        </Item>
        <Item>
          <span className="name">담당자</span>
          <span className="value">김전기</span>
        </Item>
        <Item>
          <span className="name">이메일</span>
          <span className="value">Charge@Charge Point.com</span>
        </Item>
        <Item>
          <span className="name">전화번호</span>
          <span className="value">010-1544-2080</span>
        </Item>
      </List>
      <ReceiptTitle>접수내용</ReceiptTitle>
      <SecondList>
        <Items>
          <span className="name">제목</span>
          <span className="value">
            100kW 충전기의 충전 건이 파손되었습니다.
          </span>
        </Items>
        <Items>
          <span className="name">담당자</span>
          <span className="value">
            사용자의 실수로 충전 건이 파손되었습니다.
            <br />
            수리 또는 교체 해주세요.
          </span>
        </Items>
        <Items>
          <span className="name">접수일자</span>
          <span className="value">2022.05.17 18:13 </span>
        </Items>
        <Items>
          <div className="name">첨부파일</div>
          <div className="value">
            <FileBtn onClick={DownloadFile}>
              <Image src={fileImg} alt="file-icon" />
              충전건 1.jpg
            </FileBtn>
            <FileBtn onClick={DownloadFile}>
              <Image src={fileImg} alt="file-icon" />
              충전건 2.jpg
            </FileBtn>
          </div>
        </Items>
      </SecondList>
      <ReceiptTitle>접수확인</ReceiptTitle>
      <SecondList>
        <Items>
          <span className="name">내용</span>
          <span className="value">
            파손 정도 파악 및 수리/교체를 위해
            <br />
            금주 중 방문하도록 하겠습니다.
          </span>
        </Items>
        <Items>
          <span className="name">접수일자</span>
          <span className="value">2022.05.18 20:21 </span>
        </Items>
      </SecondList>
      <ReceiptTitle>A/S결과</ReceiptTitle>
      <SecondList>
        <Items>
          <span className="name">내용</span>
          <span className="value">충전 건 교체</span>
        </Items>
        <Items>
          <span className="name">A/S일자</span>
          <span className="value">2022/05.20 14:52</span>
        </Items>
        <Items>
          <div className="name">첨부파일</div>
          <div className="value">
            <FileBtn onClick={DownloadFile}>
              <Image src={fileImg} alt="file-icon" />
              DSFJEIFKSL.jpg
            </FileBtn>
          </div>
        </Items>
      </SecondList>
    </Wrapper>
  );
};

export default AsRequestPartner;

const Wrapper = styled.div`
  padding-top: 21pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;

const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
`;

/*
const Wrap = styled.div`
width : 100% ;
height: 410pt;
overflow-y: scroll;

@media (max-width: 899pt) {
  height: 100%;
  overflow-y: auto;
}
` */

const Title = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  margin-top: 37.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const ReceiptTitle = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  margin-top: 18pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;

const List = styled.ul`
  margin-top: 15pt;
  padding-bottom: 18pt;
  gap: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
`;
const SecondList = styled.ul`
  margin-top: 15pt;
  padding-bottom: 18pt;
  gap: 12pt;
`;
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & button {
  }
`;
const Items = styled.li`
  display: flex;
  :not(:nth-of-type(1)) {
    margin-top: 12pt;
  }
  .name {
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    width: 41.25pt;
  }
  .value {
    font-size: 10.5pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    margin-left: 26.25pt;
    color: ${colors.main2};
    display: flex;
    gap: 6pt;
    flex-direction: column;
    justify-content: start;
  }
`;
const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Label = styled.h3`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  :nth-of-type(1) {
    padding-top: 15pt;
  }
  :nth-of-type(2) {
    padding-top: 24pt;
  }
`;
const FeaturesList = styled.ol`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  & li {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
`;
const GridImg = styled.div`
  display: grid;
  overflow-x: scroll;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 15pt;
  gap: 6pt;
`;
const GridItem = styled.div`
  background-color: blue;
  position: relative;
  border-radius: 6pt;
  width: 120pt;
  height: 144pt;
`;
const FileBtn = styled(Button)`
  display: flex;
  gap: 3pt;
  /* margin-top: 15pt; */
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 8px;
`;
const Contents = styled.p`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  padding-top: 15pt;
  color: ${colors.main2};
`;

// const Section = styled.section<{ grid?: boolean; pb?: number }>`
//   /* padding: 18pt 15pt; */
//   border-bottom: 0.75pt solid ${colors.lightGray};
//   padding-bottom: ${({ pb }) => pb + 'pt'};
//   ${({ grid }) =>
//     grid &&
//     css`
//       padding-right: 0;
//     `};
// `;
