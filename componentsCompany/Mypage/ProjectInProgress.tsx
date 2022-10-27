import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import CaretDown24 from 'public/images/CaretDown24.png';
import NoHistory from './Nohistory';
import { useRouter } from 'next/router';

type Props = {
  tabNumber: number;
};

interface Data {
  id: number;
  badge: string;
  storeName: string;
  date: string;
}

const tempProceeding: Data[] = [
  {
    id: 0,
    badge: '검수 중',
    storeName: 'LS카페 신림점',
    date: '2021.01.01',
  },
  {
    id: 1,
    badge: '준비 중',
    storeName: 'LS카페 신림점',
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
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
  {
    id: 4,
    badge: '완료 중',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
  {
    id: 5,
    badge: '완료대기',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
  {
    id: 6,
    badge: '프로젝트 취소',
    storeName: 'LS카페 신림점',
    date: '2021.07.23',
  },
];

const ProjectInProgress = ({ tabNumber }: Props) => {
  const router = useRouter();
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
    return <NoHistory />;
  }
  return (
    <>
      {tabNumber === 0 && tempProceeding.length > 0 && (
        <ContentsContainer>
          {tempProceeding.map((el, index) => (
            <div key={index}>
              <Contents
                key={el.id}
                onClick={() => router.push(`/company/mypage/runningProgress`)}
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
    </>
  );
};

const ContentsContainer = styled.div`
  margin-top: 21pt;
  padding-left: 15pt;
  padding-right: 15pt;
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

export default ProjectInProgress;
