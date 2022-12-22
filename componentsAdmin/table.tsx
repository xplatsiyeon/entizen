import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { api } from 'api';
import { Pagination } from 'rsuite';
import {
  ComUserData,
  ProjectList,
  Quotations,
  UserData,
  CompanyPreQuotationResponse,
} from 'types/tableDataType';
import { adminDateFomat, dateFomat, hyphenFn } from 'utils/calculatePackage';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { useDispatch } from 'react-redux';
import { adminReverseAction } from 'storeAdmin/adminReverseSlice';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  selectedFilter?: number;
  userSearch?: string;
};

const Table = ({
  setIsDetail,
  setDetailId,
  tableType,
  detatilId,
  selectedFilter,
  pickedDate,
  userSearch,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

  const today = new Date();
  console.log(adminDateFomat(String(today)))
  console.log('selectedFilter af', selectedFilter);
  // 역경매 견적서 보기에 넘겨줄 아이디값
  const dispatch = useDispatch();
  const [preQuotationIdx, setPreQuotationIdx] = useState<number>();

  // 유저 회원 검색 필터 뭐 눌렀는지
  const changeSearchType = ['name', 'id'];

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  const { data: userData, refetch: userDataRefetch } = useQuery<UserData>(
    'userInfo',
    () =>
      api({
        method: 'GET',
        endpoint: `/admin/members/users?page=${page}&limit=10&startDate=${pickedDate?pickedDate[0]:'2022--05'}&endDate=${pickedDate?pickedDate[1]:today}&searchType=${
          changeSearchType[selectedFilter!]
        }&searchKeyword=${userSearch}`,
      }),
    {
      enabled: false,
      onSuccess: (userData) => {
        if (tableType === 'userData') {
          console.log('userData');
          const temp: any = [];
          userData?.data?.members.forEach((ele, idx) => {
            const arrEle = [
              `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                idx + 1 === 10 ? page * 10 : idx + 1
              }`,
              ele.id,
              ele.name,
              hyphenFn(ele.phone),
              dateFomat(ele.createdAt),
              ele.memberIdx,
            ];
            temp.push(arrEle);
          });
          setDataArr(temp);
          setColumns([
            {name:'번호', width: '5%'},
            { name: '아이디', width: '20%' },
            {name:'이름',width:'10%'},
            {name:'전화번호',width:'10%'},
            ,
            {
              name: '가입날짜',
              width: '30%',
            },
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

  const { data: comUserData, refetch: comUserDataRefetch } = useQuery<ComUserData>(
      'comUserInfo',
      () =>
        api({
          method: 'GET',
          endpoint: `/admin/members/companies?page=${page}&limit=10&startDate=2022-12-19&endDate=2022-12-19`,
        }),
      {
        enabled: false,
        onSuccess: (comUserData) => {
          if (tableType === 'comUserData') {
            console.log('comuserData');
            const temp: any = [];
            comUserData?.data?.members.forEach((ele, idx) => {
              const arrEle = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele?.companyMemberAdditionalInfo?.companyName!,
                ele.id,
                ele.name,
                ele?.companyMemberAdditionalInfo?.managerEmail,
                hyphenFn(ele.phone),
                ele?.isAdminJoinApproved,
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
          }
        },
      },
    );

  const [total, setTotal] = useState<boolean>(false);
  const { data: companyPreQuotation, refetch: companyPreQuotationRefetch } =
    useQuery<CompanyPreQuotationResponse>(
      'companyPreQuotation',
      () =>
        api({
          method: 'GET',
          endpoint: `/admin/quotations/quotation-requests/${detatilId}/pre-quotations`,
        }),
      {
        enabled: false,
        onSuccess: (companyPreQuotation) => {
          const totalLength = companyPreQuotation?.data?.preQuotations;

          if (tableType === 'companyPreQuotation') {
            const temp: any = [];
            companyPreQuotation?.data?.preQuotations?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 ? '' : page - 1}${
                  idx + 1 === page * 10 ? 0 : idx + 1
                }`,

                ele.member.companyMemberAdditionalInfo.companyName!,
                ele.member.id,
                ele.member.name,
                hyphenFn(ele.member.phone),
                ele.member.companyMemberAdditionalInfo.managerEmail!,
                dateFomat(ele.createdAt),
                `${
                  ele.finalQuotation?.project?.isCompletedContractStep !==
                    null &&
                  ele.finalQuotation?.project?.isCompletedContractStep ===
                    'COMPLETION'
                    ? '계약완료'
                    : '-'
                }`,
                setPreQuotationIdx(ele?.preQuotationIdx),
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '기업명',
              '아이디',
              '담당자',
              '전화번호',
              '이메일',
              '신청일자',
              '채택여부',

              {
                name: '',
                formatter: () =>
                  _(
                    <div>
                      <button className="button">삭제</button>
                      <button
                        className="button"
                        onClick={() => {
                          dispatch(adminReverseAction.setDate(preQuotationIdx));
                        }}
                      >
                        보기
                      </button>
                    </div>,
                  ),
              },
            ]);
            setLength(
              totalLength === undefined
                ? 0
                : companyPreQuotation?.data?.preQuotations?.length,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  const { data: quetationListData, refetch: quetationListRefetch } =
    useQuery<Quotations>(
      'quetationList',
      () =>
        api({
          method: 'GET',
          endpoint: `/admin/quotations/quotation-requests?page=${page}&limit=10&startDate=2022-12-10&endDate=2022-12-20`,
        }),
      {
        enabled: false,
        onSuccess: (quetationListData) => {
          if (tableType === 'quetationListData') {
            const temp: any = [];
            quetationListData?.data.quotationRequests.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.badge!,
                ele?.member?.id!,
                ele.installationAddress!,
                dateFomat(ele.createdAt!),
                ele.quotationRequestIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '진행상태',
              '작성자(아이디)',
              '견적제목',
              '작성날짜',
              {
                name: '',
                id: 'quetationList-Detail',
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
              quetationListData.data.totalCount
                ? quetationListData.data.totalCount
                : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  const { data: projectListData, refetch: projectListRefetch } =
    useQuery<ProjectList>(
      'projectList',
      () =>
        api({
          method: 'GET',
          endpoint: `/admin/projects?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-10-01'
          }&endDate=${pickedDate ? pickedDate[1] : '2022-12-15'}`,
        }),
      {
        enabled: false,
        onSuccess: (projectListData) => {
          if (tableType === 'projectListData') {
            const temp: any = [];
            projectListData?.data?.projects.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.projectNumber!,
                ele.userMember.id!,
                ele.companyMember.id!,
                ele.currentStep!,
                ele.projectName,
                dateFomat(ele.createdAt),
                ele.projectIdx!,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '프로젝트 번호',
              '작성자(아이디)',
              '기업회원(아이디)',
              '진행단계',
              '프로젝트_제목',
              '프로젝트_생성일',
              {
                name: '',
                id: 'quetationList-Detail',
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
              projectListData.data.totalCount
                ? projectListData.data.totalCount
                : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  useEffect(() => {
    console.log('props', tableType);
    console.log('------------------------------', tableType);
    switch (tableType) {
      case 'userData':
        userDataRefetch();
        break;

      case 'comUserData':
        comUserDataRefetch();
        break;

      case 'quetationListData':
        quetationListRefetch();
        break;

      case 'projectListData':
        projectListRefetch();
        break;

      case 'companyPreQuotation':
        companyPreQuotationRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, []);

  useEffect(() => {
    console.log('----------------table useeffect 실행---------------');
    console.log(userSearch);
    switch (tableType) {
      case 'userData':
        userDataRefetch();
        break;
      case 'comUserData':
        comUserDataRefetch();
        break;
      case 'quetationListData':
        quetationListRefetch();
        break;
      case 'projectListData':
        projectListRefetch();
        break;
      case 'companyPreQuotation':
        companyPreQuotationRefetch();
        break;
    }
  }, [page, pickedDate, userSearch]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P> <Button>엑셀 다운로드</Button>
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

export default React.memo(Table);

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
    }

  .detail{
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      text-align: center;
      color: #747780;
      background: #E2E5ED;
      border: 1px solid #747780;
      padding: 3px 19px;
      border-radius: 4px;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
const P = styled.p``;

const Button = styled.button`

font-family: 'Spoqa Han Sans Neo';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 150%;
color: #747780;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
padding: 3px 6px;

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
