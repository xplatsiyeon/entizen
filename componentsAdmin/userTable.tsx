import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { api, isTokenApi } from 'api';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
};

type Data = {
  isSuccess: boolean;
  data: {
    members: MemberInfo[];
    totalCount: number;
  };
};
type MemberInfo = {
  memberIdx: number;
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  deletedAt: null | string;
};

const UserTable = ({ setIsDetail, setDetailId }: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);

  const { data, refetch } = useQuery<Data>(
    'userInfo',
    () =>
      api({
        method: 'GET',
        endpoint: `/admin/members/users?page=${page}&limit=10&startDate=2022-12-19&endDate=2022-12-19`,
      }),
    {
      enabled: false,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    },
  );

  useEffect(() => {
    console.log('data', data);
    refetch();
    const temp: any = [];
    data?.data?.members.forEach((ele, idx) => {
      const arrEle = [
        `${page - 1}${idx + 1}`,
        ele.id,
        ele.name,
        ele.phone,
        ele.createdAt,
        ele.memberIdx,
      ];
      temp.push(arrEle);
    });

    setDataArr(temp);
    // 의존성 배열에 api.get()dml data넣기.
  }, [page, data]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        {' '}
        <P>결과 {data?.data.totalCount!}</P> <Button>엑셀 다운로드</Button>{' '}
      </FlexBox>
      {dataArr.length > 0 ? (
        <Grid
          data={dataArr}
          columns={[
            '번호',
            '아이디',
            '이름',
            '전화번호',
            ,
            {
              name: '가입날짜',
              formatter: (cell) => _(<div className="wide">{`${cell}`}</div>),
            },
            {
              name: '',
              id: 'userInfo-down',
              formatter: (cell) =>
                _(
                  <button
                    className="down"
                    onClick={() => {
                      setDetailId(cell?.toString()!);
                      setIsDetail(true);
                    }}
                  >
                    보기
                  </button>,
                ),
            },
          ]}
        />
      ) : (
        <div></div>
      )}
    </StyledBody>
  );
};

export default UserTable;

const StyledBody = styled.div`
  margin: 32px 0 0;
  min-width: 1200px;
  .hidden {
    visibility: hidden;
  }
  table {
    width: 100%;
    text-align: center;

    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-size: 16px;
    line-height: 150%;
    color: #000000;

    thead {
      font-weight: 500;
      background: lightgray;
      .gridjs-th-content {
        padding: 8px 0;
      }
    }
    tbody {
      font-weight: 400;
      td {
        padding: 8px 0;
      }
      .wide {
      }
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const P = styled.p``;

const Button = styled.button``;
