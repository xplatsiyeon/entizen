import styled from '@emotion/styled';
import Image from 'next/image';
import CommonBtn from 'components/mypage/as/CommonBtn';
import CaretDown24 from 'public/images/CaretDown24.png';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';

type Props = {
  checkedFilterIndex: number;
};

interface Data {
  id: number;
  badge: string;
  location: string;
}
const History = ({ checkedFilterIndex }: Props) => {
  const tempProceeding: Data[] = [
    {
      id: 0,
      badge: '낙찰성공',
      location: '서울시 관악구 난곡로',
    },
    {
      id: 1,
      badge: '낙찰성공',
      location: '서울시 관악구 난곡로',
    },
    {
      id: 2,
      badge: '낙찰실패',
      location: '서울시 관악구1 난곡로',
    },
    {
      id: 3,
      badge: '낙찰실패',
      location: '서울시 관악구1 난곡로',
    },
  ];
  const [data, setData] = useState<Data[]>(tempProceeding);

  // 회사 뱃지 변환
  const handleColor = (badge: string | undefined): string => {
    if (badge) {
      if (badge.includes('낙찰성공')) {
        return '#222222';
      } else if (badge.includes('낙찰실패')) {
        return '#CACCD1';
      } else {
        return '';
      }
    } else {
      return '';
    }
  };
  //   useEffect(() => {
  //     switch (checkedFilterIndex) {
  //       case 1: // 상태순
  //         console.log('1이다');
  //         setData(tempProceeding.sort((a, b) => b.id - a.id));
  //         break;
  //       case 2: // 날짜순
  //         console.log('2이다');
  //         break;
  //       default: // 마감일순
  //         0;
  //         setData(tempProceeding.sort((a, b) => a.id - b.id));
  //         break;
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [data, checkedFilterIndex]);

  return (
    <ContentsContainer>
      {tempProceeding.map((el, index) => (
        <div key={index}>
          <Contents
            key={el.id}
            // onClick={() =>
            //   router.push(`/company/recievedRequest/${el.quotationRequestIdx}`)
            // }
          >
            <DdayNAddress>
              <DdayBox>
                <CommonBtn
                  text={el.badge}
                  backgroundColor={handleColor(el.badge)}
                  bottom={'12pt'}
                />
              </DdayBox>
              <AddressBox>{el.location}</AddressBox>
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
