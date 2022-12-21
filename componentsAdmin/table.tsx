import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { api } from 'api';
import { Pagination } from 'rsuite';
import { ComUserData, ProjectList, Quotations, UserData } from 'types/tableDataType';
import { dateFomat, hyphenFn } from 'utils/calculatePackage';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
};


const Table = ({ setIsDetail, setDetailId, tableType }: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

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
        endpoint: `/admin/members/users?page=${page}&limit=10&startDate=2022-12-19&endDate=2022-12-19`,
      }),
    {
      enabled: false,
      onSuccess: (userData) => {
        if(tableType === 'userData'){
        console.log('userData');
        const temp: any = [];
        userData?.data?.members.forEach((ele, idx) => {
          const arrEle = [
            `${(page - 1) === 0 ?'': page-1}${ (idx + 1) === page*10 ? 0 : idx+1 }`,
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
          '번호',
          {name: '아이디', width:'20%'},
          '이름',
          '전화번호',
          ,
          {
            name: '가입날짜', width:'30%'
          },
          {
            name: '',
            id: 'userDetail',
            formatter: (cell:string) =>
              _(
                <button
                  className="detail"
                  onClick={() => {
                    setDetailId(cell?.toString()!);
                    setIsDetail(true);
                  }}
                >
                  보기
                </button>
              ),
          },
        ])
        setLength(userData?.data?.totalCount? userData?.data?.totalCount : 0);
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
        if(tableType === 'comUserData'){
        console.log('comuserData');
        const temp: any = [];
        comUserData?.data?.members.forEach((ele, idx) => {
          const arrEle = [
            `${(page - 1) === 0 ?'': page-1}${ (idx + 1) === page*10 ? 0 : idx+1 }`,
            ele?.companyMemberAdditionalInfo?.companyName!,
            ele.id,
            ele.name,
            ele?.companyMemberAdditionalInfo?.managerEmail,
            hyphenFn(ele.phone),
            ele?.isAdminJoinApproved,
            dateFomat(ele.createdAt),
            `${ele.deletedAt?  dateFomat(ele.deletedAt) : '-'}`,
            ''
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
            formatter: (cell:string) =>
              _(
                <select defaultValue={cell}>
                  <option value="true">승인</option>
                  <option value="false">미숭인</option>
                </select>,
              ),
          },
          {
            name: '가입날짜', width:'15%'
          },
          {
            name: '탈퇴날짜', width:'15%'
          },
          {
            name: '', id:'company-userDetail', width:'10%',
            formatter: (cell:string) =>
              _(
                <button
                  className="detail"
                  onClick={() => {
                    setDetailId(cell);
                    setIsDetail(true);
                  }}
                >
                  보기
                </button>
              ),
          },
        ])
        setLength(comUserData?.data?.totalCount?comUserData.data.totalCount : 0 );
      }
      },
      onError: (error) => alert(
        '다시 시도해주세요'
      ),
    },
  );

  const {data: quetationListData, refetch : quetationListRefetch } = useQuery<Quotations>(
    'quetationList', ()=> api({
      method: 'GET',
      endpoint: `/admin/quotations/quotation-requests?page=${1}&limit=10&startDate=2022-12-10&endDate=2022-12-20`
    }),{
      enabled: false,
      onSuccess:(quetationListData)=>{
        if(tableType === 'quetationListData'){
        const temp:any = [];
        quetationListData?.data.quotationRequests.forEach((ele, idx)=>{
          const eleArr = [
            `${(page - 1) === 0 ?'': page-1}${ (idx + 1) === page*10 ? 0 : idx+1 }`, 
            ele.badge!, ele?.member?.id!, ele.installationAddress!, dateFomat(ele.createdAt!), '보기'];
          temp.push(eleArr);
        })
        setDataArr(temp);
        setColumns([
          '번호', '진행상태', '작성자(아이디)', '견적제목', '작성날짜', {
            name:'', id:'quetationList-Detail',  formatter: (cell:string) =>
            _(
              <button
                className="detail"
                onClick={() => {
                  setDetailId(cell);
                  setIsDetail(true);
                }}
              >
                보기
              </button>
            )}
        ]);
        setLength(quetationListData.data.totalCount? quetationListData.data.totalCount : 0);
      }
      },
      onError:()=>alert('다시 시도해주세요')
    }
  )

  const {data: projectListData, refetch : projectListRefetch } = useQuery<ProjectList>(
    'projectList', ()=> api({
      method: 'GET',
      endpoint: `/admin/projects?page=${page}&limit=10&startDate=2022-10-01&endDate=2022-12-15`
    }),{
      enabled: false,
      onSuccess:(projectListData)=>{
        if(tableType === 'projectListData'){
        const temp:any = [];
        projectListData?.data?.projects.forEach((ele, idx)=>{
          const eleArr = [
            `${(page - 1) === 0 ?'': page-1}${ (idx + 1) === page*10 ? 0 : idx+1 }`, 
            ele.projectNumber!, ele.userMember.id!, ele.companyMember.id!, ele.currentStep!, ele.projectName, dateFomat(ele.createdAt), '보기'];
          temp.push(eleArr);
        })
        setDataArr(temp);
        setColumns([
          '번호', '프로젝트 번호', '작성자(아이디)', '기업회원(아이디)', '진행단계', '프로젝트_제목', '프로젝트_생성일', {
            name:'', id:'quetationList-Detail',  formatter: (cell:string) =>
            _(
              <button
                className="detail"
                onClick={() => {
                  setDetailId(cell);
                  setIsDetail(true);
                }}
              >
                보기
              </button>
            )}
        ]);
        setLength(projectListData.data.totalCount? projectListData.data.totalCount : 0);
      }
      },
      onError:()=>alert('다시 시도해주세요')
    }
  )

  useEffect(() => {
    console.log('props', tableType);
    switch (tableType) {
      case 'userData':
        userDataRefetch();
        break;

      case 'comUserData':
        comUserDataRefetch();
        break;

        case 'quetationListData' :
          quetationListRefetch();
          break;
          case 'projectListData' :
            projectListRefetch();
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

      case 'quetationListData' :
        quetationListRefetch();
        break;

        case 'projectListData' :
          projectListRefetch();
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

export default Table;

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
