import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { AdminTermsListResponse } from 'types/tableDataType';
import { dateFomat } from 'utils/calculatePackage';
import { dropDownValueEn, dropDownValue } from './Adminterms/AdminTermsEditor';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  setAfterSalesServiceIdx?: React.Dispatch<React.SetStateAction<number>>;
  commonBtn?: string;
  handleCommon: () => void;
  hide?: boolean;
  userType?: string;
  onClickToggle?: (id: number) => void;
};

const AdminNotifyTable = ({
  setIsDetail,
  setDetailId,
  tableType,
  setAfterSalesServiceIdx,
  commonBtn,
  handleCommon,
  hide,
  userType,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

  // 오늘 날짜.
  // console.log(adminDateFomat(String(today)));
  // 역경매 견적서 보기에 넘겨줄 아이디값
  // 유저 회원 검색 필터 뭐 눌렀는지
  const changeSearchType = ['name', 'id'];

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  

  */
  // // 약관 리스트
  // // /admin/terms
  const {
    data: termsList,
    refetch: termsListRefetch,
    isLoading: adminTermsLoading,
  } = useQuery<AdminTermsListResponse>(
    'termsList',
    () => isTokenAdminGetApi(`/admin/terms`),
    {
      enabled: false,
      onSuccess: (termsList) => {
        console.log('🔥 termsList : ', termsList);
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

  useEffect(() => {
    switch (tableType) {
      case 'termsList':
        termsListRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, [userType, termsList]);

  const isLoading = adminTermsLoading;

  if (isLoading) {
    return <div>로딩중..</div>;
  }

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
          <Grid data={dataArr} columns={columns} />
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
