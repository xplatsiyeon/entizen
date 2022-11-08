import styled from '@emotion/styled';
import Image from 'next/image';
import CommonBtn from 'components/mypage/as/CommonBtn';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import { HandleColor } from 'utils/changeValue';
import { useQuery } from 'react-query';
import Sort from './Sort';
import { filterType } from 'pages/company/quotation';
import Search from './Search';

type Props = {};

interface Data {
  id: number;
  badge: string;
  location: string;
}
const History = ({}: Props) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const [checkedFilterIndex, setcheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] =
    useState<filterType>('마감일순 보기');

  return (
    <>
      <Sort
        checkedFilter={checkedFilter}
        setCheckedFilter={setCheckedFilter}
        checkedFilterIndex={checkedFilterIndex}
      />
      <Search searchWord={searchWord} setSearchWord={setSearchWord} />
      <ContentsContainer>
        {[1, 1, 1].map((el, index) => (
          <div key={index}>
            <Contents
            // key={el.id}
            // onClick={() =>
            //   router.push(`/company/recievedRequest/${el.quotationRequestIdx}`)
            // }
            >
              <DdayNAddress>
                <DdayBox>
                  {/* <CommonBtn
                  text={el.badge}
                  backgroundColor={HandleColor(el.badge)}
                  bottom={'12pt'}
                /> */}
                </DdayBox>
                {/* <AddressBox>{el.location}</AddressBox> */}
              </DdayNAddress>
              <IconBox>
                <ArrowIconBox>
                  <Image src={CaretDown24} alt="RightArrow" />
                </ArrowIconBox>
              </IconBox>
            </Contents>
          </div>
        ))}
      </ContentsContainer>
    </>
  );
};
const ContentsContainer = styled.div`
  margin-top: 18pt;
`;

const Contents = styled.div`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  cursor: pointer;
`;

const DdayBox = styled.div`
  margin-bottom: 16.5pt;
  cursor: pointer;
`;
const DdayNAddress = styled.div`
  position: relative;
`;

const AddressBox = styled.div`
  font-family: Spoqa Han Sans Neo;
  position: relative;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 12pt;
  color: ${colors.main2};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

export default History;
