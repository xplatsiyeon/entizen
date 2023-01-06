import styled from '@emotion/styled';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery, useQueryClient } from 'react-query';
import { api, getApi } from 'api';
import { Pagination } from 'rsuite';
import { css } from '@emotion/react';
import { EntizenLibraryResponse } from 'types/tableDataType';
import { adminDateFomat, dateFomat } from 'utils/calculatePackage';
import { useDispatch } from 'react-redux';
import { NewCell } from '../AdminInformationNotify/AdminNotice/AdminNoticeList';
import { AdminBtn } from 'componentsAdmin/Layout';
import Image from 'next/image';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<string>>;
  tableType: string;
  pickedDate?: string[];
  detatilId?: string;
  setAfterSalesServiceIdx?: React.Dispatch<React.SetStateAction<string>>;
  commonBtn?: string;
  handleCommon: () => void;
  onClickToggle?: (id: number) => void;
  hide?: boolean;
};

const EntizenLibraryTable = ({
  setIsDetail,
  setDetailId,
  tableType,
  detatilId,
  pickedDate,
  setAfterSalesServiceIdx,
  commonBtn,
  handleCommon,
  onClickToggle,
  hide,
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

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  //  도서관 리스트 조회
  // /admin/libraries?page=1&limit=10&startDate=2022-12-01&endDate=2022-12-31&searchKeyword=

  const { data: entizenLibrary, refetch: entizenLibraryRefetch } =
    useQuery<EntizenLibraryResponse>(
      'entizenLibrary',
      () =>
        getApi(
          `/admin/libraries?page=${page}&limit=10&startDate=${
            pickedDate ? pickedDate[0] : '2022-09-05'
          }&endDate=${pickedDate ? pickedDate[1] : today}`,
        ),
      {
        enabled: false,
        onSuccess: (entizenLibrary) => {
          console.log(entizenLibrary);
          if (tableType === 'entizenLibrary') {
            const temp: any = [];
            entizenLibrary?.data?.forEach((ele, idx) => {
              const eleArr = [
                `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                  idx + 1 === 10 ? page * 10 : idx + 1
                }`,
                ele.imageUrl,
                ele.title,
                ele.link,
                dateFomat(ele.createdAt),
                ele.libraryIdx,
              ];
              temp.push(eleArr);
            });
            setDataArr(temp);
            setColumns([
              '번호',
              {
                name: '이미지',
                width: '10%',
                id: 'entizenLibraryImg',
                formatter: (cell: string) =>
                  _(
                    <LibraryImage>
                      <img
                        src={cell}
                        alt="library"
                        style={{
                          objectFit: 'cover',
                          width: '82px',
                          height: '82px',
                        }}
                      />
                    </LibraryImage>,
                  ),
              },
              {
                name: '제목',
                width: '20%',
                id: 'entizenLibraryTitle',
                formatter: (cell: string) =>
                  _(
                    <TitleBox>
                      <p>{cell}</p>
                    </TitleBox>,
                  ),
              },
              {
                name: '링크',
                width: '20%',
                id: 'entizenLibraryLink',
                formatter: (cell: string) => _(<LinkBox>{cell}</LinkBox>),
              },
              '등록일',
              {
                name: '',
                id: 'entizenLibrary',
                formatter: (cell: string) =>
                  _(
                    <button
                      className="detail"
                      onClick={() => {
                        setDetailId(cell);
                        setIsDetail(true);
                        if (setAfterSalesServiceIdx) {
                          setAfterSalesServiceIdx(cell);
                        }
                      }}
                    >
                      보기
                    </button>,
                  ),
              },
            ]);
            setLength(entizenLibrary.data ? entizenLibrary.data.length : 0);
          }
        },
        onError: () => alert('다시 시도해주세요'),
      },
    );

  console.log('pickedDate', pickedDate);

  useEffect(() => {
    switch (tableType) {
      case 'entizenLibrary':
        entizenLibraryRefetch();
        break;
    }
    // 의존성 배열에 api.get()dml data넣기.
  }, [entizenLibrary]);

  useEffect(() => {
    switch (tableType) {
      case 'entizenLibrary':
        entizenLibraryRefetch();
        break;
    }
  }, [page, entizenLibrary, pickedDate]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과{length}</P>
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

export default React.memo(EntizenLibraryTable);

const StyledBody = styled.div`
  margin: 32px 0 0;
  min-width: 1200px;
  width: 100%;

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
      tr {
        min-width: 1200px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      font-weight: 500;
      background: lightgray;

      .gridjs-th-content {
        padding: 8px 3px;
      }
      th:nth-child(1) {
      }
      th:nth-child(2) {
        .gridjs-th-content {
        }
      }
      th:nth-child(3) {
      }
      th:nth-child(4) {
      }
      th:nth-child(5) {
      }
    }
    tbody {
      font-weight: 400;
      tr {
        display: flex;
        min-width: 1200px;
        width: 100%;
        align-items: center;
        justify-content: space-between;

        td {
          padding: 8px 0;
        }
        td:nth-child(1) {
        }
        td:nth-child(2) {
        }
        td:nth-child(3) {
        }
        td:nth-child(4) {
        }
        td:nth-child(5) {
        }
        td:nth-child(6) {
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
  /* position: absolute; */
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
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
  justify-content: center;
  text-align: center;
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
  justify-content: center;
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
