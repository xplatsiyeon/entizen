import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery, useQueryClient } from 'react-query';
import { api, isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import { ProjectList } from 'types/tableDataType';
import { adminDateFomat, dateFomat } from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';
import { CoPresentSharp } from '@mui/icons-material';
import { excelDownloadFile } from 'hooks/excelDown';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  commonBtn?: string;
  hide?: boolean;
  searchType: string;
  searchKeyword: string;
  projectQueryString: string;
  excelUrl: string;
};

const ProjectListTable = ({
  setIsDetail,
  setDetailId,
  tableType,
  pickedDate,
  commonBtn,
  excelUrl,
  hide,
  searchType,
  searchKeyword,
  projectQueryString,
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
  // &steps[]=
  // 🎀 프로젝트 리스트 데이터
  // 진행중 프로젝트 리스트

  const { data: projectListData, refetch: projectListRefetch } =
    useQuery<ProjectList>(
      'projectList',
      () =>
        isTokenAdminGetApi(
          `/admin/projects/in-progress?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${
            pickedDate ? pickedDate[1] : adminDateFomat(String(today))
          }&searchType=${searchType}&searchKeyword=${searchKeyword}${
            projectQueryString ? projectQueryString : ''
          }`,
        ),
      {
        enabled: false,
        onSuccess: (projectListData) => {
          if (tableType === 'projectListData') {
            const temp: any = [];
            projectListData?.data?.projects.forEach((ele, idx) => {
              const approve =
                ele?.currentStep === '승인 대기' ? '승인대기' : ele.currentStep;
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.projectNumber!,
                ele.userMember.id!,
                ele.companyMember.id!,
                approve,
                ele.projectName,
                dateFomat(ele.createdAt).substring(0, 12),
                ele.projectIdx!,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '프로젝트 번호',
              '작성자(이메일)',
              '기업회원(아이디)',
              {
                name: '진행단계',
                id: 'projectListData',
                formatter: (cell: string) =>
                  _(
                    <span
                      className={`${
                        cell === '승인대기' ? 'approve' : 'approveNot'
                      }`}
                    >
                      {cell}
                    </span>,
                  ),
              },
              '프로젝트_제목',
              '프로젝트_생성일',
              {
                name: '',
                id: 'projectListData',
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

  // 완료는 프로젝트 생성일이 아니라 구독시작일 & 구독종료일
  // 진행단계에 구독종료 D-n으로 보여주기
  // 완료 프로젝트 리스트
  const { data: projectCompleteData, refetch: projectCompleteListRefetch } =
    useQuery<ProjectList>(
      'projectCompleteList',
      () =>
        isTokenAdminGetApi(
          `/admin/projects/completion?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${
            pickedDate ? pickedDate[1] : adminDateFomat(String(today))
          }&searchType=${searchType}&searchKeyword=${searchKeyword}&subscribeDateSort=ASC`,
        ),
      {
        enabled: false,
        onSuccess: (projectCompleteData) => {
          if (tableType === 'projectCompleteData') {
            const temp: any = [];
            projectCompleteData?.data?.projects.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.projectNumber!,
                ele.userMember.id!,
                ele.companyMember.id!,
                ele.subscribeLeftDays,
                ele.projectName,
                dateFomat(ele.subscribeStartDate!).substring(0, 12),
                dateFomat(ele.subscribeEndDate!).substring(0, 12),
                ele.projectIdx!,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '프로젝트 번호',
              '작성자(이메일)',
              '기업회원(아이디)',
              {
                name: '구독종료',
                id: 'projectCompleteData',
                formatter: (cell: string) =>
                  _(<span className="approveNot">{`구독종료 D-${cell}`}</span>),
              },
              '프로젝트_제목',
              '구독시작일',
              '구독종료일',
              {
                name: '',
                id: 'projectCompleteData',
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
              projectCompleteData.data.totalCount
                ? projectCompleteData.data.totalCount
                : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  //파트너 등록 제품
  const partnerProduct = [
    '번호',
    '업체명',
    '제조사명',
    {
      name: '이미지',
      formatter: (cell: string) => _(<img src={cell} alt="image" />),
    },
    { name: '충전모달', width: '10%' },
    { name: '충전방식모달', width: '10%' },
    '채널',
    '담당자',
    { name: '담당자연락처', width: '10%' },
    { name: '등록일', width: '10%' },
    {
      name: '',
      id: 'PP-detail',
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
  ];

  useEffect(() => {
    switch (tableType) {
      case 'projectListData':
        projectListRefetch();
        break;

      case 'projectCompleteData':
        projectCompleteListRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, []);

  useEffect(() => {
    switch (tableType) {
      case 'projectListData':
        projectListRefetch();
        break;

      case 'projectCompleteData':
        projectCompleteListRefetch();
        break;
    }
  }, [page, pickedDate, searchKeyword, projectQueryString, searchType]);

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

export default React.memo(ProjectListTable);

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
      color: #f75015;
      font-weight: 500;
    }
    .approveNot {
      text-align: center;
      font-family: 'Spoqa Han Sans Neo';
      font-style: normal;
      font-size: 16px;
      line-height: 150%;
      color: #000000;
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
