import styled from '@emotion/styled';
import CommonBtn from 'components/mypage/as/CommonBtn';
import React from 'react';
import CaretDown24 from 'public/images/CaretDown24.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {};
interface Data {
  id: number;
  badge: string;
  location: string;
  bgColor: string;
}

const RecieveRequest = (props: Props) => {
  const router = useRouter();
  const tempProceeding: Data[] = [
    {
      id: 0,
      badge: '견적마감 D-1',
      location: '서울시 관악구 난곡로',
      bgColor: '#F75015',
    },
    {
      id: 1,
      badge: '견적마감 D-1',
      location: '서울시 관악구 난곡로',
      bgColor: '#F75015',
    },
  ];

  return (
    <ContentsContainer>
      {tempProceeding.map((el, index) => (
        <Contents key={index} onClick={() => router.push('/')}>
          <DdayNAddress>
            <DdayBox>
              <CommonBtn
                text={el.badge}
                backgroundColor={el.bgColor}
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
      ))}
    </ContentsContainer>
  );
};

const ContentsContainer = styled.div`
  margin-top: 18pt;
`;
const DdayBox = styled.div`
  margin-bottom: 16.5pt;
`;

const Contents = styled.div`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
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
  color: #222222;
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

export default RecieveRequest;
