import styled from '@emotion/styled';
import { Router } from '@mui/icons-material';
import { isTokenAdminGetApi, isTokenGetApi } from 'api';
import { AxiosError } from 'axios';
import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { DateRangePicker } from 'rsuite';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';
import colors from 'styles/colors';

type Props = {};

interface UnprocessedBusiness {
  awaitingCompanyMemberCount: number;
  awaitingProjectCount: number;
  inProgressConsultationsCount: number;
}

interface Response {
  isSuccess: boolean;
  data: {
    unprocessedBusiness: UnprocessedBusiness;
  };
}

const OutstandingWork = (props: Props) => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading, isError } = useQuery<
    Response,
    AxiosError,
    UnprocessedBusiness
  >(
    'unprocessed-business',
    () => isTokenAdminGetApi('/admin/dashboards/unprocessed-business'),
    {
      select(data) {
        return data.data.unprocessedBusiness;
      },
    },
  );

  console.log('data==>', data);

  const GridList = [
    {
      title: '현재 승인 대기중인\n기업회원 수',
      count: data?.awaitingCompanyMemberCount,
      page: 6,
    },
    {
      title: '현재 엔티즌의 완료동의를\n대기중인 프로젝트의 수',
      count: data?.awaitingProjectCount,
      page: 8,
    },
    {
      title: '소통하기에서 새로받고\n읽지않은 채팅의 수',
      count: data?.inProgressConsultationsCount,
      page: 10,
    },
  ];

  const onClickRouter = (num: number) => {
    dispatch(adminPageNumberAction.setIsAdminPage(num));
  };

  // 개발 완료 후 제거 필요
  // useEffect(() => {
  //   alert('현재 개발 진행중인 페이지입니다.');
  // }, []);

  return (
    <Wrapper>
      <AdminHeader type="main" title="메인대시보드" subTitle="미처리 업무" />
      {/* Grid Container */}
      <GridContainer>
        {GridList?.map((item, idx) => (
          <div
            className="item"
            key={idx}
            onClick={() => {
              onClickRouter(item.page);
            }}
          >
            <div className="name">{item.title}</div>
            <h1 className="count" key={idx}>
              {`${
                isLoading
                  ? 0
                  : item?.count
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }`}
            </h1>
          </div>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default OutstandingWork;

const Wrapper = styled.div`
  padding-left: 18pt;
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  padding-top: 16px;
  .item {
    cursor: pointer;
    width: 208px;
    height: 208px;
    background: ${colors.lightWhite3};
    border: 2px solid ${colors.gray2};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    white-space: pre-wrap;
  }
  .name {
    position: absolute;
    top: 16px;
    left: 16px;
    font-weight: 500;
    font-size: 16px;
    color: ${colors.main2};
    /* border: 1px solid red; */
    width: 100%;
    display: flex;
    /* justify-content: center; */
    /* text-align: center; */
  }
  .count {
    font-weight: 500;
    font-size: 40px;
    color: ${colors.main2};
  }
`;
