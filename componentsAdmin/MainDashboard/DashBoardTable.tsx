import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery, useQueryClient } from 'react-query';
import { isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import {
  ProjectListSituation,
  ReverseAuctionSituation,
  ASListSitutation,
} from 'types/tableDataType';
import { adminDateFomat, dateFomat } from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { excelDownloadFile } from 'hooks/excelDown';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  commonBtn?: string;
  excelUrl: string;
  hide?: boolean;
  userCheck?: string;
  statusCheck?: string;
  quotationRequestStatus?: string;
  asStatusCheck?: string;
};

const DashBoardTable = ({
  tableType,
  pickedDate,
  commonBtn,
  excelUrl,
  hide,
  statusCheck,
  quotationRequestStatus,
  asStatusCheck,
  setDetailId,
  setIsDetail,
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

  // 유저 회원 검색 필터 뭐 눌렀는지
  const changeSearchType = ['name', 'id'];

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  // 메인대시보드 프로젝트 현황
  // /admin/dashboards/projects?page=1&limit=10&startDate=2022-12-01&endDate=2022-12-29&projectStatus=awaitingContract
  const { data: projectListSituation, refetch: projectListSituationRefetch } =
    useQuery<ProjectListSituation>(
      'projectListSituation',
      () =>
        isTokenAdminGetApi(
          `/admin/dashboards/projects?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${pickedDate ? pickedDate[1] : today}${statusCheck}`,
        ),
      {
        enabled: false,
        onSuccess: (projectListSituation) => {
          if (tableType === 'projectListSituation') {
            const temp: any = [];
            projectListSituation?.data?.projects?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 ? '' : page - 1}${
                  idx + 1 === page * 10 ? 0 : idx + 1
                }`,

                dateFomat(ele.createdAt).substring(0, 13),
                ele.projectIdx,
                ` ${
                  ele.subscribeStartDate !== null
                    ? ele.subscribeStartDate.replaceAll('-', '.')
                    : '-'
                }`,
                ele.userMember.id,
                ele.companyMember.id,
                ele.projectName,
                ele.badge,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '날짜',
              {
                name: '',
                id: 'projectSitution',
                formatter: (cell: string) => _(<div>~</div>),
              },
              '완료날짜',
              '신청자명',
              '업체명',
              '주소(충전소)',
              '상태',
            ]);
            setLength(
              projectListSituation?.data?.totalCount === null
                ? 0
                : projectListSituation?.data?.totalCount,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // 역경매 현황 조회 리스트
  // admin/dashboards/quotation-requests?page=1&limit=1000&startDate=2022-11-01&endDate=2022-12-29&quotationRequestStatus=awaitingBid
  const {
    data: reverseAuctionSituation,
    refetch: reverseAuctionSituationRefetch,
  } = useQuery<ReverseAuctionSituation>(
    'reverseAuctionSituation',
    () =>
      isTokenAdminGetApi(
        `/admin/dashboards/quotation-requests?page=${page}&limit=10&startDate=${
          pickedDate ? pickedDate[0] : '2022-09-05'
        }&endDate=${
          pickedDate ? pickedDate[1] : today
        }${quotationRequestStatus}`,
      ),
    {
      enabled: false,
      onSuccess: (reverseAuctionSituation) => {
        // console.log('🔥 reverseAuctionSituation ~line 83');
        // console.log(reverseAuctionSituation);
        if (tableType === 'reverseAuctionSituation') {
          const temp: any = [];
          reverseAuctionSituation?.data?.quotationRequests?.forEach(
            (ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 ? '' : page - 1}${
                  idx + 1 === page * 10 ? 0 : idx + 1
                }`,
                dateFomat(ele.createdAt).substring(0, 13),
                ele.quotationRequestIdx,
                ` ${
                  ele.expiredAt !== null
                    ? dateFomat(ele.expiredAt).substring(0, 13)
                    : '-'
                }`,
                ele?.member?.name,
                ele.installationAddress,
                `${ele.badge === '' ? '신규' : ele.badge}`,
              ];
              temp.push(eleArr);
            },
          );
          setDataArr(temp);
          setColumns([
            '번호',
            '날짜',
            {
              name: '',
              id: 'reverseAuctionSitutaion',
              formatter: (cell: string) => _(<div>~</div>),
            },
            '마감날짜',
            '신청자명',
            '주소(충전소)',
            '상태',
          ]);
          setLength(
            reverseAuctionSituation?.data?.totalCount === null
              ? 0
              : reverseAuctionSituation?.data?.totalCount,
          );
        }
      },
      onError: () => alert('다시 시도해주세요'),
    },
  );

  // 대시보드 A/S 리스트 조회
  // /admin/dashboards/after-sales-services?page=1&limit=1000&startDate=2022-11-01&endDate=2022-12-29&afterSalesServiceStatus=request
  const { data: asListSituationList, refetch: asListSituationRefetch } =
    useQuery<ASListSitutation>(
      'asListSituationList',
      () =>
        isTokenAdminGetApi(
          `/admin/dashboards/after-sales-services?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${pickedDate ? pickedDate[1] : today}${asStatusCheck}`,
        ),
      {
        enabled: false,
        onSuccess: (asListSituationList) => {
          if (tableType === 'asListSituationList') {
            const temp: any = [];
            asListSituationList?.data?.afterSalesServices?.forEach(
              (ele, idx) => {
                const eleArr = [
                  `${page - 1 === 0 ? '' : page - 1}${
                    idx + 1 === page * 10 ? 0 : idx + 1
                  }`,
                  dateFomat(ele.createdAt).substring(0, 13),
                  ele.afterSalesServiceIdx,
                  ` ${
                    ele.afterSalesServiceResultDate !== null
                      ? dateFomat(ele.afterSalesServiceResultDate).substring(
                          0,
                          13,
                        )
                      : '-'
                  }`,
                  ele?.project?.userMember?.id,
                  ele?.project?.companyMember?.companyMemberAdditionalInfo
                    ?.companyName,
                  ele?.project?.projectName,
                  ele?.badge,
                ];
                temp.push(eleArr);
              },
            );
            setDataArr(temp);
            setColumns([
              '번호',
              '날짜',
              {
                name: '',
                id: 'reverseAuctionSitutaion',
                formatter: (cell: string) => _(<div>~</div>),
              },
              '마감날짜',
              '신청자명',
              '업체명',
              '주소(충전소)',
              '상태',
            ]);
            setLength(
              asListSituationList?.data?.totalCount === null
                ? 0
                : asListSituationList?.data?.totalCount,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  useEffect(() => {
    switch (tableType) {
      case 'projectListSituation':
        projectListSituationRefetch();
        break;

      case 'reverseAuctionSituation':
        reverseAuctionSituationRefetch();
        break;

      case 'asListSituationList':
        asListSituationRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, [quotationRequestStatus, asStatusCheck, statusCheck]);

  useEffect(() => {
    switch (tableType) {
      case 'projectListSituation':
        projectListSituationRefetch();
        break;

      case 'reverseAuctionSituation':
        reverseAuctionSituationRefetch();
        break;

      case 'asListSituationList':
        asListSituationRefetch();
        break;
    }
  }, [page, pickedDate, quotationRequestStatus, asStatusCheck, statusCheck]);

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

export default React.memo(DashBoardTable);

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
