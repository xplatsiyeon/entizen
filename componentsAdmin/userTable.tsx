import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { api } from 'api';
import { Pagination } from 'rsuite';
import { ComUserData, UserData } from 'types/tableDataType';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
};

const UserTable = ({ setIsDetail, setDetailId, tableType }: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

  const { data: userData, refetch: userDataRefetch } = useQuery<UserData>(
    'userInfo',
    () =>
      api({
        method: 'GET',
        endpoint: `/admin/members/users?page=${page}&limit=10&startDate=2022-12-19&endDate=2022-12-19`,
      }),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log('userData');
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
        if (tableType === 'userData') {
          setDataArr(temp);
          setColumns([
            '번호',
            '아이디',
            '이름',
            '전화번호',
            ,
            {
              name: '가입날짜',
              formatter: (cell: string) =>
                _(<div className="wide">{`${cell}`}</div>),
            },
            {
              name: '',
              id: 'userDetail',
              formatter: (cell: string) =>
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
          ]);
          setLength(data.data.totalCount);
        }
      },
      onError: (error) => alert('다시 시도해주세요'),
    },
  );

  const { data: comUserData, refetch: comUserDataRefetch } =
    useQuery<ComUserData>(
      'userInfo',
      () =>
        api({
          method: 'GET',
          endpoint: `/admin/members/companies?page=${page}&limit=10&startDate=2022-12-19&endDate=2022-12-19`,
        }),
      {
        enabled: false,
        onSuccess: (data) => {
          console.log('comuserData');
          const temp: any = [];
          data?.data?.members.forEach((ele, idx) => {
            const arrEle = [
              `${page - 1}${idx + 1}`,
              ele?.companyMemberAdditionalInfo?.companyName!,
              ele.id,
              ele.name,
              ele?.companyMemberAdditionalInfo?.managerEmail,
              ele.phone,
              ele?.isAdminJoinApproved,
              ele.createdAt,
              `${ele.deletedAt ? ele.deletedAt : '-'}`,
              '',
            ];
            temp.push(arrEle);
          });

          if (tableType === 'comUserData') {
            setDataArr(temp);
            setColumns([
              '번호',
              '기업명',
              '아이디',
              '담당자',
              '이메일',
              '전화번호',
              {
                name: '승인',
                formatter: (cell: string) =>
                  _(
                    <select defaultValue={cell}>
                      <option value="true">승인</option>
                      <option value="false">미숭인</option>
                    </select>,
                  ),
              },
              {
                name: '가입날짜',
                width: '15%',
              },
              {
                name: '탈퇴날짜',
                width: '15%',
              },
              {
                name: '',
                id: 'company-userDetail',
                width: '10%',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="down"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(data.data.totalCount);
          }
        },
        onError: (error) => alert('다시 시도해주세요'),
      },
    );

  useEffect(() => {
    console.log('props', tableType);
    switch (tableType) {
      case 'userData':
        userDataRefetch();
        break;

      case 'comUserData':
        comUserDataRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, []);

  useEffect(() => {
    switch (tableType) {
      case 'userData':
        userDataRefetch();
        break;

      case 'comUserData':
        comUserDataRefetch();
        break;
    }
  }, [page]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P> <Button>엑셀 다운로드</Button>{' '}
      </FlexBox>
      {dataArr.length > 0 && columns.length > 0 && (
        <Grid data={dataArr} columns={columns} />
      )}
      <WrapPage>
        <Pagination
          prev
          next
          size="md"
          total={length ? length : 0}
          limit={10}
          maxButtons={5}
          activePage={page}
          onChangePage={setPage}
        />
      </WrapPage>
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

const WrapPage = styled.div`
  margin: 50px auto;
  .rs-pagination-group {
    justify-content: center;
  }

  .rs-pagination-btn {
    color: lightgrey;
    border: none;
    &.rs-pagination-btn-active {
      color: black;
      &:focus {
        color: black;
      }
    }
  }
`;
