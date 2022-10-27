import styled from '@emotion/styled';
import ChangeDateModal from 'componentsCompany/Modal/ChangeDateModal';
import Image from 'next/image';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import React, { useState } from 'react';
import colors from 'styles/colors';

type Props = {
  textOne: boolean;
  textTwo: string;
  textThree: string;
  textFour: string;
  textFive?: string;
  beforeFinish?: boolean;
  btnText: string;
};

const Reusable = ({
  textOne,
  textTwo,
  textThree,
  textFour,
  textFive,
  beforeFinish,
  btnText,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // 토글된거 들어가서 연 모달 일정변경
  const [selectedDay, setSelectedDay] = useState<string>('');

  return (
    <>
      {modalOpen && (
        <ChangeDateModal
          selectedDays={selectedDay}
          SetSelectedDays={setSelectedDay}
          exit={() => setModalOpen(false)}
        />
      )}
      {!modalOpen && (
        <>
          <DoubleArrowBox>
            <Image src={DoubleArrow} alt="doubleArrow" />
          </DoubleArrowBox>
          <Wrapper>
            <Box>
              <Top>
                <div className="expectedDate">
                  {textOne ? '완료일' : '완료 예정일'}
                </div>
                <div className="changeDate" onClick={() => setModalOpen(true)}>
                  일정 변경 요청
                </div>
              </Top>
              <Date>2022년 4월 26일</Date>
              <SubTitle>{textTwo}</SubTitle>
              <ListBox>
                <li>{textThree}</li>
                <li>{textFour}</li>
                {textFive && <li>{textFive}</li>}
              </ListBox>
            </Box>
            <Button beforeFinish={beforeFinish}>{btnText}</Button>
          </Wrapper>
        </>
      )}
    </>
  );
};

const DoubleArrowBox = styled.div`
  margin: 21pt auto 24pt auto;
  width: 24pt;
  height: 24pt;
`;
const Wrapper = styled.div`
  position: relative;
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
`;

const Box = styled.div`
  width: 100%;
  border-radius: 6pt;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  padding: 12pt 13.5pt 9pt 13.5pt;
  box-sizing: border-box;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  .expectedDate {
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  .changeDate {
    padding: 4.5pt 7.5pt;
    border: 1px solid #e2e5ed;
    border-radius: 6pt;
    color: #a6a9b0;
    font-family: Spoqa Han Sans Neo;
    font-size: 9pt;
    font-weight: 500;
    line-height: 9pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const Date = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #5221cb;
  margin-top: 3pt;
`;

const SubTitle = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 30pt;
`;

const ListBox = styled.div`
  margin-top: 6pt;
  display: flex;
  flex-direction: column;

  & li {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

const Button = styled.div<{ beforeFinish?: boolean }>`
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  background-color: ${colors.main};
  color: #ffffff;
  text-align: center;
  border-radius: 6pt;
  margin-top: ${({ beforeFinish }) => (beforeFinish ? 38.25 : 48.75)}pt;
  box-sizing: border-box;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

export default Reusable;
