import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import CommonBtn from 'components/mypage/as/CommonBtn';
import CaretDown24 from 'public/images/CaretDown24.png';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Loader from 'components/Loader';
import { GET_InProgressProjects, Response } from 'QueryComponents/CompanyQuery';
import RightNoProject from './RightNoProject';
import { useMediaQuery } from 'react-responsive';
import PaginationCompo from 'components/PaginationCompo';
import { useMutation, useQueryClient } from 'react-query';
import { isTokenPatchApi } from 'api';

type Props = {
  tabNumber: number;
  componentId?: number;
  setComponentId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function ProjectInProgress({ tabNumber, componentId }: Props) {
  const router = useRouter();
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);

  // 페이지 네이션
  const desktop = useMediaQuery({
    query: '(min-width:900pt)',
  });
  const limit = desktop ? 20 : 100000000;
  const [inProgressProjectPage, setInProgressProjectPage] = useState(1);

  const { loading, error, data, refetch } = useQuery<Response>(
    GET_InProgressProjects,
    {
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ContentType: 'application/json',
        },
      },
      variables: {
        page: inProgressProjectPage,
        limit: limit,
      },
    },
  );
  // 실시간으로 width 받아오는 함수

  const [nowWidth, setNowWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    setNowWidth(window.innerWidth);
  };

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
  // 페이지 네이션 갱신
  useEffect(() => {
    refetch();
  }, [inProgressProjectPage]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nowWidth]);

  useEffect(() => {
    console.log('data : ', data);
  }, [data]);

  // 진행 중인 프로젝트 알림 읽음 처리
  const queryClient = useQueryClient();
  const { mutate: updateAlertMutate } = useMutation(isTokenPatchApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('v1/alerts');
    },
    onError: () => {},
  });
  useEffect(() => {
    updateAlertMutate({
      url: '/v1/alerts/unread-points',
      data: {
        wasReadCompanyInProgressProject: true,
      },
    });
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    // console.log(error);
  }

  return (
    <>
      {componentId === undefined && (
        <div>
          {tabNumber === 0 && data?.inProgressProjects.projects?.length! > 0 && (
            <ContentsContainer className="???">
              {data?.inProgressProjects?.projects.map((el, index) => (
                <div key={index}>
                  <Contents
                    key={el.projectIdx}
                    onClick={() =>
                      router.push({
                        pathname: '/company/mypage/runningProgress/',
                        query: {
                          projectIdx: el?.projectIdx,
                        },
                      })
                    } //여기서 배지에 따라 분리해서 보내야함.
                  >
                    <DdayNAddress>
                      <DdayBox>
                        <CommonBtn
                          text={el?.badge}
                          backgroundColor={handleColor(el?.badge)}
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
          {data?.inProgressProjects.projects.length === 0 &&
            nowWidth >= 1200 && <RightNoProject />}
          {desktop && (
            <PaginationWrap>
              <PaginationCompo
                setPage={setInProgressProjectPage}
                page={inProgressProjectPage}
                list={data?.inProgressProjects.projects!}
                limit={limit}
                total={data?.inProgressProjects?.totalCount!}
              />
            </PaginationWrap>
          )}
        </div>
      )}
    </>
  );
}

const ContentsContainer = styled.div`
  margin-top: 21pt;
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 75pt;

  @media (min-width: 900pt) {
    display: grid;
    grid-template-columns: repeat(3, 178.5pt);
    grid-column-gap: 22.5pt;
    grid-row-gap: 22.5pt;
    padding-bottom: 0;
    margin: 0 auto;
  }
`;

const Contents = styled.div`
  padding: 12pt 13.5pt;
  display: flex;
  justify-content: space-between;
  margin-bottom: 9pt;
  box-shadow: 0pt 0pt 7.5pt 0pt #89a3c933;
  border-radius: 6pt;
  cursor: pointer;
  @media (min-width: 900pt) {
    /* padding: 29.3pt 13.5pt; */
    padding: 19.3pt 13.5pt 29.3pt 13.5pt;
    width: 178.5pt;
    height: 114pt;
    border-radius: 12pt;
    margin-bottom: 0;
  }
`;

const DdayBox = styled.div`
  margin-bottom: 16.5pt;
  cursor: pointer;

  @media (min-width: 900pt) {
    margin-bottom: 0;
  }
`;
const DdayNAddress = styled.div`
  position: relative;
  @media (min-width: 900pt) {
    display: flex;
    flex-direction: column;
  }
`;

const AddressBox = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  position: relative;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 12pt;
  color: ${colors.main2};
  white-space: nowrap;
  @media (min-width: 900pt) {
    padding-top: 10pt;
    font-size: 13.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    width: 155pt;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 900pt) {
    display: none;
  }
`;

const ArrowIconBox = styled.div`
  width: 18pt;
  height: 18pt;
`;

const PaginationWrap = styled.div`
  padding-top: 30pt;
`;
