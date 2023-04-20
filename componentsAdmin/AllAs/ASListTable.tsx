import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Grid, _ } from 'gridjs-react';
import { useQuery } from 'react-query';
import { isTokenAdminGetApi } from 'api';
import { Pagination } from 'rsuite';
import { ASListResponse } from 'types/tableDataType';
import { adminDateFomat, convertEn, dateFomat } from 'utils/calculatePackage';
import { excelDownloadFile } from 'hooks/excelDown';
import { selectOption } from './ASDetail';

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  tableType: string;
  pickedDate?: string[];
  setAfterSalesServiceIdx?: React.Dispatch<React.SetStateAction<number>>;
  commonBtn?: string;
  hide?: boolean;
  excelUrl: string;
  userSearch: string | number;
  searchType: selectOption;
  onClickButton: boolean;
};

const ASListTable = ({
  setIsDetail,
  tableType,
  pickedDate,
  setAfterSalesServiceIdx,
  commonBtn,
  hide,
  userSearch,
  excelUrl,
  searchType,
  onClickButton,
}: Props) => {
  const [dataArr, setDataArr] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [columns, setColumns] = useState<any[]>([]);
  const [length, setLength] = useState<number>();

  // 오늘 날짜.
  const today = new Date();

  // 유저 회원 검색 필터 뭐 눌렀는지
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  const selectOptionEn = ['TITLE', 'ADDRESS'];
  const index = ['제목', '주소'].indexOf(searchType);
  /*
  
   필터에 limit 기능이 생기면, 갯수에 따라 게시글 번호 계산해주는 함수 만들어야 함.

   일단, 10개 제한일때 
   : 기본은 {page -1}{idx +1}. idx가 10*page가 되면 idx = 0 처리.   
  */

  // 🎀 as 관련 데이터
  // /admin/after-sales-services?page=1&limit=10&startDate=2022-01-01&endDate=2022-12-22&searchKeyword=test6000
  // afterSalesServices
  const { data: asData, refetch: asRefetch } = useQuery<ASListResponse>(
    'asData',
    () =>
      isTokenAdminGetApi(
        `/admin/after-sales-services?page=${page}&limit=10&startDate=${
          pickedDate ? pickedDate[0] : '2022-09-05'
        }&endDate=${
          pickedDate ? pickedDate[1] : adminDateFomat(String(today))
        }&searchKeyword=${userSearch}&searchType=${selectOptionEn[index]}`,
      ),
    {
      enabled: false,
      onSuccess: (asData) => {
        console.log('🔥 asData : ', asData);
        if (tableType === 'asData') {
          const temp: any = [];
          asData?.data?.afterSalesServices?.forEach((ele, idx) => {
            const eleArr = [
              `${page - 1 === 0 || idx === 9 ? '' : page - 1}${
                idx + 1 === 10 ? page * 10 : idx + 1
              }`,
              ele.currentStep,
              ele.project.projectNumber!,
              ele.project.userMember.id!,
              ele.project.companyMember.id,
              dateFomat(ele.createdAt),
              ele.afterSalesServiceIdx,
            ];
            temp.push(eleArr);
          });
          setDataArr(temp);
          setColumns([
            '번호',
            '진행단계',
            '프로젝트번호',
            '작성자(이메일)',
            '기업회원(아이디)',
            'A/S요청일',
            {
              name: '',
              id: 'quetationList-Detail',
              formatter: (cell: string) =>
                _(
                  <button
                    className="detail"
                    onClick={() => {
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
          setLength(asData.data.totalCount ? asData.data.totalCount : 0);
        }
      },
      onError: () => alert('다시 시도해주세요'),
    },
  );

  // useEffect(() => {
  //   switch (tableType) {
  //     case 'asData':
  //       asRefetch();
  //       break;
  //   }
  //   // 의존성 배열에 api.get()dml data넣기.
  // }, []);

  // console.log('asData', asData);

  useEffect(() => {
    console.log(onClickButton);
    asRefetch();
  }, [onClickButton]);

  useEffect(() => {
    switch (tableType) {
      case 'asData':
        asRefetch();
        break;
    }
  }, [page, pickedDate]);

  return (
    <StyledBody className="user-table">
      <FlexBox>
        <P>결과 {length}</P>{' '}
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

export default React.memo(ASListTable);

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
