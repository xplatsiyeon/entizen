import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import NoProject from './NoProject';

type Props = {
  tabNumber: number;
  componentId?: number;
  setComponentId?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

interface Data {
  id: number;
  state?: number;
  badge: string;
  storeName: string;
  date: string;
  contract?: boolean;
  planed?: string[]; // 인덱스[0]: 준비 목표일, [1]: 설치 목표일, [2]: 검수 목표일, [3]: 완료 목표일
  address?: string;
}
// 데이터 없을 때 나오는 페이지
// const tempProceeding: [] = [];
const tempProceeding: Data[] = [
  {
    id: 0,
    badge: '검수 중',
    storeName: 'S-OIL 대치 주유소',
    date: '2021.01.01',
  },
  {
    id: 1,
    badge: '준비 중',
    storeName: '맥도날드 대이동점',
    date: '2021.05.10',
  },
  {
    id: 2,
    badge: '계약대기',
    storeName: 'LS카페 신림점',
    date: '2021.03.10',
  },
  {
    id: 3,
    badge: '설치 중',
    storeName: 'LS카페 마곡점',
    date: '2021.07.23',
  },
  {
    id: 4,
    badge: '완료 중',
    storeName: '스타벅스 마곡점',
    date: '2021.07.23',
  },
  {
    id: 5,
    badge: '완료대기',
    storeName: 'LS카페 계양점',
    date: '2021.07.23',
  },
  {
    id: 6,
    badge: '프로젝트 취소',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
];

const WebProjectInProgressUnder = ({
  tabNumber,
  setComponentId,
  componentId,
}: Props) => {
  // 회사 뱃지 변환
  const handleColor = (badge: string | undefined): string => {
    if (badge) {
      if (badge.includes('계약대기')) {
        return '#F75015';
      } else if (badge.includes('준비') || badge.includes('설치')) {
        return colors.main;
      } else if (badge.includes('검수 중')) {
        return '#FFC043';
      } else if (badge.includes('완료')) {
        return '#222222';
      } else if (badge.includes('프로젝트')) {
        return '#CACCD1';
      } else {
        return '';
      }
    } else {
      return '';
    }
  };

  if (tempProceeding.length === 0) {
    return <NoProject />;
  }
  const handleId = (index: number) => {
    if (setComponentId !== undefined) {
      setComponentId(index);
    }
  };
  const router = useRouter();

  useEffect(() => {
    if (componentId !== undefined) {
      router.push(`/company/mypage/runningProgress/${componentId}`);
    }
  }, [componentId]);

  return (
    <>
      {componentId !== undefined && (
        <div>
          {tabNumber === 0 && tempProceeding.length > 0 && (
            <ContentsContainer>
              {tempProceeding.map((el, index) => (
                <div key={index}>
                  <Contents
                    index={index}
                    componentId={componentId}
                    key={el.id}
                    onClick={() => {
                      handleId(index);
                    }}
                  >
                    <DdayNAddress>
                      <DdayBox>
                        <CommonBtn
                          text={el.badge}
                          backgroundColor={handleColor(el.badge)}
                          bottom={'12pt'}
                        />
                      </DdayBox>
                      <AddressBox>{el.storeName}</AddressBox>
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
          )}
        </div>
      )}
    </>
  );
};

const ContentsContainer = styled.div`
  padding-top: 30pt;
  height: 190pt;
  overflow-y: scroll;
  @media (max-width: 899pt) {
    display: none;
  }
`;

const Contents = styled.div<{
  index: number;
  componentId: number | undefined;
}>`
  padding: 12pt 13.5pt;
  display: flex;
  margin: 0 auto;
  margin-top: 10pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  cursor: pointer;
  width: 198pt;
  height: 45pt;
  border: ${({ componentId, index }) =>
    componentId === index ? `0.75pt solid #5221CB` : ``};
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
  @media (min-width: 899pt) {
    display: none;
  }
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

export default WebProjectInProgressUnder;
