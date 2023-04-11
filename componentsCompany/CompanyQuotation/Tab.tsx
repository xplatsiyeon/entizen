import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
};
const tabName = ['받은 요청', '보낸 견적', '히스토리'];

const Tab = ({ tabNumber, setTabNumber }: Props) => {
  return (
    <>
      <TabBox>
        {tabName.map((el, index) => (
          <TabLists key={index} onClick={() => setTabNumber(index)}>
            <TabList
              className={
                tabNumber !== undefined && tabNumber === index ? 'selected' : ''
              }
            >
              {el}
            </TabList>
            {tabNumber === index && <BottomLine></BottomLine>}
          </TabLists>
        ))}
      </TabBox>
    </>
  );
};

const TabBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 9.75pt;
  border-bottom: 1px solid #f3f4f7;
`;
const TabLists = styled.div`
  color: #caccd1;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12pt;
  font-weight: 500;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
  & .selected {
    color: ${colors.main};
    font-weight: 700;
  }
`;
const TabList = styled.div`
  text-align: center;
`;
const BottomLine = styled.div`
  width: 100%;
  border: 1.5pt solid ${colors.main};
  margin-top: 12pt;
  border-radius: 2pt;
`;

export default Tab;
