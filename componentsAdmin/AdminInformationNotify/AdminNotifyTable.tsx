import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery, useQueryClient } from 'react-query';
import { api, getApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import {
  AdminTermsListResponse,
  AdminNoticeListResponse,
  AdminBannerListResponse,
  AdminFAQListResponse,
} from 'types/tableDataType';
import { adminDateFomat, dateFomat, convertKo } from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { adminReverseAction } from 'storeAdmin/adminReverseSlice';
import { dropDownValueEn, dropDownValue } from './Adminterms/AdminTermsEditor';
import { QuotationObject } from '../../storeAdmin/adminReverseSlice';
import { NewCell } from './AdminNotice/AdminNoticeList';
import { ServiceKr, ServiceEn } from './AdminFAQ/AdminFAQList';
import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  selectedFilter?: number;
  userSearch?: string;
  setAfterSalesServiceIdx?: React.Dispatch<React.SetStateAction<number>>;
  commonBtn?: string;
  handleCommon: () => void;
  onClickToggle?: (id: number) => void;
  hide?: boolean;
  userType?: string;
  setToggle?: React.Dispatch<React.SetStateAction<NewCell>>;
  toggle?: NewCell;
  commuCheck?: string;
  userCheck?: string;
};

const AdminNotifyTable = ({
  setIsDetail,
  setDetailId,
  tableType,
  detatilId,
  selectedFilter,
  pickedDate,
  userSearch,
  setAfterSalesServiceIdx,
  commonBtn,
  handleCommon,
  onClickToggle,
  hide,
  userType,
  setToggle,
  toggle,
  commuCheck,
  userCheck,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

  // 오늘 날짜.
  const today = new Date();
  console.log(adminDateFomat(String(today)));

  // 역경매 견적서 보기에 넘겨줄 아이디값
  const dispatch = useDispatch();

  // 유저 회원 검색 필터 뭐 눌렀는지
  const changeSearchType = ['name', 'id'];

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  // 약관 리스트
  // /admin/terms
  const { data: termsList, refetch: termsListRefetch } =
    useQuery<AdminTermsListResponse>(
      'termsList',
      () => getApi(`/admin/terms`),
      {
        enabled: false,
        onSuccess: (termsList) => {
          if (tableType === 'termsList') {
            const temp: any = [];
            termsList?.data?.terms?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                dropDownValue[dropDownValueEn.indexOf(ele.type)],
                dateFomat(ele.createdAt),
                ele.termIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '약관명',
              '등록일',
              {
                name: '',
                id: 'termsListIdx',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(Number(cell));
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(termsList?.data ? termsList?.data?.terms?.length : 0);
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // 공지사항 리스트
  const { data: adminNoticeList, refetch: adminNoticeListRefetch } =
    useQuery<AdminNoticeListResponse>(
      'adminNoticeList',
      () => getApi(`/admin/notices`),
      {
        enabled: false,
        onSuccess: (adminNoticeList) => {
          if (tableType === 'adminNoticeList') {
            const temp: any = [];
            adminNoticeList?.data?.notices.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele?.title,
                {
                  isVisible: ele.isVisible,
                  id: ele.noticeIdx,
                },
                dateFomat(ele.createdAt),
                ele.noticeIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '공지사항',
              {
                name: '노출여부',
                id: 'bannerVisible',
                formatter: (cell: NewCell) =>
                  _(
                    <ToggleContainer>
                      <ToggleBtn
                        visible={cell?.isVisible}
                        onClick={() => {
                          if (setToggle) {
                            setToggle(cell);
                          }
                        }}
                      >
                        <Circle visible={cell?.isVisible} />
                      </ToggleBtn>
                    </ToggleContainer>,
                  ),
              },
              '등록일',
              {
                name: '',
                id: 'termsListIdx',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(Number(cell));
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(
              adminNoticeList?.data ? adminNoticeList?.data?.totalCount : 0,
            );
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // 배너 리스트(기업이냐, 유저에 따라 받는 데이터 다름)
  const { data: bannerList, refetch: bannerListRefetch } =
    useQuery<AdminBannerListResponse>(
      'bannerList',
      () => getApi(`/admin/banners?targetMemberType=${userType}`),
      {
        enabled: false,
        onSuccess: (bannerList) => {
          if (tableType === 'bannerList') {
            const temp: any = [];
            bannerList?.data?.banners?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele?.title,
                {
                  isVisible: ele.isVisible,
                  id: ele.bannerIdx,
                },
                dateFomat(ele.createdAt),
                ele.bannerIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '배너명',
              {
                name: '노출여부',
                id: 'bannerListVisible',
                formatter: (cell: NewCell) =>
                  _(
                    <ToggleContainer>
                      <ToggleBtn
                        visible={cell?.isVisible}
                        onClick={() => {
                          if (setToggle) {
                            setToggle(cell);
                          }
                        }}
                      >
                        <Circle visible={cell?.isVisible} />
                      </ToggleBtn>
                    </ToggleContainer>,
                  ),
              },
              '등록일',
              {
                name: '',
                id: 'termsListIdx',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(Number(cell));
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(bannerList?.data ? bannerList?.data?.banners?.length : 0);
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  // faq 리스트(기업이냐, 유저에 따라 받는 데이터 다름, 추후에 userType api 주소에 추가)
  const { data: adminFaqList, refetch: adminFaqListRefetch } =
    useQuery<AdminFAQListResponse>(
      'adminFaqList',
      () => getApi(`/admin/faqs`),
      {
        enabled: false,
        onSuccess: (adminFaqList) => {
          if (tableType === 'adminFaqList') {
            const temp: any = [];
            adminFaqList?.data?.faqs.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,

                convertKo(ServiceKr, ServiceEn, ele?.faqKind),
                ele?.question,
                {
                  isVisible: ele.isVisible,
                  id: ele.faqIdx,
                },
                dateFomat(ele.createdAt),
                ele.faqIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              '카테고리',
              'FAQ',
              {
                name: '노출여부',
                id: 'adminFaqListVisible',
                formatter: (cell: NewCell) =>
                  _(
                    <ToggleContainer>
                      <ToggleBtn
                        visible={cell?.isVisible}
                        onClick={() => {
                          if (setToggle) {
                            setToggle(cell);
                          }
                        }}
                      >
                        <Circle visible={cell?.isVisible} />
                      </ToggleBtn>
                    </ToggleContainer>,
                  ),
              },
              '등록일',
              {
                name: '',
                id: 'faqsListIdx',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(Number(cell));
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(adminFaqList?.data ? adminFaqList?.data?.totalCount : 0);
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  useEffect(() => {
    switch (tableType) {
      case 'termsList':
        termsListRefetch();
        break;

      case 'adminNoticeList':
        adminNoticeListRefetch();
        break;

      case 'bannerList':
        bannerListRefetch();
        break;

      case 'adminFaqList':
        adminFaqListRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, [userType, termsList, adminFaqList, bannerList, adminNoticeList]);

  // useEffect(() => {
  //   switch (tableType) {
  //     case 'termsList':
  //       termsListRefetch();
  //       break;

  //     case 'adminNoticeList':
  //       adminNoticeListRefetch();
  //       break;

  //     case 'bannerList':
  //       bannerListRefetch();
  //       break;

  //     case 'adminFaqList':
  //       adminFaqListRefetch();
  //       break;
  //   }
  // }, [page, pickedDate, userSearch, userType, userCheck, commuCheck]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P>{' '}
        <Button
          onClick={() => {
            handleCommon();
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

export default React.memo(AdminNotifyTable);

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

const ToggleContainer = styled.div`
  position: absolute;
  /* left: 44%; */
  left: 37%;
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
