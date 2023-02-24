import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { api, isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { PartnerProductData } from 'types/tableDataType';
import { dateFomat, hyphenFn } from 'utils/calculatePackage';
import { excelDownloadFile } from 'hooks/excelDown';
import entizenLogoPng from 'public/images/entizenProductList.png';
import entizenLogoSvg from 'public/images/entizenProductList.svg';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
  detatilId?: string;
  selected: string[];
  productsExcel: string;
  // selectedFilter?: number;
  // userSearch?: string;
};

const PPTable = ({
  setIsDetail,
  setDetailId,
  detatilId,
  selected,
  productsExcel,
}: // selectedFilter,
// userSearch,
Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();
  const accessToken = JSON.parse(localStorage.getItem('ADMIN_ACCESS_TOKEN')!);

  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  
  
  */

  //파트너 등록 제품
  // /admin/products?page=1&limit=10&searchKeyword=&chargerKind=50-COMMON&chargerMethods[]=Socket&chargerChannel=3_MODE
  const { data, refetch } = useQuery<PartnerProductData>(
    'PPData',
    () =>
      isTokenAdminGetApi(
        `/admin/products?page=${page}&limit=10&searchKeyword=&chargerKind=${selected[0]}&chargerMethods[]=${selected[1]}&chargerChannel=${selected[2]}`,
      ),
    {
      enabled: false,
      onSuccess: (data) => {
        const temp: any = [];
        data?.data?.products?.forEach((ele, idx) => {
          const arrEle = [
            `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
              idx + 1 === 10 ? page * 10 : idx + 1
            }`,
            ele?.member?.companyMemberAdditionalInfo?.companyName!,
            ele?.manufacturer!,
            ele?.chargerProductFiles[0]?.url!,
            ele?.kind!,
            ele?.method!,
            ele?.channel!,
            ele?.member?.name!,
            hyphenFn(ele?.member?.phone!),
            dateFomat(ele?.createdAt!).substring(0, 11),
            ele?.chargerProductIdx!,
          ];
          temp.push(arrEle);
        });
        setDataArr(temp);
        setColumns([
          '번호',
          '업체명',
          '제조사명',
          {
            name: '이미지',
            formatter: (cell: string) =>
              _(
                cell === undefined ? (
                  <ImgTag src={'/images/entizenProductList.png'} alt="image" />
                ) : (
                  <ImgTag src={cell} alt="image" />
                ),
              ),
          },
          { name: '충전모달', width: '10%' },
          { name: '충전방식모달', width: '10%' },
          '체널',
          '담당자',
          { name: '담당자연락처', width: '10%' },
          { name: '등록일', width: '10%' },
          {
            name: '',
            id: 'PP-detail',
            formatter: (cell: number) =>
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
        setLength(data.data.totalCount ? data.data.totalCount : 0);
      },
      onError: (err) => {
        // console.log(err);
        alert('다시 시도해주세요');
      },
    },
  );

  // console.log('data', data);

  //파트너 등록 제품
  //  const partnerProduct = [
  //   '번호',
  //   '업체명',
  //   '제조사명',
  //   {
  //     name: '이미지',
  //     formatter: (cell: string) => _(<img src={cell} alt="image" />),
  //   },
  //   { name: '충전모달', width: '10%' },
  //   { name: '충전방식모달', width: '10%' },
  //   '채널',
  //   '담당자',
  //   { name: '담당자연락처', width: '10%' },
  //   { name: '등록일', width: '10%' },
  //   {
  //     name: '',
  //     id: 'PP-detail',
  //     formatter: (cell: string) =>
  //       _(
  //         <button
  //           className="detail"
  //           onClick={() => {
  //             setDetailId(cell);
  //             setIsDetail(true);
  //           }}
  //         >
  //           보기
  //         </button>,
  //       ),
  //   },
  //  ];

  // console.log('data', data);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [page, selected]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P>
        {/* <Button
          onClick={() => {
            excelDownloadFile(productsExcel, accessToken);
          }}
        >
          엑셀 다운로드
        </Button> */}
      </FlexBox>
      {dataArr.length > 0 && columns.length > 0 ? (
        <Div>
          <Grid
            data={() => {
              //화면의 덜컹거림을 줄이기 위해서 0.1초 기다림( =>setState들로 인한 페이지 전환 다 끝난 후 데이터 삽입).
              return new Promise((resolve) => {
                setTimeout(() => resolve(dataArr), 300);
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

export default PPTable;

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

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
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

const Div = styled.div`
  min-width: 1200px;
  min-height: 490px;
`;

const ImgTag = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;
