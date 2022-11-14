import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import NoProject from './NoProject';
import { useQuery } from '@apollo/client';
import Loader from 'components/Loader';
import { GET_InProgressProjects, Response } from 'QueryComponents/CompanyQuery';

type Props = {
  tabNumber: number;
  componentId?: number;
  setComponentId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

interface Data {
  id: number;
  badge: string;
  storeName: string;
  date: string;
}
const ProjectInProgress = ({
  tabNumber,
  setComponentId,
  componentId,
}: Props) => {
  const router = useRouter();
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { loading, error, data } = useQuery<Response>(GET_InProgressProjects, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.log(error);
  }

  if (data?.inProgressProjects.length === 0) {
    return <NoProject />;
  }
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

  if (data?.inProgressProjects?.length === 0) {
    return <NoProject />;
  }
  return (
    <>
      {componentId === undefined && (
        <div>
          {tabNumber === 0 && data?.inProgressProjects?.length! > 0 && (
            <ContentsContainer>
              {data?.inProgressProjects?.map((el, index) => (
                <div key={index}>
                  <Contents
                    key={el.projectIdx}
                    onClick={() =>
                      router.push(
                        `/company/mypage/runningProgress/${el?.projectIdx}`,
                      )
                    } //여기서 배지에 따라 분리해서 보내야함.
                  >
                    <DdayNAddress>
                      <DdayBox>
                        <CommonBtn
                          text={el.badge}
                          backgroundColor={handleColor(el.badge)}
                          bottom={'12pt'}
                        />
                      </DdayBox>
                      <AddressBox>{el.projectName}</AddressBox>
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
  margin-top: 21pt;
  padding-left: 15pt;
  padding-right: 15pt;
  @media (min-width: 899pt) {
    display: grid;
    grid-template-columns: repeat(3, 178.5pt);
    grid-column-gap: 22.5pt;
    margin: 0 auto;
  }
`;

const Contents = styled.div`
  padding: 12pt 13.5pt;
  display: flex;
  margin-bottom: 9pt;
  justify-content: space-between;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  cursor: pointer;
  @media (min-width: 899pt) {
    height: 80pt;
  }
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

export default ProjectInProgress;
