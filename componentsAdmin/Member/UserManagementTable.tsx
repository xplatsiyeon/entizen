import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery, useQueryClient } from 'react-query';
import { api, getApi, isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import { ComUserData, UserData } from 'types/tableDataType';
import {
  addCommaBirthDay,
  adminDateFomat,
  dateFomat,
  hyphenFn,
  isAdminJoinApprovedString,
} from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';
import { excelDownloadFile } from 'hooks/excelDown';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  userSearch?: string;
  commonBtn?: string;
  excelUrl: string;
  hide?: boolean;
  searchType?: string;
};

const UserManagementTable = ({
  setIsDetail,
  setDetailId,
  tableType,
  detatilId,

  pickedDate,
  userSearch,
  commonBtn,
  excelUrl,
  hide,
  searchType,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  // 오늘 날짜.
  const today = new Date();
  // console.log(adminDateFomat(String(today)));

  // 역경매 견적서 보기에 넘겨줄 아이디값
  const dispatch = useDispatch();

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  //  유저 데이터
  const { data: userData, refetch: userDataRefetch } = useQuery<UserData>(
    'userInfo',
    () =>
      isTokenAdminGetApi(
        `/admin/members/users?page=${page}&limit=10&startDate=${
          pickedDate ? pickedDate[0] : '2022-09-05'
        }&endDate=${
          pickedDate ? pickedDate[1] : today
        }&searchType=${searchType}&searchKeyword=${userSearch}`,
      ),
    {
      enabled: false,
      onSuccess: (userData) => {
        if (tableType === 'userData') {
          // console.log('userData');
          const temp: any = [];
          userData?.data?.members.forEach((ele, idx) => {
            const arrEle = [
              `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                idx + 1 === 10 ? page * 10 : idx + 1
              }`,
              ele.id,
              ele.name,
              hyphenFn(ele.phone),
              addCommaBirthDay(ele.birthDate!),
              dateFomat(ele.createdAt),
              ele.memberIdx,
            ];
            temp.push(arrEle);
          });
          setDataArr(temp);
          setColumns([
            { name: '번호' },
            { name: '이메일' },
            { name: '이름' },
            { name: '전화번호' },
            { name: '생년월일' },
            ,
            { name: '가입날짜' },
            // { name: '번호', width: '5%' },
            // { name: '아이디', width: '20%' },
            // { name: '이름', width: '10%' },
            // { name: '전화번호', width: '20%' },
            // { name: '생년월일', width: '20%' },
            // ,
            // {
            //   name: '가입날짜',
            //   width: '20%',
            // },
            {
              name: '',
              id: 'userDetail',
              formatter: (cell: string) =>
                _(
                  <button
                    className="detail"
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
          setLength(
            userData?.data?.totalCount ? userData?.data?.totalCount : 0,
          );
        }
      },
      onError: (error) => alert('다시 시도해주세요'),
    },
  );

  // console.log('userData', userData?.data?.members);

  // 회사 데이터
  const { data: comUserData, refetch: comUserDataRefetch } =
    useQuery<ComUserData>(
      'comUserInfo',
      () =>
        isTokenAdminGetApi(
          `/admin/members/companies?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${
            pickedDate ? pickedDate[1] : today
          }&searchType=${searchType}&searchKeyword=${userSearch}`,
        ),
      {
        enabled: false,
        onSuccess: (comUserData) => {
          if (tableType === 'comUserData') {
            // console.log('comuserData');
            const temp: any = [];
            comUserData?.data?.members.forEach((ele, idx) => {
              const approve =
                ele?.isAdminJoinApproved === true ? '승인' : '미승인';

              const arrEle = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele?.companyMemberAdditionalInfo?.companyName!,
                ele.id,
                ele.name,
                ele?.companyMemberAdditionalInfo?.managerEmail,
                hyphenFn(ele.phone),
                approve,
                dateFomat(ele.createdAt),
                `${ele.deletedAt ? dateFomat(ele.deletedAt) : '-'}`,
                ele.memberIdx,
              ];
              temp.push(arrEle);
            });

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
                id: 'projectListData',
                formatter: (cell: string) =>
                  _(
                    <span
                      className={`${
                        cell === '승인' ? 'approve' : 'approveNot'
                      }`}
                    >
                      {cell}
                    </span>,
                  ),
              },
              // {
              //   name: '승인',
              //   formatter: (cell: string) =>
              //     _(
              //       <select defaultValue={cell} style={{ cursor: 'pointer' }}>
              //         <option value="true">승인</option>
              //         <option value="false">미승인</option>
              //       </select>,
              //     ),
              // },
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
                      className="detail"
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
            setLength(
              comUserData?.data?.totalCount ? comUserData.data.totalCount : 0,
            );
            return temp;
          }
        },
      },
    );

  // console.log('comUserData', comUserData);

  useEffect(() => {
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
  }, [page, pickedDate, userSearch]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P>
        <Button
          onClick={() => {
            excelDownloadFile(excelUrl, accessToken);
          }}
          hide={hide}
        >
          {commonBtn}
        </Button>
      </FlexBox>
      {dataArr.length > 0 && columns.length > 0 ? (
        <Div>
          <Grid
            data={() => {
              //화면의 덜컹거림을 줄이기 위해서 0.1초 기다림( =>setState들로 인한 페이지 전환 다 끝난 후 데이터 삽입).
              return new Promise((resolve) => {
                setTimeout(() => resolve(dataArr), 130);
              });
            }}
            columns={columns}
          />
        </Div>
      ) : (
        <Div></Div>
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

export default React.memo(UserManagementTable);

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

      tr {
        td {
          padding: 8px 0;
          position: relative;
        }
      }
    }
    .gridjs-loading {
      min-width: 1200px;
      height: 490px;
      color: white;
    }

    .detail {
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      text-align: center;
      color: #747780;
      background: #e2e5ed;
      border: 1px solid #747780;
      padding: 3px 19px;
      border-radius: 4px;
    }

    .approve {
      text-align: center;
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-size: 16px;
      line-height: 150%;
      color: #000000;
    }
    .approveNot {
      text-align: center;
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-size: 16px;
      line-height: 150%;
      color: #f75015;
      font-weight: 500;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const P = styled.p``;

const Button = styled.button<{ hide?: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #747780;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 3px 6px;
  display: ${({ hide }) => hide && 'none'};
`;

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

const Div = styled.div`
  min-width: 1200px;
  height: 490px;
`;

const BtnGap = styled.div`
  display: flex;
  gap: 10px;
`;

const LibraryImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TitleBox = styled.div`
  background-color: #fbfcff;
  border: 1px solid #e2e5ed;
  padding: 8px 10px;
  width: 200px;
  height: 82px;
  overflow-y: scroll;
  text-align: center;

  display: flex;
  align-items: center;
`;

const LinkBox = styled.div`
  background-color: #fbfcff;
  border: 1px solid #e2e5ed;
  padding: 8px 10px;
  width: 394px;
  height: 82px;
  overflow-y: scroll;
  text-align: center;
  display: flex;
  align-items: center;
`;

const ToggleContainer = styled.div`
  position: absolute;
  left: 44%;
  top: 30%;
`;

const ToggleBtn = styled.button<{ visible?: boolean }>`
  width: 36px;
  height: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${({ visible }) => (visible ? '#ffc043' : '#747780')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Circle = styled.div<{ visible?: boolean }>`
  background-color: white;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  position: absolute;
  right: ${({ visible }) => (visible ? '10%' : '55%')};
  transition: all 0.5s ease-in-out;
`;
