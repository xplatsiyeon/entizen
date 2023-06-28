import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery, useQueryClient } from 'react-query';
import { api, getApi, isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import { Quotations, CompanyPreQuotationResponse } from 'types/tableDataType';
import {
  adminDateFomat,
  dateFomat,
  hyphenFn,
  adminNoPickDateFomat,
} from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { adminReverseAction } from 'storeAdmin/adminReverseSlice';
import { QuotationObject } from '../../storeAdmin/adminReverseSlice';
import { NewCell } from '../AdminInformationNotify/AdminNotice/AdminNoticeList';
import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';
import { excelDownloadFile } from 'hooks/excelDown';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  commonBtn?: string;
  excelUrl?: string;
  bidBtn?: string;
  bidExcelUrl?: string;
  hide?: boolean;
  pagenationHide?: boolean;
  processQueryString?: string;
  userSearch?: string;
};

const ReverseAuctionTable = ({
  setIsDetail,
  setDetailId,
  tableType,
  detatilId,
  pickedDate,
  commonBtn,
  bidBtn,
  bidExcelUrl,
  excelUrl,
  hide,
  pagenationHide,
  processQueryString,
  userSearch,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  // 오늘 날짜.
  const today = new Date();
  // console.log('🌸', adminNoPickDateFomat(String(today)));

  // 역경매 견적서 보기에 넘겨줄 아이디값
  const dispatch = useDispatch();

  // 유저 회원 검색 필터 뭐 눌렀는지
  const changeSearchType = ['name', 'id'];

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  // 🎀 간편견적의 가견적 리스트 조회
  const { data: companyPreQuotation, refetch: companyPreQuotationRefetch } =
    useQuery<CompanyPreQuotationResponse>(
      'companyPreQuotation',
      () =>
        isTokenAdminGetApi(
          `/admin/quotations/quotation-requests/${detatilId}/pre-quotations`,
        ),
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
                {
                  preQuotationIdx: ele?.preQuotationIdx,
                  finalQuotationIdx: ele?.finalQuotation?.finalQuotationIdx,
                },
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
                formatter: (cell: QuotationObject) =>
                  _(
                    <div>
                      {/* <button
                        className="button"
                        onClick={() => {
                          alert('개발중입니다.');
                        }}
                      >
                        삭제
                      </button> */}
                      <button
                        className="button"
                        onClick={() => {
                          dispatch(adminReverseAction.setDate(cell));
                          dispatch(adminReverseAction.setIsCompanyDetail(true));
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

  // 🎀 견적 리스트 데이터
  const { data: quotationListData, refetch: quetationListRefetch } =
    useQuery<Quotations>(
      'quotationListData',
      () =>
        isTokenAdminGetApi(
          `/admin/quotations/quotation-requests?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${
            pickedDate ? pickedDate[1] : adminNoPickDateFomat(String(today))
          }&searchKeyword=${userSearch}${processQueryString}`,
        ),
      {
        enabled: false,
        onSuccess: (quotationListData) => {
          if (tableType === 'quotationListData') {
            const temp: any = [];
            quotationListData?.data.quotationRequests.forEach((ele, idx) => {
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
              '작성자(이메일)',
              '견적제목',
              '작성날짜',
              {
                name: '',
                id: 'quotationListData',
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
              quotationListData.data.totalCount
                ? quotationListData.data.totalCount
                : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // console.log(
  //   '🌸 역경매 주소 확인 🌸',
  //   `/admin/quotations/quotation-requests?page=${page}&limit=10&startDate=${
  //     pickedDate ? pickedDate[0] : '2022-09-05'
  //   }&endDate=${
  //     pickedDate ? pickedDate[1] : adminNoPickDateFomat(String(today))
  //   }&searchKeyword=${userSearch}${processQueryString}`,
  // );

  useEffect(() => {
    switch (tableType) {
      case 'quotationListData':
        quetationListRefetch();
        break;

      case 'companyPreQuotation':
        companyPreQuotationRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, []);

  useEffect(() => {
    switch (tableType) {
      case 'userData':

      case 'quotationListData':
        quetationListRefetch();
        break;

      case 'companyPreQuotation':
        companyPreQuotationRefetch();
        break;
    }
  }, [page, pickedDate, userSearch, processQueryString]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P>
        <ButtonWrap>
          {/* <Button
            onClick={() => {
              excelDownloadFile(bidExcelUrl!, accessToken);
            }}
            hide={hide}
          >
            {bidBtn}
          </Button> */}
          <Button
            onClick={() => {
              excelDownloadFile(excelUrl!, accessToken);
            }}
            hide={hide}
          >
            {commonBtn}
          </Button>
        </ButtonWrap>
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

      {pagenationHide === false && (
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
      )}
    </StyledBody>
  );
};

export default React.memo(ReverseAuctionTable);

const StyledBody = styled.div`
  margin: 32px 0 0;
  min-width: 964px;

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

const ButtonWrap = styled.span`
  display: flex;
  gap: 10px;
`;
